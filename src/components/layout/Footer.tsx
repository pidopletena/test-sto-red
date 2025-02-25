import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">АвтоСервіс</h3>
            <p className="text-gray-400">
              Професійне обслуговування та ремонт автомобілів з гарантією якості
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Контакти</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span>вул. Автомобільна, 123</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span>+380 50 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span>info@autoservice.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-blue-400" />
                <span>Пн-Сб: 9:00 - 18:00</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Послуги</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services/diagnostics" className="text-gray-400 hover:text-blue-400">
                  Діагностика
                </Link>
              </li>
              <li>
                <Link to="/services/repair" className="text-gray-400 hover:text-blue-400">
                  Ремонт
                </Link>
              </li>
              <li>
                <Link to="/services/maintenance" className="text-gray-400 hover:text-blue-400">
                  Технічне обслуговування
                </Link>
              </li>
              <li>
                <Link to="/services/tire-service" className="text-gray-400 hover:text-blue-400">
                  Шиномонтаж
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Інформація</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-blue-400">
                  Про нас
                </Link>
              </li>
              <li>
                <Link to="/prices" className="text-gray-400 hover:text-blue-400">
                  Ціни
                </Link>
              </li>
              <li>
                <Link to="/guarantees" className="text-gray-400 hover:text-blue-400">
                  Гарантії
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-gray-400 hover:text-blue-400">
                  Контакти
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} АвтоСервіс. Всі права захищені.</p>
        </div>
      </div>
    </footer>
  );
}