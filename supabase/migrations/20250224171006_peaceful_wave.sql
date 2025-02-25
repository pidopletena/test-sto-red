/*
  # Service History and Admin System

  1. New Tables
    - `service_history`
      - Records of all service work performed
      - Links to appointments and vehicles
    - `service_book`
      - Vehicle maintenance records
      - Scheduled service intervals
    - `admin_users`
      - Staff and admin accounts
      - Role-based access control

  2. Security
    - Enable RLS on all tables
    - Add policies for client and admin access
*/

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

-- Enable RLS
ALTER TABLE service_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_book ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

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
  USING (
    auth.uid() IN (
      SELECT id FROM admin_users WHERE role = 'admin' AND active = true
    )
  );