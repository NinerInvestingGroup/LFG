-- Community Feed Database Setup
-- Run this script in your Supabase SQL editor after running the main setup.sql

-- Create feed_items table
CREATE TABLE IF NOT EXISTS feed_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('trip_update', 'achievement', 'recommendation', 'trending')),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  location TEXT,
  trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
  likes_count INTEGER DEFAULT 0 CHECK (likes_count >= 0),
  comments_count INTEGER DEFAULT 0 CHECK (comments_count >= 0),
  shares_count INTEGER DEFAULT 0 CHECK (shares_count >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create feed_likes table
CREATE TABLE IF NOT EXISTS feed_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  feed_item_id UUID REFERENCES feed_items(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(feed_item_id, user_id)
);

-- Create feed_comments table
CREATE TABLE IF NOT EXISTS feed_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  feed_item_id UUID REFERENCES feed_items(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create feed_shares table
CREATE TABLE IF NOT EXISTS feed_shares (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  feed_item_id UUID REFERENCES feed_items(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(feed_item_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE feed_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE feed_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE feed_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE feed_shares ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_feed_items_user_id ON feed_items(user_id);
CREATE INDEX IF NOT EXISTS idx_feed_items_type ON feed_items(type);
CREATE INDEX IF NOT EXISTS idx_feed_items_trip_id ON feed_items(trip_id);
CREATE INDEX IF NOT EXISTS idx_feed_items_created_at ON feed_items(created_at);
CREATE INDEX IF NOT EXISTS idx_feed_likes_feed_item_id ON feed_likes(feed_item_id);
CREATE INDEX IF NOT EXISTS idx_feed_likes_user_id ON feed_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_feed_comments_feed_item_id ON feed_comments(feed_item_id);
CREATE INDEX IF NOT EXISTS idx_feed_shares_feed_item_id ON feed_shares(feed_item_id);

-- Row Level Security Policies

-- Feed items policies
CREATE POLICY "Anyone can view feed items" ON feed_items
  FOR SELECT USING (true);

CREATE POLICY "Users can create their own feed items" ON feed_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own feed items" ON feed_items
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own feed items" ON feed_items
  FOR DELETE USING (auth.uid() = user_id);

-- Feed likes policies
CREATE POLICY "Anyone can view likes" ON feed_likes
  FOR SELECT USING (true);

CREATE POLICY "Users can like items" ON feed_likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike items" ON feed_likes
  FOR DELETE USING (auth.uid() = user_id);

-- Feed comments policies
CREATE POLICY "Anyone can view comments" ON feed_comments
  FOR SELECT USING (true);

CREATE POLICY "Users can create comments" ON feed_comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments" ON feed_comments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments" ON feed_comments
  FOR DELETE USING (auth.uid() = user_id);

-- Feed shares policies
CREATE POLICY "Anyone can view shares" ON feed_shares
  FOR SELECT USING (true);

CREATE POLICY "Users can share items" ON feed_shares
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unshare items" ON feed_shares
  FOR DELETE USING (auth.uid() = user_id);

-- Functions for engagement counters
CREATE OR REPLACE FUNCTION increment_likes(feed_item_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE feed_items 
  SET likes_count = likes_count + 1,
      updated_at = NOW()
  WHERE id = feed_item_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION decrement_likes(feed_item_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE feed_items 
  SET likes_count = GREATEST(likes_count - 1, 0),
      updated_at = NOW()
  WHERE id = feed_item_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION increment_comments(feed_item_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE feed_items 
  SET comments_count = comments_count + 1,
      updated_at = NOW()
  WHERE id = feed_item_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION increment_shares(feed_item_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE feed_items 
  SET shares_count = shares_count + 1,
      updated_at = NOW()
  WHERE id = feed_item_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically update updated_at timestamp
CREATE OR REPLACE TRIGGER update_feed_items_updated_at
  BEFORE UPDATE ON feed_items
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE OR REPLACE TRIGGER update_feed_comments_updated_at
  BEFORE UPDATE ON feed_comments
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- Function to automatically create feed item when trip is created
CREATE OR REPLACE FUNCTION create_trip_feed_item()
RETURNS trigger AS $$
BEGIN
  INSERT INTO feed_items (type, user_id, title, description, location, trip_id)
  VALUES (
    'trip_update',
    NEW.organizer_id,
    'New Trip Created: ' || NEW.title,
    NEW.description,
    NEW.destination,
    NEW.id
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create feed item when trip is created
CREATE OR REPLACE TRIGGER on_trip_created_create_feed
  AFTER INSERT ON trips
  FOR EACH ROW 
  WHEN (NEW.status = 'active')
  EXECUTE PROCEDURE create_trip_feed_item();

-- Sample feed data (optional - remove if you don't want sample data)
INSERT INTO feed_items (type, user_id, title, description, location, likes_count, comments_count, shares_count) 
SELECT 
  'recommendation',
  id,
  'Welcome to LFG! 🎉',
  'Thanks for joining our travel community. Start by creating your first trip or browse existing adventures!',
  NULL,
  5,
  2,
  1
FROM profiles 
WHERE id IN (SELECT id FROM profiles LIMIT 1)
ON CONFLICT DO NOTHING;

-- Enable real-time subscriptions for feed (optional)
-- ALTER PUBLICATION supabase_realtime ADD TABLE feed_items;
-- ALTER PUBLICATION supabase_realtime ADD TABLE feed_likes;
-- ALTER PUBLICATION supabase_realtime ADD TABLE feed_comments;