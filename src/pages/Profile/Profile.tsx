import { ProfilePerson } from "../../components/profile/ProfilePerson"
import avatar from "../../assets/compressed/avatar1_compressed_compressed_compressed_compressed_compressed-transformed-transformed.webp"
import { QuestIcon } from "../../components/icons/QuestIcon"
import { TaggedIcon } from "../../components/icons/TaggedIcon"
import { FlickIcon } from "../../components/icons/FlickIcon"
// import { ProfileFlick } from "../../components/profile/ProfileFlick"
import { ProfileQuest } from "../../components/profile/ProfileQuest"
import RightSidebar from "../../components/Sidebar/RightSidebar"

export const Profile = () => {
  return (
<div className="flex w-full justify-between h-full overflow-y-auto ">
    <div className="flex flex-col gap-7 h-full w-full px-8">
      <ProfilePerson/>
     <div className="lg:px-30 p-2 flex justify-between w-full">
        <div className="flex gap-2 border-b-2 border-b-white px-2 pb-1 peer">
            <FlickIcon className="text-white" width={20} height={20}/>
            <p className="font-bold text-white">Flick</p>
        </div>
        <div className="flex gap-2 border-b-2 border-b-white px-2 pb-1">
            <QuestIcon className="text-white" width={20} height={20}/>
            <p className="font-bold text-white">Quest</p>
        </div>
        <div className="flex gap-2 border-b-2 border-b-white px-2 pb-1">
            <TaggedIcon className="text-white" width={20} height={20}/>
            <p className="font-bold text-white">Tagged</p>
        </div>
     </div>
     {/* <ProfileFlick/> */}
     <ProfileQuest/>

    </div>
   <RightSidebar image={avatar}/>
</div>
  )
}
