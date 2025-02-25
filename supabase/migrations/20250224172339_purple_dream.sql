/*
  # Add admin user

  1. Changes
    - Insert default admin user into admin_users table
    - Create auth user for admin
    - Set admin user password
*/

-- Insert admin user into admin_users table
INSERT INTO admin_users (email, name, role)
VALUES ('admin@autoservice.com', 'Головний Адміністратор', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Create auth user for admin
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@autoservice.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now()
) ON CONFLICT (email) DO NOTHING;