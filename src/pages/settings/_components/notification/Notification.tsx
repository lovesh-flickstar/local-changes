import { useState } from "react";

export const NotificationSettings = () => {
  const [pauseAll, setPauseAll] = useState(false);
  const [inAppSounds, setInAppSounds] = useState(true);
  const [inAppVibrate, setInAppVibrate] = useState(false);
  const [inAppPreview, setInAppPreview] = useState(true);

  return (
    <div className="w-full  p-6 text-white space-y-10">
      {/* All Notifications */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase text-white">All Notification</h2>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Pause all</p>
            <p className="text-xs text-white/60">Pause all the notifications</p>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={pauseAll}
              onChange={() => setPauseAll(!pauseAll)}
            />
            <div className={`w-10 h-6 rounded-full transition-colors duration-300 ${pauseAll ? 'bg-blue-600' : 'bg-gray-600'}`}>
              <div
                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${pauseAll ? 'translate-x-5' : 'translate-x-1'}`}
              />
            </div>
          </label>
        </div>
      </div>

      {/* In-app Notifications */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase text-white">In app Notifications</h2>

        {/* In-app Sounds */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">In-app Sounds</p>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={inAppSounds}
              onChange={() => setInAppSounds(!inAppSounds)}
            />
            <div className={`w-10 h-6 rounded-full transition-colors duration-300 ${inAppSounds ? 'bg-blue-600' : 'bg-gray-600'}`}>
              <div
                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${inAppSounds ? 'translate-x-5' : 'translate-x-1'}`}
              />
            </div>
          </label>
        </div>

        {/* In-app Vibrate */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">In-app Vibrate</p>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={inAppVibrate}
              onChange={() => setInAppVibrate(!inAppVibrate)}
            />
            <div className={`w-10 h-6 rounded-full transition-colors duration-300 ${inAppVibrate ? 'bg-blue-600' : 'bg-gray-600'}`}>
              <div
                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${inAppVibrate ? 'translate-x-5' : 'translate-x-1'}`}
              />
            </div>
          </label>
        </div>

        {/* In-app Preview */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">In-app Preview</p>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={inAppPreview}
              onChange={() => setInAppPreview(!inAppPreview)}
            />
            <div className={`w-10 h-6 rounded-full transition-colors duration-300 ${inAppPreview ? 'bg-blue-600' : 'bg-gray-600'}`}>
              <div
                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${inAppPreview ? 'translate-x-5' : 'translate-x-1'}`}
              />
            </div>
          </label>
        </div>
      </div>

      {/* Reset Link */}
      <div>
        <button className="text-sm text-red-500 hover:underline">
          Reset All Notifications
        </button>
      </div>
    </div>
  );
};
