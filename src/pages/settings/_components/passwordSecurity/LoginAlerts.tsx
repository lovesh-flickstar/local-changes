import { useState } from "react";

export const LoginAlerts = () => {
  const [inAppEnabled, setInAppEnabled] = useState(true);

  return (
    <div className="p-2 text-white fontPrimary">
    <h2 className="text-xl font-semibold">Security Checks</h2>
    <p className="text-sm text-gray-400">
      Ensure safety by running security checks across apps, devices, and sent emails
    </p>
  
    <div className="p-6 mt-5 space-y-6 bg-[#0D0D0D] border border-gray-700 rounded-2xl max-w-2xl mx-auto text-white">
        <div className="p-2 bg-blue-950/70 flex items-start w-fit rounded-full mb-4">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.64183 3.29492H2.2066C1.54297 3.29492 1 3.8386 1 4.50309V17.793C1 18.4575 1.54297 19.0012 2.2066 19.0012H15.4793C16.1429 19.0012 16.6859 18.4575 16.6859 17.793V11.7119" stroke="#007AFF" stroke-width="1.7" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.9183 9.1753C17.1729 9.1753 19.0006 7.3452 19.0006 5.08765C19.0006 2.8301 17.1729 1 14.9183 1C12.6637 1 10.8359 2.8301 10.8359 5.08765C10.8359 7.3452 12.6637 9.1753 14.9183 9.1753Z" stroke="#007AFF" stroke-width="1.7" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        </div>
      <div className="  flex gap-4">
        <div className="flex flex-col w-full">
          <h3 className="text-lg font-semibold">Login alerts</h3>
          <p className="text-sm text-gray-400 mt-1">
            This lets you manage login alerts, with in-app notifications as an option and email
            alerts always enabled for added security.
          </p>

          <div className="mt-6 space-y-4">
         
            <div className="flex items-center justify-between">
          <p className="text-sm font-medium">In-app Sounds</p>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={inAppEnabled}
              onChange={() => setInAppEnabled((prev) => !prev)}
            />
            <div className={`w-10 h-6 rounded-full transition-colors duration-300 ${inAppEnabled ? 'bg-blue-600' : 'bg-gray-600'}`}>
              <div
                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${inAppEnabled ? 'translate-x-5' : 'translate-x-1'}`}
              />
            </div>
          </label>
        </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-gray-400">Someone@cmail.com</p>
              </div>
              <p className="text-sm font-medium text-green-500">Always On</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
