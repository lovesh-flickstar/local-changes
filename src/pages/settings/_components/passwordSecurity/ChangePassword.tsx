import { useState } from "react";

export const ChangePasswordForm = () => {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validatePassword = (password: string) => {
    const minLength = 6;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /\d/.test(password);
    return password.length >= minLength && hasSpecialChar && hasNumber;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Password change logic
  };

  return (
    <div className="p-2 text-white fontPrimary">
      <p className="text-xl">Security and Recovery</p>
      <p className="text-sm text-white/70">Manage your account security and authentication preferences</p>
    <div className="max-w-xl mx-auto mt-12 p-8 rounded-xl bg-black shadow-lg border border-zinc-700 text-white">
      <div className="flex flex-col items-start gap-5 mb-6">
        <div className="bg-blue-950/60 p-4 rounded-full">
          <svg
            width="19"
            height="26"
            viewBox="0 0 19 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_3776_42398)">
              <path
                d="M3.04922 25.3284H15.4493C17.4416 25.3284 18.4986 24.295 18.4986 22.2544V13.3553C18.4986 11.3274 17.4416 10.2941 15.4493 10.2941H3.04922C1.05706 10.2941 0 11.3274 0 13.3553V22.2544C0 24.295 1.05706 25.3284 3.04922 25.3284ZM3.11697 23.3781C2.53424 23.3781 2.19543 23.0293 2.19543 22.3964V13.2131C2.19543 12.5802 2.53424 12.2444 3.11697 12.2444H15.3816C15.9779 12.2444 16.3031 12.5802 16.3031 13.2131V22.3964C16.3031 23.0293 15.9779 23.3781 15.3816 23.3781H3.11697ZM2.37161 11.2886H4.52639V6.93592C4.52639 3.66816 6.70827 1.95032 9.24252 1.95032C11.7768 1.95032 13.9857 3.66816 13.9857 6.93592V11.2886H16.127V7.20716C16.127 2.35072 12.7932 0 9.24252 0C5.70543 0 2.37161 2.35072 2.37161 7.20716V11.2886Z"
                fill="#007AFF"
              />
            </g>
            <defs>
              <clipPath id="clip0_3776_42398">
                <rect width="19" height="26" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Change Password</h2>
          <p className="text-sm text-gray-400">
            Your password must be at least 6 characters and should include a
            combination of numbers, letters and special characters (!@$%).
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Current Password */}
        <div className="relative">
          <input
            type={showCurrent ? "text" : "password"}
            value={currentPass}
            onChange={(e) => setCurrentPass(e.target.value)}
            className="w-full bg-zinc-800 text-white p-3 pr-10 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Current Password"
            required
          />
          <div
            className="absolute top-3.5 right-3 cursor-pointer text-gray-400"
            onClick={() => setShowCurrent(!showCurrent)}
          ></div>
        </div>

        {/* New Password */}
        <div className="relative">
          <input
            type={showNew ? "text" : "password"}
            value={newPass}
            onChange={(e) => {
              setNewPass(e.target.value);
              setIsValid(validatePassword(e.target.value));
            }}
            className={`w-full bg-zinc-800 text-white p-3 pr-10 border rounded-md focus:outline-none ${
              isValid
                ? "border-green-500 focus:ring-2 focus:ring-green-500"
                : "border-red-500 focus:ring-2 focus:ring-red-500"
            }`}
            placeholder="New Password"
            required
          />
          <div
            className="absolute top-3.5 right-3 cursor-pointer text-gray-400"
            onClick={() => setShowNew(!showNew)}
          ></div>
        </div>

        {/* Confirm New Password */}
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            className={`w-full bg-zinc-800 text-white p-3 pr-10 border rounded-md focus:outline-none ${
              confirmPass === newPass && isValid
                ? "border-green-500 focus:ring-2 focus:ring-green-500"
                : "border-red-500 focus:ring-2 focus:ring-red-500"
            }`}
            placeholder="Confirm New Password"
            required
          />
          <div
            className="absolute top-3.5 right-3 cursor-pointer text-gray-400"
            onClick={() => setShowConfirm(!showConfirm)}
          ></div>
        </div>

        <button
          type="submit"
          disabled={!isValid || confirmPass !== newPass}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-600 text-white font-semibold py-3 rounded-md transition duration-200"
        >
          Change Password
        </button>
      </form>
    </div>
    </div>
  );
};
