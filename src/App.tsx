import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { AppointmentPage } from './pages/AppointmentPage';
import { LoginPage } from './pages/auth/LoginPage';
import { ClientDashboard } from './pages/client/Dashboard';
import { ServiceHistoryPage } from './pages/client/ServiceHistory';
import { ServiceBookPage } from './pages/client/ServiceBook';
import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminAppointments } from './pages/admin/Appointments';
import { AdminClients } from './pages/admin/Clients';
import { AdminVehicles } from './pages/admin/Vehicles';
import { AdminServiceHistory } from './pages/admin/ServiceHistory';
import { AdminUsers } from './pages/admin/Users';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { AdminRoute } from './components/auth/AdminRoute';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/appointments" element={<AppointmentPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Client routes */}
            <Route path="/dashboard" element={
              <PrivateRoute>
                <ClientDashboard />
              </PrivateRoute>
            } />
            <Route path="/service-history" element={
              <PrivateRoute>
                <ServiceHistoryPage />
              </PrivateRoute>
            } />
            <Route path="/service-book" element={
              <PrivateRoute>
                <ServiceBookPage />
              </PrivateRoute>
            } />

            {/* Admin routes */}
            <Route path="/admin" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
            <Route path="/admin/appointments" element={
              <AdminRoute>
                <AdminAppointments />
              </AdminRoute>
            } />
            <Route path="/admin/clients" element={
              <AdminRoute>
                <AdminClients />
              </AdminRoute>
            } />
            <Route path="/admin/vehicles" element={
              <AdminRoute>
                <AdminVehicles />
              </AdminRoute>
            } />
            <Route path="/admin/service-history" element={
              <AdminRoute>
                <AdminServiceHistory />
              </AdminRoute>
            } />
            <Route path="/admin/users" element={
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;