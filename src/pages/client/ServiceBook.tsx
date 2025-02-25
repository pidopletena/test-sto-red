import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { ServiceBook, Vehicle } from '../../types';
import { format } from 'date-fns';

export function ServiceBookPage() {
  const [serviceBooks, setServiceBooks] = useState<ServiceBook[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch user's vehicles
        const { data: vehiclesData } = await supabase
          .from('vehicles')
          .select('*')
          .eq('client_id', supabase.auth.user()?.id);

        if (vehiclesData) {
          setVehicles(vehiclesData);
          if (vehiclesData.length > 0) {
            setSelectedVehicle(vehiclesData[0].id);
          }
        }

        // Fetch service book
        if (selectedVehicle) {
          const { data: serviceBookData } = await supabase
            .from('service_book')
            .select('*')
            .eq('vehicle_id', selectedVehicle)
            .single();

          if (serviceBookData) {
            setServiceBooks([serviceBookData]);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [selectedVehicle]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Сервісна книжка</h1>

      {vehicles.length > 0 ? (
        <>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Оберіть автомобіль
            </label>
            <select
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
              className="w-full md:w-64 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.make} {vehicle.model} ({vehicle.year})
                </option>
              ))}
            </select>
          </div>

          {serviceBooks.length > 0 ? (
            <div className="space-y-6">
              {serviceBooks.map((book) => (
                <div key={book.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Останнє обслуговування
                      </h3>
                      <div className="space-y-2">
                        <p>
                          <span className="font-medium">Дата: </span>
                          {book.last_service_date
                            ? format(new Date(book.last_service_date), 'dd.MM.yyyy')
                            : 'Немає даних'}
                        </p>
                        <p>
                          <span className="font-medium">Пробіг: </span>
                          {book.last_service_mileage
                            ? `${book.last_service_mileage} км`
                            : 'Немає даних'}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Наступне обслуговування
                      </h3>
                      <div className="space-y-2">
                        <p>
                          <span className="font-medium">Дата: </span>
                          {book.next_service_date
                            ? format(new Date(book.next_service_date), 'dd.MM.yyyy')
                            : 'Немає даних'}
                        </p>
                        <p>
                          <span className="font-medium">Пробіг: </span>
                          {book.next_service_mileage
                            ? `${book.next_service_mileage} км`
                            : 'Немає даних'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Рекомендовані роботи
                    </h3>
                    <ul className="space-y-2">
                      {Object.entries(book.service_items).map(([key, value]) => (
                        <li key={key} className="flex items-center space-x-2">
                          <span className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                          </span>
                          <span>{value as string}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {book.notes && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-2">Примітки</h3>
                      <p className="text-gray-600">{book.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">
                Сервісна книжка для цього автомобіля відсутня
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            У вас ще немає зареєстрованих автомобілів
          </p>
          <Link
            to="/vehicles/add"
            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Додати автомобіль
          </Link>
        </div>
      )}
    </div>
  );
}