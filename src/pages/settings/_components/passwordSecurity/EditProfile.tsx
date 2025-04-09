type SecuritySection = 
| 'overview' 
| 'password' 
| 'twoFactor' 
| 'securityChecks'
| 'deviceActivity'
| 'loginAlerts';

export const SecurityOverview = ({ onNavigate }: { onNavigate: (section: SecuritySection) => void }) => (
  <div className="text-[var(--text-color)]">
    <h1 className="text-2xl font-semibold mb-4">Security and Recovery</h1>
    <p className="mb-8 text-gray-400">Manage your account security and authentication preferences</p>

    <div className="space-y-6">
      <div onClick={() => onNavigate('password')} className="security-card">
        <h2>Change Password</h2>
        <p>Your password must be at least 6 characters...</p>
      </div>

      <div onClick={() => onNavigate('twoFactor')} className="security-card">
        <h2>Two-Factor Authentication</h2>
        <p>Add an extra layer of security...</p>
      </div>

      <div onClick={() => onNavigate('securityChecks')} className="security-card">
        <h2>Security Checks</h2>
        <p>Ensure safety by running security checks...</p>
      </div>
    </div>
  </div>
);

// const ChangePassword = ({ onBack }: { onBack: () => void }) => (
//   <div className="text-[var(--text-color)]">
//     <BackButton onClick={onBack} />
//     <h1>Change Password</h1>
//     {/* Password form elements */}
//   </div>
// );

// const SecurityChecks = ({ onNavigate }: { onNavigate: (section: SecuritySection) => void }) => (
//   <div className="text-[var(--text-color)]">
//     <h1>Security Checks</h1>
//     <div onClick={() => onNavigate('deviceActivity')} className="security-card">
//       <h3>Device Recent Activity</h3>
//     </div>
//     <div onClick={() => onNavigate('loginAlerts')} className="security-card">
//       <h3>Login Alerts</h3>
//     </div>
//   </div>
// );

// Create similar components for TwoFactorAuth, DeviceActivity, LoginAlerts