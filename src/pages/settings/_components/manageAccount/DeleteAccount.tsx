import { useEffect, useRef, useState } from 'react';

interface DeactivateAccountProps {
  onBack: () => void;
}
const reasons = [
  'Created a second account.',
  'Privacy issues.',
  'Trouble getting started.',
  'Too many ads',
  'Content removal',
  'Security risk',
  "I don't like the app experience.",
  'Too many notifications.',
  "Content isn't relevant.",
  "Other."
];

export const DeleteAccount: React.FC<DeactivateAccountProps> = ({ onBack }) => {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelect = (reason: string) => {
    setSelectedReasons([reason]);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = () => {
    // Handle deactivation logic here
    onBack(); // Go back to the previous screen
    console.log({ selectedReasons, password });
  };

  return (
    <div>
      <div className='flex flex-col gap-3'>
      <h1 className='text-2xl'>Delete my Account</h1>
      <h2 className='text-sm text-white/70 font-text'>Deleting your account is a permanent action that will remove your profile, posts, comments, and all associated data from our platform. Once deleted, your account cannot be recovered, and any messages you’ve sent may still be visible to others. If you’re unsure, you may consider deactivating your account instead. Before proceeding, make sure to back up any important data. If you’re ready to delete your account permanently, tap “Delete” below.</h2>
      </div>
      <div className="flex flex-col justify-center items-center p-4 max-w-md mx-auto">
      <div className='flex flex-col gap-1 w-full' ref={dropdownRef}>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Reason
        </label>
        <input
          ref={inputRef}
          type="text"
          placeholder="Select the Reason"
          value={selectedReasons[0] || ''}
          readOnly
          className="w-full p-2 border rounded-md outline-none border-gray-300 text-sm cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />

        {isOpen && (
          <div className="absolute top-30 left-[40%] bg-white/10 right-0 z-50 mt-1 max-w-xl border rounded-lg  shadow-lg">
            {reasons.map((reason, index) => (
              <div 
                key={reason}
                className={`flex items-center justify-between gap-2 bg-gray-800 p-4 ${
                  index !== reasons.length - 1 ? '' : ''
                } hover:bg-gray-500 cursor-pointer`}
                onClick={() => handleSelect(reason)}
              >
                <span className="text-white">{reason}</span>
                <input
                  type="radio"
                  checked={selectedReasons.includes(reason)}
                  onChange={() => {}}
                  className="w-5 h-5 text-white bg-slate-500 rounded-full focus:ring-blue-500 cursor-pointer"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    

      {selectedReasons.length > 0 && (
        <div className="w-full mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter your Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your password"
          />
        </div>
      )}

      <button 
        onClick={handleSubmit}
        className={`mt-6 cursor-pointer px-6 py-2 rounded-md ${
          selectedReasons.length > 0 && password.length > 0
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-gray-300 cursor-not-allowed text-gray-500'
        } transition-colors`}
        disabled={selectedReasons.length === 0 || password.length === 0}
      >
        Deactivate my Account
      </button>
      </div>
    </div>
  );
};