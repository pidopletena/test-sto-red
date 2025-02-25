import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Car, Clock, Shield } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Професійний автосервіс з турботою про ваше авто
            </h1>
            <p className="text-xl mb-8">
              Довірте своє авто професіоналам. Ми забезпечуємо якісний ремонт та обслуговування
              автомобілів будь-яких марок.
            </p>
            <Link
              to="/appointments"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Записатися на сервіс
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Wrench className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Досвідчені майстри</h3>
              <p className="text-gray-600">
                Наші спеціалісти мають багаторічний досвід роботи з різними марками авто
              </p>
            </div>
            <div className="text-center">
              <Car className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Сучасне обладнання</h3>
              <p className="text-gray-600">
                Використовуємо передове діагностичне та ремонтне обладнання
              </p>
            </div>
            <div className="text-center">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Швидкий сервіс</h3>
              <p className="text-gray-600">
                Виконуємо роботи в найкоротші терміни без втрати якості
              </p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Гарантія якості</h3>
              <p className="text-gray-600">
                Надаємо гарантію на всі види виконаних робіт та запчастини
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Наші послуги</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Діагностика</h3>
              <p className="text-gray-600 mb-4">
                Комплексна діагностика всіх систем автомобіля з використанням
                професійного обладнання
              </p>
              <Link
                to="/services/diagnostics"
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                Детальніше →
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Технічне обслуговування</h3>
              <p className="text-gray-600 mb-4">
                Регулярне обслуговування автомобіля для підтримки його в ідеальному
                стані
              </p>
              <Link
                to="/services/maintenance"
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                Детальніше →
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Ремонтні роботи</h3>
              <p className="text-gray-600 mb-4">
                Професійний ремонт двигуна, ходової частини, трансмісії та інших
                систем
              </p>
              <Link
                to="/services/repair"
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                Детальніше →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}