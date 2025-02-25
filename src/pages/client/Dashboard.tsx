import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Clock, History, Book } from 'lucide-react';

export function ClientDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Особистий кабінет</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          to="/appointments"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <Clock className="h-8 w-8 text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Записатися на сервіс</h2>
          <p className="text-gray-600">
            Заплануйте візит до нашого сервісу
          </p>
        </Link>

        <Link
          to="/service-history"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <History className="h-8 w-8 text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Історія обслуговування</h2>
          <p className="text-gray-600">
            Перегляд всіх виконаних робіт
          </p>
        </Link>

        <Link
          to="/service-book"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <Book className="h-8 w-8 text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Сервісна книжка</h2>
          <p className="text-gray-600">
            Графік технічного обслуговування
          </p>
        </Link>

        <Link
          to="/vehicles"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <Car className="h-8 w-8 text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Мої автомобілі</h2>
          <p className="text-gray-600">
            Управління вашими автомобілями
          </p>
        </Link>
      </div>
    </div>
  );
}