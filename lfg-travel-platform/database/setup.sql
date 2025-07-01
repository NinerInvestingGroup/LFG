-- LFG Travel Platform Database Setup
-- Run this script in your Supabase SQL editor

-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  date_of_birth DATE,
  phone TEXT,
  verified BOOLEAN DEFAULT FALSE,
  travel_preferences JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trips table
CREATE TABLE IF NOT EXISTS trips (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  destination TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  max_participants INTEGER NOT NULL CHECK (max_participants > 0),
  current_participants INTEGER DEFAULT 0 CHECK (current_participants >= 0),
  budget_min DECIMAL(10,2),
  budget_max DECIMAL(10,2),
  trip_type TEXT NOT NULL,
  difficulty_level TEXT NOT NULL,
  tags TEXT[],
  images TEXT[],
  organizer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'full', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trip participants table
CREATE TABLE IF NOT EXISTS trip_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'declined', 'left')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  message TEXT,
  UNIQUE(trip_id, user_id)
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  recipient_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'direct' CHECK (message_type IN ('direct', 'trip_chat', 'system')),
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE NOT NULL,
  reviewer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  reviewee_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(trip_id, reviewer_id, reviewee_id)
);

-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_trips_organizer_id ON trips(organizer_id);
CREATE INDEX IF NOT EXISTS idx_trips_status ON trips(status);
CREATE INDEX IF NOT EXISTS idx_trips_destination ON trips(destination);
CREATE INDEX IF NOT EXISTS idx_trips_start_date ON trips(start_date);
CREATE INDEX IF NOT EXISTS idx_trip_participants_trip_id ON trip_participants(trip_id);
CREATE INDEX IF NOT EXISTS idx_trip_participants_user_id ON trip_participants(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_trip_id ON messages(trip_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_recipient_id ON messages(recipient_id);
CREATE INDEX IF NOT EXISTS idx_reviews_trip_id ON reviews(trip_id);
CREATE INDEX IF NOT EXISTS idx_reviews_reviewee_id ON reviews(reviewee_id);

-- Row Level Security Policies

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Trips policies
CREATE POLICY "Anyone can view active trips" ON trips
  FOR SELECT USING (status = 'active' OR organizer_id = auth.uid());

CREATE POLICY "Users can create trips" ON trips
  FOR INSERT WITH CHECK (auth.uid() = organizer_id);

CREATE POLICY "Trip organizers can update their trips" ON trips
  FOR UPDATE USING (auth.uid() = organizer_id);

CREATE POLICY "Trip organizers can delete their trips" ON trips
  FOR DELETE USING (auth.uid() = organizer_id);

-- Trip participants policies
CREATE POLICY "Users can view trip participants for trips they're involved in" ON trip_participants
  FOR SELECT USING (
    user_id = auth.uid() OR 
    trip_id IN (SELECT id FROM trips WHERE organizer_id = auth.uid())
  );

CREATE POLICY "Users can join trips" ON trip_participants
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave trips or organizers can manage participants" ON trip_participants
  FOR UPDATE USING (
    user_id = auth.uid() OR 
    trip_id IN (SELECT id FROM trips WHERE organizer_id = auth.uid())
  );

CREATE POLICY "Users can leave trips or organizers can remove participants" ON trip_participants
  FOR DELETE USING (
    user_id = auth.uid() OR 
    trip_id IN (SELECT id FROM trips WHERE organizer_id = auth.uid())
  );

-- Messages policies
CREATE POLICY "Users can view messages they sent or received" ON messages
  FOR SELECT USING (
    sender_id = auth.uid() OR 
    recipient_id = auth.uid() OR
    (trip_id IS NOT NULL AND trip_id IN (
      SELECT t.id FROM trips t 
      LEFT JOIN trip_participants tp ON tp.trip_id = t.id 
      WHERE t.organizer_id = auth.uid() OR tp.user_id = auth.uid()
    ))
  );

CREATE POLICY "Users can send messages" ON messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update their own messages" ON messages
  FOR UPDATE USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can create reviews for trips they participated in" ON reviews
  FOR INSERT WITH CHECK (
    auth.uid() = reviewer_id AND
    trip_id IN (
      SELECT tp.trip_id FROM trip_participants tp 
      WHERE tp.user_id = auth.uid() AND tp.status = 'approved'
    )
  );

-- Functions to automatically handle profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile when user signs up
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to update participant count when someone joins/leaves a trip
CREATE OR REPLACE FUNCTION public.update_trip_participant_count()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.status = 'approved' THEN
    UPDATE trips 
    SET current_participants = current_participants + 1,
        updated_at = NOW()
    WHERE id = NEW.trip_id;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.status != 'approved' AND NEW.status = 'approved' THEN
      UPDATE trips 
      SET current_participants = current_participants + 1,
          updated_at = NOW()
      WHERE id = NEW.trip_id;
    ELSIF OLD.status = 'approved' AND NEW.status != 'approved' THEN
      UPDATE trips 
      SET current_participants = current_participants - 1,
          updated_at = NOW()
      WHERE id = NEW.trip_id;
    END IF;
  ELSIF TG_OP = 'DELETE' AND OLD.status = 'approved' THEN
    UPDATE trips 
    SET current_participants = current_participants - 1,
        updated_at = NOW()
    WHERE id = OLD.trip_id;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically update participant count
CREATE OR REPLACE TRIGGER on_trip_participant_change
  AFTER INSERT OR UPDATE OR DELETE ON trip_participants
  FOR EACH ROW EXECUTE PROCEDURE public.update_trip_participant_count();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to automatically update updated_at
CREATE OR REPLACE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE OR REPLACE TRIGGER update_trips_updated_at
  BEFORE UPDATE ON trips
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- Insert some sample data (optional - remove if you don't want sample data)
-- Note: This will only work after you have at least one user in auth.users

-- Sample trip types and difficulty levels (you can add these as reference data)
COMMENT ON COLUMN trips.trip_type IS 'Adventure, Cultural, Relaxation, Business, Educational, Food & Drink, Festival, Sports, Wildlife, Photography';
COMMENT ON COLUMN trips.difficulty_level IS 'Easy, Moderate, Challenging, Extreme';

-- Enable real-time subscriptions (optional)
-- You can enable this later when you want real-time features
-- ALTER PUBLICATION supabase_realtime ADD TABLE profiles;
-- ALTER PUBLICATION supabase_realtime ADD TABLE trips;
-- ALTER PUBLICATION supabase_realtime ADD TABLE trip_participants;
-- ALTER PUBLICATION supabase_realtime ADD TABLE messages;
-- ALTER PUBLICATION supabase_realtime ADD TABLE reviews;