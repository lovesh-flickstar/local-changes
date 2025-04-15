import { ProfilePerson } from "../../components/profile/ProfilePerson"
import avatar from "../../assets/compressed/avatar1_compressed_compressed_compressed_compressed_compressed-transformed-transformed.webp"
import { QuestIcon } from "../../components/icons/QuestIcon"
import { TaggedIcon } from "../../components/icons/TaggedIcon"
import { FlickIcon } from "../../components/icons/FlickIcon"
import { ProfileFlick } from "../../components/profile/ProfileFlick"
import RightSidebar from "../../components/Sidebar/RightSidebar"
import { useState } from "react"
import { QuestCard } from '../../components/profile/QuestCard';
import { TaggedFlick } from "../../components/profile/TaggedFlick"
import { TaggedQuest } from "../../components/profile/TaggedQuest"
import { FriendSuggestions } from "../../components/Section/FriendSuggestionSection"

export const Profile = () => {
  const [activeTab, setActiveTab] = useState("flick");
  return (
<div className="flex w-full justify-between h-full overflow-y-auto ">
    <div className="flex flex-col gap-7 h-full w-full px-8">
      <ProfilePerson/>
     <div className="lg:px-30  p-2 flex justify-between w-full fontPrimary">
        <div onClick={() => setActiveTab('flick')} className={`flex cursor-pointer gap-2 border-b-2 ${activeTab == 'flick' ? 'border-b-white': 'border-b-transparent'} px-2 pb-1`}>
            <FlickIcon className="text-white" width={20} height={20}/>
            <p className="font-bold text-white">Flick</p>
        </div>
        <div onClick={() => setActiveTab('quest')} className={`flex cursor-pointer gap-2 border-b-2 ${activeTab == 'quest' ? 'border-b-white': 'border-b-transparent'} px-2 pb-1`}>
            <QuestIcon className="text-white" width={20} height={20}/>
            <p className="font-bold text-white">Quest</p>
        </div>
        <div onClick={() => setActiveTab('tagged')} className={`flex cursor-pointer gap-2 border-b-2 ${activeTab == 'tagged' ? 'border-b-white': 'border-b-transparent'} px-2 pb-1`}>
            <TaggedIcon className="text-white" width={20} height={20}/>
            <p className="font-bold text-white">Tagged</p>
        </div>
     </div>
     {/* <ProfileFlick/> */}
     {activeTab == 'flick' && <ProfileFlick/>}
     {activeTab == 'quest' && <QuestCard/>}
     {activeTab == 'tagged' && 
      <div className="flex flex-col gap-4 h-full">
        <TaggedFlick/>
        <TaggedQuest/>
      </div>
      }
     

    </div>
   <RightSidebar image={avatar}>
    <FriendSuggestions/>
   </RightSidebar>
</div>
  )
}
