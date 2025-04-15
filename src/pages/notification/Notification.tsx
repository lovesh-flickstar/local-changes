import { FollowRequests } from '../../components/NotificationItems/FollowRequest';
import { NotificationComponent } from '../../components/NotificationItems/NotificationItem';
import RightSidebar from "../../components/Sidebar/RightSidebar"
import { notifications } from "../../constants/Notification"
import { mockFollowRequests } from '../../constants/FollowRequestData';
export const NotificationPage = () => {
  return (
    <>
    <div className="flex flex-col gap-4 h-full w-full p-5">
        <p className="2xl:text-3xl fontPrimary text-xl text-white font-bold pt-5">Notifications</p>
        <hr className="border-t border-[#3A3A3C] mt-5"/>
        <div className="flex flex-col gap-4 mt-2 overflow-y-auto h-[calc(100vh-100px)] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <NotificationComponent notifications={notifications} />
        </div>
    </div>
        <RightSidebar>
            <FollowRequests requests={mockFollowRequests}/>
        </RightSidebar>
    </>
  )
}
