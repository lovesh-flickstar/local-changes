import { useState } from "react";
import { ChangePasswordForm } from "./ChangePassword";
import { TwoFactorAuth } from "./TwoFactorAuth";
import { DeviceActivity } from "./DeviceActivity";
import { LoginAlerts } from "./LoginAlerts";
// import { DeviceActivity } from "./DeviceActivity";
// import { LoginAlerts } from "./LoginAlerts";

export default function SecurityAndRecovery() {
  const [section, setSection] = useState<null | string>(null);

  const renderSection = () => {
    switch (section) {
      case "changePassword":
        return <ChangePasswordForm />;
      case "twoFactor":
        return <TwoFactorAuth  />;
      case "deviceActivity":
        return <DeviceActivity />;
      case "loginAlerts":
        return <LoginAlerts />;
      default:
        return (
          <div className="p-6 space-y-2 text-white">
            <h2 className="text-2xl font-bold">Security and Recovery</h2>
            <p className="text-sm mb-5 text-gray-400">Manage your account security and authentication preferences</p>

            <div className="space-y-4 text-xl">
              <button onClick={() => setSection("changePassword")} className="w-full text-left text-xl py-2 px-4">Change Password</button>
              <div className="border-b-1 border-white/30"></div>
              <button onClick={() => setSection("twoFactor")} className="w-full text-left py-2 px-4">Two-Factor Authentication</button>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Security Checks</h3>
                <p className="text-sm text-gray-400 mb-2">Ensure safety by running security checks across apps, devices, and sent emails</p>
              </div>
              <button onClick={() => setSection("deviceActivity")} className="w-full text-left py-2 px-4 ">Device Recent Activity</button>
              <div className="border-b-1 border-white/30"></div>
              <button onClick={() => setSection("loginAlerts")} className="w-full text-left py-2 px-4 ">Login alerts</button>
            </div>
          </div>
        );
    }
  };

  return <div className="bg-black">{renderSection()}</div>;
}
