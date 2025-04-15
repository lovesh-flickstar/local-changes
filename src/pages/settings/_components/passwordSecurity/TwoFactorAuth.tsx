import { useState } from 'react';

export const TwoFactorAuth = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState('sms');

  return (
    <div className="p-2 text-white fontPrimary">
    <p className="text-xl">Security and Recovery</p>
    <p className="text-sm text-white/70">Manage your account security and authentication preferences</p>
    <div className="max-w-xl 2xl:mt-12 mt-3 my-auto mx-auto p-6 bg-[#0D0D0D] text-white rounded-xl shadow-lg space-y-6 border border-gray-700">
      <h2 className="text-xl font-semibold">Two-Factor Authentication</h2>
      <p className="text-sm text-gray-400">
        Two-factor authentication protects your account by requiring an additional code when you log in on a device that we don't recognise
      </p>

      <div className="space-y-4">
        {/* In-App Auth Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">In-App Authentication</h3>
            <p className="text-sm text-gray-400">Recommended</p>
          </div>
          <div className="flex items-center justify-between">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={isEnabled}
              onChange={() => setIsEnabled(!isEnabled)}
            />
            <div className={`w-10 h-6 rounded-full transition-colors duration-300 ${isEnabled ? 'bg-blue-600' : 'bg-gray-600'}`}>
              <div
                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300  ${isEnabled ? 'translate-x-5 ' : 'translate-x-1'}`}
              />
            </div>
          </label>
        </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Add extra Security to your account</p>

          <div>
            <label htmlFor="authMethod" className="text-sm block mb-1">Authentication Method</label>
            <select
              id="authMethod"
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="w-full bg-[#1A1A1A] text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="sms">SMS Verification</option>
              <option value="app">App Authenticator</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-4">
         
          <button
            onClick={() => alert('Saved')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};
