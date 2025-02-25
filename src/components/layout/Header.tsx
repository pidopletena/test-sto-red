import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, Clock, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            АвтоСервіс
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600">
              Головна
            </Link>
            <Link to="/services" className="text-gray-600 hover:text-blue-600">
              Послуги
            </Link>
            <Link to="/appointments" className="text-gray-600 hover:text-blue-600">
              Записатися
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600">
              Про нас
            </Link>
            <Link to="/contacts" className="text-gray-600 hover:text-blue-600">
              Контакти
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-blue-600" />
              <span className="text-gray-600">+380 50 123 4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="text-gray-600">9:00 - 18:00</span>
            </div>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={isAdmin ? "/admin" : "/dashboard"}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
                >
                  <User className="h-5 w-5" />
                  <span>Кабінет</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Вийти</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
              >
                <User className="h-5 w-5" />
                <span>Увійти</span>
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Головна
              </Link>
              <Link
                to="/services"
                className="text-gray-600 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Послуги
              </Link>
              <Link
                to="/appointments"
                className="text-gray-600 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Записатися
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Про нас
              </Link>
              <Link
                to="/contacts"
                className="text-gray-600 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Контакти
              </Link>
              {user ? (
                <>
                  <Link
                    to={isAdmin ? "/admin" : "/dashboard"}
                    className="text-gray-600 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Особистий кабінет
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-gray-600 hover:text-blue-600"
                  >
                    Вийти
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Увійти
                </Link>
              )}
            </nav>
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-blue-600" />
                <span className="text-gray-600">+380 50 123 4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span className="text-gray-600">9:00 - 18:00</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}