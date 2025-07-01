export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          location: string | null
          date_of_birth: string | null
          phone: string | null
          verified: boolean
          travel_preferences: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          date_of_birth?: string | null
          phone?: string | null
          verified?: boolean
          travel_preferences?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          date_of_birth?: string | null
          phone?: string | null
          verified?: boolean
          travel_preferences?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      trips: {
        Row: {
          id: string
          title: string
          description: string | null
          destination: string
          start_date: string
          end_date: string
          max_participants: number
          current_participants: number
          budget_min: number | null
          budget_max: number | null
          trip_type: string
          difficulty_level: string
          tags: string[] | null
          images: string[] | null
          organizer_id: string
          status: 'draft' | 'active' | 'full' | 'completed' | 'cancelled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          destination: string
          start_date: string
          end_date: string
          max_participants: number
          current_participants?: number
          budget_min?: number | null
          budget_max?: number | null
          trip_type: string
          difficulty_level: string
          tags?: string[] | null
          images?: string[] | null
          organizer_id: string
          status?: 'draft' | 'active' | 'full' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          destination?: string
          start_date?: string
          end_date?: string
          max_participants?: number
          current_participants?: number
          budget_min?: number | null
          budget_max?: number | null
          trip_type?: string
          difficulty_level?: string
          tags?: string[] | null
          images?: string[] | null
          organizer_id?: string
          status?: 'draft' | 'active' | 'full' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
      }
      trip_participants: {
        Row: {
          id: string
          trip_id: string
          user_id: string
          status: 'pending' | 'approved' | 'declined' | 'left'
          joined_at: string
          message: string | null
        }
        Insert: {
          id?: string
          trip_id: string
          user_id: string
          status?: 'pending' | 'approved' | 'declined' | 'left'
          joined_at?: string
          message?: string | null
        }
        Update: {
          id?: string
          trip_id?: string
          user_id?: string
          status?: 'pending' | 'approved' | 'declined' | 'left'
          joined_at?: string
          message?: string | null
        }
      }
      messages: {
        Row: {
          id: string
          trip_id: string | null
          sender_id: string
          recipient_id: string | null
          content: string
          message_type: 'direct' | 'trip_chat' | 'system'
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          trip_id?: string | null
          sender_id: string
          recipient_id?: string | null
          content: string
          message_type?: 'direct' | 'trip_chat' | 'system'
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          trip_id?: string | null
          sender_id?: string
          recipient_id?: string | null
          content?: string
          message_type?: 'direct' | 'trip_chat' | 'system'
          read?: boolean
          created_at?: string
        }
      }
      expenses: {
        Row: {
          id: string
          trip_id: string
          payer_id: string
          amount: number
          description: string
          category: 'food' | 'transport' | 'accommodation' | 'activities' | 'shopping' | 'other'
          expense_date: string
          split_type: 'equal' | 'custom'
          split_details: Json | null
          receipt_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          trip_id: string
          payer_id: string
          amount: number
          description: string
          category?: 'food' | 'transport' | 'accommodation' | 'activities' | 'shopping' | 'other'
          expense_date?: string
          split_type?: 'equal' | 'custom'
          split_details?: Json | null
          receipt_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          trip_id?: string
          payer_id?: string
          amount?: number
          description?: string
          category?: 'food' | 'transport' | 'accommodation' | 'activities' | 'shopping' | 'other'
          expense_date?: string
          split_type?: 'equal' | 'custom'
          split_details?: Json | null
          receipt_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      expense_splits: {
        Row: {
          id: string
          expense_id: string
          participant_id: string
          amount_owed: number
          paid: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          expense_id: string
          participant_id: string
          amount_owed: number
          paid?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          expense_id?: string
          participant_id?: string
          amount_owed?: number
          paid?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      activities: {
        Row: {
          id: string
          trip_id: string
          creator_id: string
          title: string
          description: string | null
          location: string | null
          category: 'accommodation' | 'transport' | 'food' | 'sightseeing' | 'shopping' | 'entertainment' | 'other'
          start_date: string
          end_date: string | null
          start_time: string | null
          end_time: string | null
          cost_per_person: number | null
          max_participants: number | null
          current_participants: number
          booking_url: string | null
          notes: string | null
          status: 'planned' | 'confirmed' | 'completed' | 'cancelled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          trip_id: string
          creator_id: string
          title: string
          description?: string | null
          location?: string | null
          category?: 'accommodation' | 'transport' | 'food' | 'sightseeing' | 'shopping' | 'entertainment' | 'other'
          start_date: string
          end_date?: string | null
          start_time?: string | null
          end_time?: string | null
          cost_per_person?: number | null
          max_participants?: number | null
          current_participants?: number
          booking_url?: string | null
          notes?: string | null
          status?: 'planned' | 'confirmed' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          trip_id?: string
          creator_id?: string
          title?: string
          description?: string | null
          location?: string | null
          category?: 'accommodation' | 'transport' | 'food' | 'sightseeing' | 'shopping' | 'entertainment' | 'other'
          start_date?: string
          end_date?: string | null
          start_time?: string | null
          end_time?: string | null
          cost_per_person?: number | null
          max_participants?: number | null
          current_participants?: number
          booking_url?: string | null
          notes?: string | null
          status?: 'planned' | 'confirmed' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
      }
      activity_participants: {
        Row: {
          id: string
          activity_id: string
          participant_id: string
          status: 'interested' | 'confirmed' | 'declined'
          joined_at: string
        }
        Insert: {
          id?: string
          activity_id: string
          participant_id: string
          status?: 'interested' | 'confirmed' | 'declined'
          joined_at?: string
        }
        Update: {
          id?: string
          activity_id?: string
          participant_id?: string
          status?: 'interested' | 'confirmed' | 'declined'
          joined_at?: string
        }
      }
      photos: {
        Row: {
          id: string
          trip_id: string
          uploader_id: string
          file_name: string
          file_path: string
          file_size: number
          mime_type: string
          width: number | null
          height: number | null
          caption: string | null
          location: string | null
          taken_at: string | null
          upload_progress: number
          status: 'uploading' | 'processing' | 'ready' | 'error'
          storage_bucket: string
          public_url: string | null
          thumbnail_url: string | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          trip_id: string
          uploader_id: string
          file_name: string
          file_path: string
          file_size: number
          mime_type: string
          width?: number | null
          height?: number | null
          caption?: string | null
          location?: string | null
          taken_at?: string | null
          upload_progress?: number
          status?: 'uploading' | 'processing' | 'ready' | 'error'
          storage_bucket?: string
          public_url?: string | null
          thumbnail_url?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          trip_id?: string
          uploader_id?: string
          file_name?: string
          file_path?: string
          file_size?: number
          mime_type?: string
          width?: number | null
          height?: number | null
          caption?: string | null
          location?: string | null
          taken_at?: string | null
          upload_progress?: number
          status?: 'uploading' | 'processing' | 'ready' | 'error'
          storage_bucket?: string
          public_url?: string | null
          thumbnail_url?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          trip_id: string
          reviewer_id: string
          reviewee_id: string
          rating: number
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: string
          trip_id: string
          reviewer_id: string
          reviewee_id: string
          rating: number
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          trip_id?: string
          reviewer_id?: string
          reviewee_id?: string
          rating?: number
          comment?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      trip_status: 'draft' | 'active' | 'full' | 'completed' | 'cancelled'
      participant_status: 'pending' | 'approved' | 'declined' | 'left'
      message_type: 'direct' | 'trip_chat' | 'system'
      expense_category: 'food' | 'transport' | 'accommodation' | 'activities' | 'shopping' | 'other'
      split_type: 'equal' | 'custom'
      activity_category: 'accommodation' | 'transport' | 'food' | 'sightseeing' | 'shopping' | 'entertainment' | 'other'
      activity_status: 'planned' | 'confirmed' | 'completed' | 'cancelled'
      activity_participant_status: 'interested' | 'confirmed' | 'declined'
      photo_status: 'uploading' | 'processing' | 'ready' | 'error'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"])
  ? (Database["public"]["Tables"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"])[TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"])
  ? (Database["public"]["Tables"])[PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"])[TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"])
  ? (Database["public"]["Tables"])[PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof (Database["public"]["Enums"])
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicEnumNameOrOptions["schema"]]["Enums"])
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicEnumNameOrOptions["schema"]]["Enums"])[EnumName]
  : PublicEnumNameOrOptions extends keyof (Database["public"]["Enums"])
  ? (Database["public"]["Enums"])[PublicEnumNameOrOptions]
  : never