import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Database } from 'lucide-react';

export function DatabaseCheckPage() {
  const [user, setUser] = useState<any>(null);
  const [tables, setTables] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkDatabase() {
      try {
        // Перевіряємо наявність користувача
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('email', 'gorunu4@example.com')
          .maybeSingle();

        // Якщо є помилка, яка не пов'язана з відсутністю даних
        if (userError && userError.code !== 'PGRST116') {
          throw userError;
        }

        setUser(userData);

        // Отримуємо список всіх таблиць
        const { data: tablesData, error: tablesError } = await supabase
          .from('information_schema.tables')
          .select('table_name')
          .eq('table_schema', 'public');

        if (tablesError) throw tablesError;
        setTables(tablesData?.map(t => t.table_name) || []);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Помилка при перевірці бази даних');
      } finally {
        setLoading(false);
      }
    }

    checkDatabase();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <Database className="h-12 w-12 text-red-600 animate-pulse mx-auto mb-4" />
          <p className="text-lg text-gray-600">Перевірка бази даних...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-gray-900">Перевірка бази даних</h1>

      {error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-red-700 mb-2">Помилка підключення</h2>
          <p className="text-red-600">{error}</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Статус підключення */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <h2 className="text-lg font-semibold text-gray-900">Підключення до бази даних активне</h2>
            </div>
          </div>

          {/* Перевірка користувача */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Перевірка тестового користувача</h2>
            {user ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-green-600">
                  <span className="text-2xl">✓</span>
                  <span>Користувача знайдено</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <dl className="space-y-2">
                    <div className="flex">
                      <dt className="w-24 font-medium text-gray-600">Email:</dt>
                      <dd>{user.email}</dd>
                    </div>
                    <div className="flex">
                      <dt className="w-24 font-medium text-gray-600">Ім'я:</dt>
                      <dd>{user.name}</dd>
                    </div>
                    <div className="flex">
                      <dt className="w-24 font-medium text-gray-600">Роль:</dt>
                      <dd>{user.role}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            ) : (
              <div className="text-yellow-600 flex items-center space-x-2">
                <span className="text-2xl">⚠</span>
                <span>Користувача не знайдено в базі даних</span>
              </div>
            )}
          </div>

          {/* Список таблиць */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Таблиці в базі даних</h2>
            {tables.length > 0 ? (
              <ul className="space-y-2">
                {tables.map(table => (
                  <li 
                    key={table}
                    className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-700"
                  >
                    {table}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Таблиць не знайдено</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}