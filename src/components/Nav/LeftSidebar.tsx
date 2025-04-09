import { NavLink } from "react-router-dom";
import FlickStarLogo from "../../assets/compressed/logo1.png";
import { navItems } from "../../constants/LeftSidebarConstant";


const LeftSidebar = () => (
    <>
    {/* Logo Section */}
    <div className="flex items-center mb-[30px] sm:mt-[30px]">
        <img 
            src={FlickStarLogo} 
            alt="FlickStar Logo" 
            className="w-12 h-12 mr-2 md:mr-0 lg:mr-2" 
        />
        <div className="text-2xl hidden lg:block 2xl:text-3xl   logo-font  home-content text-white">
            FlickStar
        </div>
    </div>

    {/* Navigation */}
    <nav className="hidden md:flex">
        <ul className="flex flex-col gap-4 xl:gap-5 2xl:gap-8 mt-5">
            {navItems.map((item) => (
                <li key={item.path}>
                    <NavLink 
                        to={item.path} 
                        className={({ isActive }) => 
                            `flex items-center gap-5 2xl:gap-7 pl-0 text-lg 2xl:text-2xl font-light font-primary text-white
                            ${isActive ? 'font-semibold' : ''}`
                        }
                    >
                        {item.icon}
                        <span className="hidden font-[--font-family-primary] tracking-wider lg:inline">{item.label}</span>
                    </NavLink>
                </li>
            ))}
        </ul>
    </nav>
</>

);

export default LeftSidebar;
