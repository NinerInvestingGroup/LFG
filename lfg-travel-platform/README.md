# LFG Travel Platform

A modern social travel coordination platform built with Next.js 14, TypeScript, and Supabase. Connect with fellow travelers, discover amazing trips, and coordinate group adventures.

## 🌟 Features

- **Social Travel Coordination**: Connect with like-minded travelers
- **Trip Discovery**: Browse and join unique travel experiences
- **Real-time Messaging**: Coordinate with your travel group
- **Profile Management**: Showcase your travel preferences and experience
- **Trip Planning**: Create and manage group travel itineraries
- **Safety First**: Verified profiles and reviews for peace of mind

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State Management**: Zustand
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Deployment**: Vercel-ready

## 📁 Project Structure

\`\`\`
lfg-travel-platform/
├── public/                     # Static assets
│   ├── icons/                 # App icons
│   ├── images/                # Images and graphics
│   └── favicon.ico            # Site favicon
├── src/
│   ├── app/                   # Next.js 14 App Router
│   │   ├── (auth)/           # Authentication pages
│   │   ├── dashboard/        # User dashboard
│   │   ├── trips/           # Trip management
│   │   ├── discover/        # Trip discovery
│   │   ├── messages/        # Messaging system
│   │   └── profile/         # User profiles
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # Basic UI components
│   │   ├── forms/           # Form components
│   │   ├── navigation/      # Navigation components
│   │   ├── cards/           # Card components
│   │   └── modals/          # Modal components
│   ├── shared/              # Shared code (React Native compatible)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript type definitions
│   │   ├── utils/           # Utility functions
│   │   └── constants/       # App constants
│   ├── lib/                 # Configuration files
│   │   ├── supabase.ts      # Supabase client config
│   │   ├── auth.ts          # Authentication helpers
│   │   └── database.ts      # Database utilities
│   └── styles/              # Global styles
├── package.json             # Dependencies and scripts
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── .env.local.example      # Environment variables template
└── README.md               # Project documentation
\`\`\`

## 🛠 Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account and project
- Git

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd lfg-travel-platform
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.local.example .env.local
   \`\`\`
   
   Fill in your environment variables:
   \`\`\`env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   \`\`\`

4. **Set up the database**
   
   Create the following tables in your Supabase database:

   \`\`\`sql
   -- Profiles table
   CREATE TABLE profiles (
     id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
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

   -- Trips table
   CREATE TABLE trips (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT NOT NULL,
     description TEXT,
     destination TEXT NOT NULL,
     start_date DATE NOT NULL,
     end_date DATE NOT NULL,
     max_participants INTEGER NOT NULL,
     current_participants INTEGER DEFAULT 0,
     budget_min DECIMAL,
     budget_max DECIMAL,
     trip_type TEXT NOT NULL,
     difficulty_level TEXT NOT NULL,
     tags TEXT[],
     images TEXT[],
     organizer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
     status TEXT DEFAULT 'draft',
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Trip participants table
   CREATE TABLE trip_participants (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
     user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
     status TEXT DEFAULT 'pending',
     joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     message TEXT,
     UNIQUE(trip_id, user_id)
   );

   -- Messages table
   CREATE TABLE messages (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
     sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
     recipient_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
     content TEXT NOT NULL,
     message_type TEXT DEFAULT 'direct',
     read BOOLEAN DEFAULT FALSE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Reviews table
   CREATE TABLE reviews (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
     reviewer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
     reviewee_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
     rating INTEGER CHECK (rating >= 1 AND rating <= 5),
     comment TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     UNIQUE(trip_id, reviewer_id, reviewee_id)
   );
   \`\`\`

5. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎨 Design System

The platform uses a custom design system with:

- **Colors**: Travel-inspired palette with primary blue, warm yellow, and fresh green
- **Typography**: Inter for body text, Poppins for headings
- **Components**: Consistent, accessible UI components
- **Responsive**: Mobile-first design approach

## 🔧 Configuration

### Supabase Setup

1. Create a new Supabase project
2. Set up authentication with email/password
3. Configure Row Level Security (RLS) policies
4. Set up storage buckets for images and avatars

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@lfg-travel.com or join our community Discord.

## 🗺 Roadmap

- [ ] **Phase 1**: Basic authentication and profile management
- [ ] **Phase 2**: Trip creation and discovery
- [ ] **Phase 3**: Messaging and group coordination
- [ ] **Phase 4**: Reviews and recommendations
- [ ] **Phase 5**: Mobile app (React Native)
- [ ] **Phase 6**: Advanced features (AI recommendations, payment integration)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database and auth by [Supabase](https://supabase.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)

---

**Ready to start your adventure? Let's Go Together! 🌍✈️**
