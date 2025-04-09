import { useState } from 'react';
export const ChangePasswordForm = () => {
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [isValid, setIsValid] = useState(false);
  
    const validatePassword = (password: string) => {
      const minLength = 6;
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      const hasNumber = /\d/.test(password);
      return password.length >= minLength && hasSpecialChar && hasNumber;
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Add password change logic here
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Current Password</label>
          <input
            type="password"
            value={currentPass}
            onChange={(e) => setCurrentPass(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium mb-2">New Password</label>
          <input
            type="password"
            value={newPass}
            onChange={(e) => {
              setNewPass(e.target.value);
              setIsValid(validatePassword(e.target.value));
            }}
            className={`w-full p-2 border rounded-md focus:ring-2 ${
              isValid ? 'focus:ring-green-500' : 'focus:ring-red-500'
            }`}
            required
          />
          <p className="text-sm text-gray-500 mt-2">
            Must be at least 6 characters with numbers and special characters
          </p>
        </div>
  
        <div>
          <label className="block text-sm font-medium mb-2">Confirm New Password</label>
          <input
            type="password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            className={`w-full p-2 border rounded-md focus:ring-2 ${
              newPass === confirmPass ? 'focus:ring-green-500' : 'focus:ring-red-500'
            }`}
            required
          />
        </div>
  
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          disabled={!isValid || newPass !== confirmPass}
        >
          Change Password
        </button>
      </form>
    );
  }