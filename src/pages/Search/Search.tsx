import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
// import {RecentSearches} from "../../components/Card/RecentSearchCard";
import {Suggestions} from "../../components/Card/SuggestionCard";
import {Flicks} from "../../components/Flicks/Flicks";
import {SearchQuest} from "../../components/Quest/SearchQuest";
import Music from "../../components/media/Music";
import {People} from "../../components/Card/PeopleCard";
import {Tags} from "../../components/Modal/Tag";
import RightSidebar from "../../components/Sidebar/RightSidebar";
import { FriendSuggestions } from "../../components/Section/FriendSuggestionSection";


type TabName = "flicks" | "quest" | "music" | "people" | "tags";

const Search: React.FC = () => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const searchRef = useRef<HTMLDivElement>(null);

    // Memoized static data
    // const recentSearches = useMemo(() => [
    //     "FlickStar", "Quest", "JavaScript", "Frontend Development",
    //     "Web Performance", "Albert Jones", "Lorem Ipsum", "Jessica",
    //     "John Smith", "Dil Tu Jaan Tu", "Movies", "#recentsearches",
    //     "event planning", "Social Media", "Best Quest",
    // ], []);

    const tabNames = useMemo(() => ["Flicks", "Quest", "Music", "People", "Tags"], []);

    // Event handlers
    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        setShowSuggestions(value.length > 0);
    }, []);

    const navigateToTab = useCallback((tabName: TabName) => {
        const tabIndex = tabNames.indexOf(tabName);
        if (tabIndex !== -1) {
            setActiveIndex(tabIndex);
            // setSearchActive(false);
            setShowSuggestions(false);
        }
    }, [tabNames]);

    const closeSuggestions = useCallback(() => {
        setShowSuggestions(false);
        // setSearchActive(false);
    }, []);

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                closeSuggestions();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [closeSuggestions]);

    // Tab content with lazy loading
    const tabContent = useMemo(() => [
        <Flicks key="flicks" />,
        <SearchQuest key="quest" />,
        <Music key="music" />,
        <People key="people" />,
        <Tags key="tags" />
    ], []);

    return (
        <div className="flex w-full justify-between h-full overflow-y-auto py-10 md:py-0">
        <main className=" w-full border-r px-4 border-white/10 h-full overflow-hidden md:mt-0 flex flex-col">
    <div className=" lg:px-16 flex items-center" ref={searchRef}>
        <div className="relative w-full">
        <input
            type="text"
            className="w-full relative bg-transparent border py-2 px-4 border-[#BBBBBE] text-white rounded-full placeholder:text-[#BBBBBE] outline-none mt-5 mb-0 focus:ring-0"
            placeholder="Search..."
            value={searchQuery}
            // onFocus={() => setSearchActive(true)}
            onChange={handleSearchChange}
            aria-label="Search content"
        />
        <i className="bi bi-search absolute right-5 top-10 -translate-y-1/2 text-[#BBBBBE] text-xl" aria-hidden="true" />
        </div>
        

        {showSuggestions && <Suggestions onNavigate={(tab) => navigateToTab(tab as TabName)} onClose={closeSuggestions} />}
    </div>

    <hr aria-hidden="true" className="my-4 text-[#212020] mx-3" />

    <div className="md:px-[8%] relative ">
        <div className="flex justify-around relative bg-[#323234] rounded-full p-2 overflow-hidden" role="tablist">
            <div 
                className="absolute top-0 h-full bg-gray-500 rounded-full transition-all duration-300"
                style={{
                    width: `${100 / tabNames.length}%`,
                    left: `${(activeIndex / tabNames.length) * 100}%`,
                }}
                aria-hidden="true"
            />

            {tabNames.map((tab, index) => (
                <button
                    key={tab}
                    role="tab"
                    aria-selected={activeIndex === index}
                    className={`flex-1 cursor-pointer text-center z-10 text-[#BBBBBE] text-base font-primary ${activeIndex === index ? "text-white" : ""}`}
                    onClick={() => setActiveIndex(index)}
                >
                    {tab}
                </button>
            ))}
        </div>

        <div className="mt-2 overflow-y-auto snap-y snap-mandatory scroll-smooth
        [scrollbar-width:none] [-ms-overflow-style:none] 
        [-webkit-overflow-scrolling:touch]">
            {tabContent[activeIndex]}
        </div>
    </div>
    
</main>



<RightSidebar>
    <FriendSuggestions/>
</RightSidebar>

        </div>
    );
};

export default React.memo(Search);