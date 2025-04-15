const DeviceIcon = () =>(  <svg width="50" height="50" viewBox="0 0 73 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3586_24688)">
<path d="M45.6582 8.90319V17.1749H36.6954C32.6267 17.1749 29.7964 20.0917 29.7964 24.7718V30.3659H5.97408C5.38442 30.3659 5.12891 30.1265 5.12891 29.4299V8.90319C5.12891 7.92366 5.67926 7.33594 6.54408 7.33594H44.2431C45.1079 7.33594 45.6582 7.92366 45.6582 8.90319Z" fill="white" fill-opacity="0.2125"/>
<path d="M48.8232 8.83856V17.1756H45.6586V8.90387C45.6586 7.92434 45.1084 7.33662 44.2435 7.33662H6.54454C5.67972 7.33662 5.12936 7.92434 5.12936 8.90387V29.4306C5.12936 30.1272 5.38488 30.3666 5.97454 30.3666H29.7969V40.5322H29.4038C27.0648 40.5322 25.1385 42.6653 25.1385 45.2556C25.1385 46.1503 25.3609 46.9849 25.7501 47.6937H19.065C18.2002 47.6937 17.4926 46.91 17.4926 45.9306C17.4926 44.9509 18.2002 44.1674 19.065 44.1674H19.183V39.9662H6.50523C3.67486 39.9662 1.96484 38.0725 1.96484 34.9378V8.83856C1.96484 5.70403 3.67486 3.83203 6.50523 3.83203H44.3025C47.1132 3.83203 48.8232 5.70403 48.8232 8.83856Z" fill="#BBBBBE"/>
<path d="M35.6562 43.5142V25.7518C35.6562 24.3587 36.2852 23.6621 37.5629 23.6621H60.8349C62.0928 23.6621 62.7415 24.3587 62.7415 25.7518V43.4924L35.6562 43.5142Z" fill="white" fill-opacity="0.2125"/>
<path d="M27.832 45.2542C27.832 46.2557 28.5397 47.0392 29.4046 47.0392L68.7152 47.0175C69.5998 47.0175 70.3073 46.2338 70.3073 45.2325C70.3073 44.2747 69.5998 43.491 68.7152 43.491H65.9045V24.771C65.9045 21.7235 64.4304 20.1562 61.6983 20.1562H36.6966C34.1022 20.1562 32.4904 21.7235 32.4904 24.771V43.5129H29.4046C28.5397 43.5129 27.832 44.2964 27.832 45.2542ZM35.6548 43.5129V25.7504C35.6548 24.3573 36.2838 23.6607 37.5615 23.6607H60.8334C62.0914 23.6607 62.7401 24.3573 62.7401 25.7504V43.491L35.6548 43.5129Z" fill="#BBBBBE"/>
</g>
<defs>
<clipPath id="clip0_3586_24688">
<rect width="73" height="50" fill="white"/>
</clipPath>
</defs>
</svg>
)
const activities = [
  {
    message: 'Successful login from Chrome on Windows',
    ip: '192.168.1.1',
    location: 'New York, USA',
    time: '5 mins ago',
    icon:  <DeviceIcon/>,
  },
  {
    message: 'Successful login from Chrome on Windows',
    ip: '192.168.1.1',
    location: 'New York, USA',
    time: '2 weeks ago',
    icon: <DeviceIcon/>,
  },
  {
    message: 'Successful login from Chrome on Windows',
    ip: '192.168.1.1',
    location: 'New York, USA',
    time: '11 June 2024',
    icon: <DeviceIcon/>,
  },
  {
    message: 'Successful login from Chrome on Windows',
    ip: '192.168.1.1',
    location: 'New York, USA',
    time: '5 mins ago',
    icon: <DeviceIcon/>,
  },
];

export const DeviceActivity = () => {
  return (
    <div className="p-2 text-white fontPrimary">
    <div>
    <h2 className="text-xl font-semibold">Security Checks</h2>
    <p className="text-sm text-gray-400">
      Ensure safety by running security checks across apps, devices, and sent emails
    </p>
  </div>
    <div className="p-6 space-y-6 max-w-3xl mx-auto text-white">
      <div className="bg-[#0D0D0D] border border-gray-700 rounded-2xl p-6">
      <div className="bg-blue-950/60 p-2 rounded-full w-fit mb-3">
          <svg width="30" height="30" viewBox="0 0 77 46" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M59.6708 8.24166H54.5933C49.9447 8.24166 46.9409 11.0979 46.9409 15.4745V36.505H15.4258V10.1996C15.4258 8.72539 16.1886 7.98828 17.7382 7.98828H58.3836C58.8979 7.98828 59.3283 8.07206 59.6708 8.24166Z" fill="white" fill-opacity="0.2125"/>
    <path d="M64.4738 8.24707H59.6695C59.327 8.07748 58.8966 7.9937 58.3823 7.9937H17.7369C16.1873 7.9937 15.4245 8.7308 15.4245 10.205V36.5104H46.9396V38.7908C46.9396 39.8843 47.1271 40.8816 47.481 41.7623H6.36567C4.88765 41.7623 3.67188 40.5874 3.67188 39.1363C3.67188 37.6853 4.88765 36.5104 6.36567 36.5104H11.5864V9.16846C11.5864 5.94363 13.5412 4.28516 16.688 4.28516H59.4312C62.4114 4.28516 64.1575 5.62666 64.4738 8.24707Z" fill="#1B7CFB"/>
    <path d="M54.6636 40.0863C53.6147 40.0863 53.0664 39.5334 53.0664 38.497V16.1534C53.0664 15.0938 53.6147 14.541 54.6636 14.541H65.415C66.464 14.541 66.9883 15.0938 66.9883 16.1534V38.497C66.9883 39.5334 66.464 40.0863 65.415 40.0863H54.6636Z" fill="white" fill-opacity="0.2125"/>
    <path d="M54.59 43.0979H65.4605C68.4165 43.0979 70.1091 41.5315 70.1091 38.7904V15.8481C70.1091 13.107 68.4165 11.5176 65.4605 11.5176H54.59C51.6578 11.5176 49.9414 13.107 49.9414 15.8481V38.7904C49.9414 41.5315 51.6338 43.0979 54.59 43.0979ZM54.6615 40.0804C53.6126 40.0804 53.0643 39.5275 53.0643 38.4911V16.1475C53.0643 15.0879 53.6126 14.5351 54.6615 14.5351H65.4129C66.4619 14.5351 66.9862 15.0879 66.9862 16.1475V38.4911C66.9862 39.5275 66.4619 40.0804 65.4129 40.0804H54.6615ZM56.7831 38.9055H63.2435C63.7203 38.9055 64.1018 38.5831 64.1018 38.0993C64.1018 37.6617 63.7203 37.3162 63.2435 37.3162H56.7831C56.2824 37.3162 55.9727 37.6617 55.9727 38.0993C55.9727 38.6062 56.2588 38.9055 56.7831 38.9055ZM58.1182 17.829H61.8609C62.4807 17.829 62.9813 17.3453 62.9813 16.7464C62.9813 16.1706 62.4807 15.7099 61.8609 15.7099H58.1182C57.4984 15.7099 57.0216 16.1706 57.0216 16.7464C57.0216 17.3453 57.4984 17.829 58.1182 17.829Z" fill="#1B7CFB"/>
    </svg>
          </div>
        <div className="flex items-center gap-3 mb-4">
         
          <div>
            <h3 className="text-lg font-semibold">Devices Recent Activity</h3>
            <p className="text-sm text-gray-400">
              “Devices Recent Activity” displays a list of devices that have accessed your account,
              showing details like device type, location, and login time. This helps monitor
              unauthorized access and enhance security.
            </p>
          </div>
        </div>

        <div className="space-y-5 mt-6">
          {activities.map((activity, idx) => (
            <div key={idx} className="flex items-start justify-between">
              <div className="flex gap-4">
                <div>{activity.icon}</div>
                <div>
                  <p className="text-sm font-semibold">{activity.message}</p>
                  <p className="text-sm text-gray-400">
                    IP: {activity.ip} • {activity.location}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-400 whitespace-nowrap">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};
