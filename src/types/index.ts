export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
}

export interface Appointment {
  id: string;
  service_id: string;
  client_id: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
}

export interface Vehicle {
  id: string;
  client_id: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  license_plate: string;
}

export interface ServiceHistory {
  id: string;
  vehicle_id: string;
  service_date: string;
  mileage: number;
  service_type: string;
  description: string;
  parts_used: Record<string, any>;
  cost: number;
  technician_id: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceBook {
  id: string;
  vehicle_id: string;
  service_interval: number;
  last_service_date: string | null;
  last_service_mileage: number | null;
  next_service_date: string | null;
  next_service_mileage: number | null;
  service_items: Record<string, any>;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'technician' | 'manager';
  active: boolean;
  created_at: string;
  updated_at: string;
}