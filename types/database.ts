export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string;
          cover_url: string | null;
          tags: string[] | null;
          read_time: number | null;
          published: boolean;
          published_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt?: string | null;
          content: string;
          cover_url?: string | null;
          tags?: string[] | null;
          read_time?: number | null;
          published?: boolean;
          published_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string | null;
          content?: string;
          cover_url?: string | null;
          tags?: string[] | null;
          read_time?: number | null;
          published?: boolean;
          published_at?: string | null;
          created_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string | null;
          content: string | null;
          tech_stack: string[] | null;
          image_url: string | null;
          live_url: string | null;
          featured: boolean;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description?: string | null;
          content?: string | null;
          tech_stack?: string[] | null;
          image_url?: string | null;
          live_url?: string | null;
          featured?: boolean;
          order_index?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string | null;
          content?: string | null;
          tech_stack?: string[] | null;
          image_url?: string | null;
          live_url?: string | null;
          featured?: boolean;
          order_index?: number;
          created_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          service: string | null;
          body: string;
          read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          service?: string | null;
          body: string;
          read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          service?: string | null;
          body?: string;
          read?: boolean;
          created_at?: string;
        };
      };
    };
  };
};

export type Post = Database['public']['Tables']['posts']['Row'];
export type Project = Database['public']['Tables']['projects']['Row'];
export type Message = Database['public']['Tables']['messages']['Row'];