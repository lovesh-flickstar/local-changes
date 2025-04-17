import { Outlet } from 'react-router-dom';
import LeftSidebar from '../Nav/LeftSidebar';
import { MobileNav } from '../media/MobileNav';

const PersistentLayout = () => {
  return (
    <div className="h-screen  bg-black flex flex-col md:flex-row">
      {/* Persistent Left Sidebar */}
     
      <aside className="md:flex hidden flex-col p-3 sticky top-0 h-screen overflow-y-auto border-r border-white/10 [&::-webkit-scrollbar]:hidden lg:w-1/3 xl:w-1/4 2xl:w-1/5">
        <LeftSidebar />
      </aside>

      {/* Changing Content Area */}
      
        <Outlet /> 
    <MobileNav />
    </div>
  );
};

export default PersistentLayout;