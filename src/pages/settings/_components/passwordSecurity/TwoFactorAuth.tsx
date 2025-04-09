import { useState } from 'react';
export const TwoFactorAuth =() => {
    const [selectedMethod, setSelectedMethod] = useState('app');
    const [isResetVisible, setIsResetVisible] = useState(false);
  
    return (
      <div className="space-y-6">
        <p className="text-gray-600">
          Two-factor authentication protects your account by requiring an additional code when
          you log in on a device that we don't recognise
        </p>
  
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">In-App Authentication</h3>
                <span className="text-sm text-green-600">Recommended</span>
              </div>
              <button
                onClick={() => setSelectedMethod('app')}
                className={`px-4 py-2 rounded-md ${
                  selectedMethod === 'app'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {selectedMethod === 'app' ? 'Active' : 'Enable'}
              </button>
            </div>
          </div>
  
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">SMS Verification</h3>
                <span className="text-sm text-gray-500">+1 *** *** 1234</span>
              </div>
              <div className="space-x-2">
                {isResetVisible && (
                  <button
                    onClick={() => setIsResetVisible(false)}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    Reset
                  </button>
                )}
                <button
                  onClick={() => {
                    setSelectedMethod('sms');
                    setIsResetVisible(true);
                  }}
                  className={`px-4 py-2 rounded-md ${
                    selectedMethod === 'sms'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {selectedMethod === 'sms' ? 'Active' : 'Enable'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }