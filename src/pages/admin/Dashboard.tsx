import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, Car, History, Settings } from 'lucide-react';

export function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Панель адміністратора</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/admin/appointments"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <Calendar className="h-8 w-8 text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Записи на сервіс</h2>
          <p className="text-gray-600">
            Управління записами клієнтів
          </p>
        </Link>

        <Link
          to="/admin/clients"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <Users className="h-8 w-8 text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Клієнти</h2>
          <p className="text-gray-600">
            База даних клієнтів
          </p>
        </Link>

        <Link
          to="/admin/vehicles"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <Car className="h-8 w-8 text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Автомобілі</h2>
          <p className="text-gray-600">
            Управління автомобілями клієнтів
          </p>
        </Link>

        <Link
          to="/admin/service-history"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <History className="h-8 w-8 text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Історія обслуговування</h2>
          <p className="text-gray-600">
            Історія ремонтів та обслуговування
          </p>
        </Link>

        <Link
          to="/admin/users"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <Settings className="h-8 w-8 text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Користувачі</h2>
          <p className="text-gray-600">
            Управління користувачами системи
          </p>
        </Link>
      </div>
    </div>
  );
}