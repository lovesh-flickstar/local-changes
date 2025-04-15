import { useState } from "react";
import PersonalDetails from "../../components/Card/PersonalDetails";
import { EditProfile } from "./_components/editProfile/EditProfile";
import { ManageAccount } from "./_components/manageAccount/ManageAccount";
import { DeactivateAccount } from "./_components/manageAccount/Deactivate";
import { DeleteAccount } from "./_components/manageAccount/DeleteAccount";
import {DevicesActivity} from "./_components/device/Device";
import { NotificationSettings } from "./_components/notification/Notification";
import SecurityAndRecovery from "./_components/passwordSecurity/ChangePasswordComponent ";

type TabType = 
  | "Personal Details"
  | "Edit Profile"
  | "Password & Security"
  | "Manage account"
  | "Notifications"
  | "Device"
  | "Appearance"
  | "Support"
  | "Legal";


  type DeleteSection = 
  | 'overview'
  | 'deleteAccount'
  | 'deactivateAccount'

const tabs: TabType[] = [
  "Personal Details",
  "Edit Profile",
  "Password & Security",
  "Manage account",
  "Notifications",
  "Device",
  "Appearance",
  "Support",
  "Legal",
];

export const Setting = () => {
  const [deleteSection, setdeleteSection] = useState<DeleteSection>('overview');
  const [activeTab, setActiveTab] = useState<TabType>("Personal Details");
  

  const renderDeleteAccount = () => {
    switch (deleteSection) {
      case 'overview':
        return <ManageAccount onNavigate={setdeleteSection} />;
      case 'deleteAccount':
        return <DeleteAccount onBack={() => setdeleteSection('overview')} />;
      case 'deactivateAccount':
        return <DeactivateAccount onBack={() => setdeleteSection('overview')} />;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Personal Details":
        return <PersonalDetails />;
        case "Password & Security":
          return <SecurityAndRecovery/>;
      case "Edit Profile":
        return <EditProfile />;
      case "Manage account":
        return renderDeleteAccount();
      case "Device":
        return <DevicesActivity/>
      case "Notifications":
        return <NotificationSettings/>

          
      default:
        return <div/>;
    }
  };

  return (
        <main className="flex-grow md:w-5/6 setting-main-content border-r border-[var(--border-color)] h-[calc(var(--vh,1vh)*100)] overflow-y-auto z-10">
          <div className="p-8 bg-transparent text-white">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-[var(--text-color)] font-primary">
                Settings
              </h1>
            </div>

            <div className="flex gap-6 border-b border-[var(--border-color)] mb-6 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {setActiveTab(tab)
                  }}
                  
                  className={`pb-2.5 text-sm font-semibold whitespace-nowrap transition-colors ${
                    activeTab === tab 
                      ? "text-white border-b-2 border-[var(--primary-color)]" 
                      : "text-[var(--gray-dark)] hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="pt-2.5">
              {renderTabContent()}
            </div>
          </div>
          
        </main>

      
  );
};