import { useState } from 'react';

interface DeviceActivity {
  device: string;
  ip: string;
  location: string;
  timestamp: string;
  status: 'Online' | 'Offline';
}

export default function DevicesActivity() {
  const [activities, ] = useState<DeviceActivity[]>([
    {
      device: 'Chrome on Windows',
      ip: '192.168.1.1',
      location: 'New York, USA',
      timestamp: '5 Mins ago',
      status: 'Online'
    },
    {
      device: 'Chrome on Windows',
      ip: '192.168.1.1',
      location: 'New York, USA',
      timestamp: '2 weeks ago',
      status: 'Offline'
    },
    {
      device: 'Chrome on Windows',
      ip: '192.168.1.1',
      location: 'New York, USA',
      timestamp: '11 June 2024',
      status: 'Offline'
    }
  ]);

  const handleTerminateSessions = () => {
    // Add session termination logic here
    alert('All sessions terminated successfully');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2 sm:mb-0">
              Devices Recent Activity
            </h2>
            <button
              onClick={handleTerminateSessions}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
            >
              Terminate all sessions
            </button>
          </div>

          {/* Activity List */}
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {/* Device Info */}
                <div className="flex-1 mb-2 md:mb-0">
                  <div className="flex items-center space-x-2">
                    <span className="flex h-2 w-2 relative">
                      <span
                        className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                          activity.status === 'Online' ? 'bg-green-400' : 'bg-gray-400'
                        } opacity-75`}
                      ></span>
                      <span
                        className={`relative inline-flex rounded-full h-2 w-2 ${
                          activity.status === 'Online' ? 'bg-green-500' : 'bg-gray-500'
                        }`}
                      ></span>
                    </span>
                    <h3 className="text-base font-medium text-gray-900">
                      Successful login from {activity.device}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 ml-4">
                    IP: {activity.ip} - {activity.location}
                  </p>
                </div>

                {/* Timestamp */}
                <div className="md:text-right">
                  <p className="text-sm text-gray-500">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}