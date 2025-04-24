import { useState } from 'react';
import { CreateQuestForm } from './_components/create/CreateQuestForm';
import { QuestList } from './questTabs/AllQuests';
import { QuesSponsored } from './questTabs/Sponsored';
import { QuestProfile } from './questTabs/Profile';
const TabButton: React.FC<{
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }> = ({ active, onClick, children }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 cursor-pointer fontClass text-md ${
        active 
          ? 'text-white font-semibold border-b-2 border-b-white'
          : 'text-[#8E8E93] font-medium'
      }`}
    >
      {children}
    </button>
  );
export const QuestPage = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'sponsored' | 'profile'>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div className="flex flex-col w-full h-full py-10 md:py-6">
      {/* Conditional Tabs */}
      {!showCreateForm && (
        <div className="flex gap-4 border-b-1 border-b-[#8E8E93] w-full px-6">
          <TabButton
            active={activeTab === 'all'}
            onClick={() => setActiveTab('all')}
          >
            All Quests
          </TabButton>
          <TabButton
            active={activeTab === 'sponsored'}
            onClick={() => setActiveTab('sponsored')}
          >
            Sponsored
          </TabButton>
          <TabButton
            active={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </TabButton>
        </div>
      )}

      <div className="flex-1 p-6 overflow-y-auto h-full bg-black">
        {showCreateForm ? (
          <CreateQuestForm 
            onSuccess={() => setShowCreateForm(false)}
          />
        ) : (
          <>
            {activeTab === 'all' && (
              <QuestList onCreateQuest={() => setShowCreateForm(true)} />
            )}
            {activeTab === 'sponsored' && <QuesSponsored />}
            {activeTab === 'profile' && <QuestProfile/>} 
          </>
        )}
      </div>
    </div>
  );
};