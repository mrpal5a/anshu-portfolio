-- ============================================
-- Anshu Portfolio — Supabase Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Posts (blog articles)
CREATE TABLE IF NOT EXISTS posts (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title       text NOT NULL,
  slug        text UNIQUE NOT NULL,
  excerpt     text,
  content     text NOT NULL DEFAULT '',
  cover_url   text,
  tags        text[],
  read_time   integer,
  published   boolean DEFAULT false,
  published_at timestamptz,
  created_at  timestamptz DEFAULT now()
);

-- Projects / portfolio items
CREATE TABLE IF NOT EXISTS projects (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title       text NOT NULL,
  slug        text UNIQUE NOT NULL,
  description text,
  content     text,
  tech_stack  text[],
  image_url   text,
  live_url    text,
  featured    boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at  timestamptz DEFAULT now()
);

-- Contact form submissions
CREATE TABLE IF NOT EXISTS messages (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name        text NOT NULL,
  email       text NOT NULL,
  service     text,
  body        text NOT NULL,
  read        boolean DEFAULT false,
  created_at  timestamptz DEFAULT now()
);

-- Row Level Security
ALTER TABLE posts     ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects  ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages  ENABLE ROW LEVEL SECURITY;

-- Public can read published posts and all projects
CREATE POLICY "Public read published posts"
  ON posts FOR SELECT USING (published = true);

CREATE POLICY "Public read projects"
  ON projects FOR SELECT USING (true);

-- Only authenticated users (you) can do everything else
CREATE POLICY "Auth full access posts"
  ON posts FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Auth full access projects"
  ON projects FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Auth full access messages"
  ON messages FOR ALL USING (auth.role() = 'authenticated');

-- Anyone can insert a message (contact form)
CREATE POLICY "Public insert message"
  ON messages FOR INSERT WITH CHECK (true);
ALTER TABLE projects ADD COLUMN live_url text;