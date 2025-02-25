import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { ServiceHistory, Vehicle } from '../../types';
import { format } from 'date-fns';

export function ServiceHistoryPage() {
  const [history, setHistory] = useState<ServiceHistory[]>([]);
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

        // Fetch service history
        const { data: historyData } = await supabase
          .from('service_history')
          .select(`
            *,
            technician:admin_users(name)
          `)
          .eq('vehicle_id', selectedVehicle)
          .order('service_date', { ascending: false });

        if (historyData) {
          setHistory(historyData);
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
      <h1 className="text-3xl font-bold mb-8">Історія обслуговування</h1>

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

          {history.length > 0 ? (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Дата
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Пробіг
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Тип обслуговування
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Опис
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Вартість
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Майстер
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {history.map((record) => (
                    <tr key={record.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {format(new Date(record.service_date), 'dd.MM.yyyy')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {record.mileage} км
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {record.service_type}
                      </td>
                      <td className="px-6 py-4">
                        {record.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {record.cost} грн
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {record.technician.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">
                Історія обслуговування для цього автомобіля відсутня
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