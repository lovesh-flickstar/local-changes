export const SecurityOverview = ()=> {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Security Checks</h2>
          <p className="text-gray-600">
            Ensure safety by running security checks across apps, devices, and sent emails
          </p>
        </div>
  
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Device Recent Activity</h3>
            <p className="text-sm text-gray-500">No recent suspicious activity found</p>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Login Alerts</h3>
            <p className="text-sm text-gray-500">All logins appear secure</p>
          </div>
        </div>
      </div>
    );
  }