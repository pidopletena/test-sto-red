/*
  # Create users table and add test user
  
  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `name` (text)
      - `role` (text)
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on users table
    - Add policy for authenticated users to read their own data
    
  3. Initial Data
    - Add test user
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  role text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Insert test user
INSERT INTO users (email, name, role)
VALUES ('gorunu4@example.com', 'Test User', 'user')
ON CONFLICT (email) DO NOTHING;