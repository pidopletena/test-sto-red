/*
  # Create core tables for auto service

  1. New Tables
    - `vehicles`
      - `id` (uuid, primary key)
      - `client_id` (uuid, references auth.users)
      - `make` (text)
      - `model` (text)
      - `year` (integer)
      - `vin` (text, unique)
      - `license_plate` (text)
      - Created/updated timestamps
    
    - `admin_users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `name` (text)
      - `role` (text, enum)
      - `active` (boolean)
      - Created/updated timestamps
    
    - `service_history`
      - `id` (uuid, primary key)
      - `vehicle_id` (uuid, references vehicles)
      - `service_date` (date)
      - `mileage` (integer)
      - `service_type` (text)
      - `description` (text)
      - `parts_used` (jsonb)
      - `cost` (decimal)
      - `technician_id` (uuid, references admin_users)
      - Created/updated timestamps
    
    - `service_book`
      - `id` (uuid, primary key)
      - `vehicle_id` (uuid, references vehicles)
      - `service_interval` (integer)
      - `last_service_date` (date)
      - `last_service_mileage` (integer)
      - `next_service_date` (date)
      - `next_service_mileage` (integer)
      - `service_items` (jsonb)
      - `notes` (text)
      - Created/updated timestamps

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add policies for admin users
*/

-- Vehicles Table
CREATE TABLE IF NOT EXISTS vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES auth.users(id) NOT NULL,
  make text NOT NULL,
  model text NOT NULL,
  year integer NOT NULL,
  vin text UNIQUE,
  license_plate text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'technician', 'manager')),
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Service History Table
CREATE TABLE IF NOT EXISTS service_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id uuid REFERENCES vehicles(id) NOT NULL,
  service_date date NOT NULL,
  mileage integer NOT NULL,
  service_type text NOT NULL,
  description text NOT NULL,
  parts_used jsonb,
  cost decimal(10,2) NOT NULL,
  technician_id uuid REFERENCES admin_users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Service Book Table
CREATE TABLE IF NOT EXISTS service_book (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id uuid REFERENCES vehicles(id) NOT NULL,
  service_interval integer NOT NULL,
  last_service_date date,
  last_service_mileage integer,
  next_service_date date,
  next_service_mileage integer,
  service_items jsonb NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_book ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policies for vehicles
CREATE POLICY "Users can view own vehicles"
  ON vehicles
  FOR SELECT
  TO authenticated
  USING (client_id = auth.uid());

CREATE POLICY "Admin users can view all vehicles"
  ON vehicles
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM admin_users WHERE active = true
    )
  );

-- Policies for service_history
CREATE POLICY "Clients can view their own service history"
  ON service_history
  FOR SELECT
  TO authenticated
  USING (
    vehicle_id IN (
      SELECT id FROM vehicles WHERE client_id = auth.uid()
    )
  );

CREATE POLICY "Admin users can manage all service history"
  ON service_history
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM admin_users WHERE active = true
    )
  );

-- Policies for service_book
CREATE POLICY "Clients can view their own service book"
  ON service_book
  FOR SELECT
  TO authenticated
  USING (
    vehicle_id IN (
      SELECT id FROM vehicles WHERE client_id = auth.uid()
    )
  );

CREATE POLICY "Admin users can manage all service books"
  ON service_book
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM admin_users WHERE active = true
    )
  );

-- Policies for admin_users
CREATE POLICY "Admin users are viewable by authenticated users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only super admins can manage admin users"
  ON admin_users
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM admin_users WHERE role = 'admin' AND active = true
    )
  );