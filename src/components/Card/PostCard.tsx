import { memo, useState } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { AiOutlineExclamationCircle, AiOutlineLink, AiOutlineInfoCircle } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { GoBookmark } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import {CommentSection} from "../Section/CommentSection";
import {ShareOptions} from "../Section/ShareSection";
import {RepostFlick} from "../Flicks/RepostFlick";             
import song from "../../assets/compressed/song.png"
import avatar from "../../assets/compressed/user.svg";
import { Story, StoryCard } from './StoryCard';
import {StoryView}  from '../Section/StorySection'
import { yourStory } from '../../constants/StoryData/StoryData';


interface Post {
    id: number;
    img: string;
    caption: string;
    username: string;
    avatar: string;
    song: string;
    comments?: Comment[];
}

export interface Icon {
    id: number;
    class: string;
    count?: number | string;
    isActive?: boolean;
    action: string;
}
interface PostCardProps {
    stories: Story[];
    post: Post;
    toggleHeart: () => void;
    toggleMute: (e: React.MouseEvent) => void;
    isMuted: boolean;
    toggleSidebar: (type: string, comments?: string[]) => void;
    isLiked: boolean; // Add isLiked to props
  }

export interface Comment {
  avatar: string;
  username: string;
  time: string;
  text: string;
  liked: boolean;
  likes: number;
  replies: {
    avatar: string;
    username: string;
    time: string;
    text: string;
    liked: boolean;
    likes: number;
  }[];
}


export const PostCard = memo(({ 
    post, 
    toggleHeart, 
    isLiked,  // Add missing prop
    toggleMute, 
    isMuted, 
    toggleSidebar, 
    stories 
}: PostCardProps) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [activeOverlay, setActiveOverlay] = useState<null | 'comment' | 'repost' | 'share'>(null);
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [showAboutProfile, setShowAboutProfile] = useState(false);
    const [showReportBox, setShowReportBox] = useState(false);
    const [isStoryContainerVisible, setIsStoryContainerVisible] = useState(false);

    const closeStoryContainer = () => {
        setIsStoryContainerVisible(false);
    };
    
    const icons: Icon[] = [
        {
            id: 1,
            class: 'bi bi-heart-fill',
            count: 1500000, // or get from post.likes
            action: 'like',
            isActive: isLiked
        },
        {
            id: 2,
            class: 'bi bi-chat',
            count: 2000000,
            action: 'comment'
        },
        {
            id: 3,
            class: 'bi bi-reply transform -scale-x-100',
            count: 1200,
            action: 'share'
        },
        {
            id: 4,
            class: 'bi bi-repeat',
            count: 2000000,
            action: 'repost'
        },
        {
            id: 5,
            class: 'bi bi-three-dots',
            action: 'options'
        }
    ];

    const handleIconClick = (action: string) => {
        switch(action) {
            case 'like':
                toggleHeart();
                break;
            case 'comment':
                handleOverlayClick("comment");
                break;
            case 'share':
                handleOverlayClick("share");
                break;
            case 'repost':
                handleOverlayClick("repost");
                break;
            case 'options':
                toggleMoreOptions();
                break;
            default:
                break;
        }
    };

    const formatCount = (num: number) => {
        if (num >= 1000000) {
            return `${(num / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
        }
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}K`;
        }
        return num.toString();
    };

    const handleOverlayClick = (type: 'comment' | 'repost' |  'share') => {
        if (window.innerWidth > 1024) {
            toggleSidebar(type, post.comments?.map((comment) => comment.text));
        } else {
            setActiveOverlay(type);
        }
    };

    const toggleMoreOptions = () => {
        setShowMoreOptions((prev) => !prev);
        setShowAboutProfile(false);
    };
    const openAboutProfile = () => {
        setShowMoreOptions(false);
        setShowAboutProfile(true);
    };
    const openReportBox = () => {
        setShowMoreOptions(false);
        setShowReportBox(true);
    };


    const closeAllOverlays = () => {
        setActiveOverlay(null);
        setShowMoreOptions(false);
        setShowAboutProfile(false);
        setShowReportBox(false);
    };

    const [isStoryViewOpen, setIsStoryViewOpen] = useState(false);
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const openStoryView = (index:  number) => {
        if (index === 0) {
            setCurrentStoryIndex(index);
            setIsStoryViewOpen(true);
        } else {
            setCurrentStoryIndex(index);
            setIsStoryViewOpen(true);
        }
    };
    const closeStoryView = () => {
        setIsStoryViewOpen(false);
    };


    return (
        <div className="relative  w-full h-full mx-auto shrink-0 rounded-xl sm:rounded-none ">
    {/* Top Avatar */}
    {post.id === 1 && (
        <div className="top-12 absolute left-0 sm:hidden z-1 w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-b from-[#5006B5] via-[#D255FD] to-[#4D3AC9]"
        onClick={() => setIsStoryContainerVisible(!isStoryContainerVisible)}>
            <img 
                src={avatar} 
                alt="User Avatar" 
                loading="lazy"
                width={40}
                height={40}
                className="w-14 h-14 rounded-full object-cover border-3 border-transparent" 
            />
        </div>
    )}
   {/* Story Overlay */}
{isStoryContainerVisible && (
    <div className="fixed top-12 left-0 right-0 h-24 bg-gradient-to-b from-gray-700/10 to-gray-500/08 backdrop-blur-xl z-50 sm:hidden">
        <div className="flex overflow-x-auto gap-3 p-2 w-full max-w-screen-xl mx-auto">
            {stories.map((story, index) => (
                <div key={story.id} onClick={() => openStoryView(index)}>
                    <StoryCard story={story} isYourStory={story.id === 1} />
                </div>
            ))}
        </div>
    </div>
)}
    {isStoryViewOpen && (
                <StoryView
                    stories={currentStoryIndex === 0 ? [yourStory] : stories}
                    currentStoryIndex={currentStoryIndex}
                    onClose={closeStoryView}
                />
            )}

    {/* Post Content */}
    <div className="flex w-full py-8 xl:py-5 md:px-40 xl:px-42 2xl:px-60 overflow-hidden relative h-full  mx-auto snap-start " onClick={closeStoryContainer}>
    <img 
        src={post.img.replace(/\.(png|jpg)/, ".webp")} 
        alt={post.caption} 
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) calc(100vw - 40px), calc(100vw - 80px)"
        loading={post.id === 1 ? "eager" : "lazy"}
        className="w-full bg-amber-400 h-full object-fit  rounded-2xl"
    />
    
    {/* Action Icons - Right Side */}
    <div className="absolute bottom-8 right-4 md:right-32 xl:bottom-12 xl:right-34 2xl:right-50 flex flex-col gap-4 sm:gap-3 2xl:gap-5 text-white z-10">
    {icons.map((icon: Icon) => (
            <div 
                key={icon.id}
                className="flex flex-col  cursor-pointer"
                onClick={() => handleIconClick(icon.action)}
            >
                <i className={`${icon.class} text-2xl  2xl:text-3xl ${
                    icon.isActive ? 'text-red-500' : 'text-white'
                }`}></i>
                {icon.count !== undefined && (
                    <span className="text-xs 2xl:text-sm xs:text-sm">
                        {typeof icon.count === 'string' ? icon.count : formatCount(icon.count)}
                    </span>
                )}
            </div>
        ))}
        
        {/* Mute Button */}
        <button className="text-white cursor-pointer hidden md:block bg-[#d9d9d9]/10 rounded-full p-2 md:p-2.5 absolute bottom-2  right-14" onClick={toggleMute}>
            {isMuted ? <FaVolumeMute className="w-4 h-4 md:w-5 md:h-5" /> : <FaVolumeUp className="w-4 h-4 md:w-5 md:h-5" />}
        </button>

    {/* More Options Card */}
    {showMoreOptions && (
        <div className="absolute bottom-8 2xl:bottom-16 right-1 bg-[#323234] p-3 rounded-lg shadow-lg w-56 z-100">
            <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded cursor-pointer text-red-500" onClick={openReportBox}>
                    <AiOutlineExclamationCircle className="w-5 h-5" />
                    <span>Report</span>
                </div>
                <div className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded cursor-pointer">
                    <AiOutlineLink className="w-5 h-5" />
                    <span>Copy Link</span>
                </div>
                <div className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded cursor-pointer">
                    <GoBookmark className="w-5 h-5" />
                    <span>Save</span>
                </div>
                <div className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded cursor-pointer" onClick={openAboutProfile}>
                    <AiOutlineInfoCircle className="w-5 h-5" />
                    <span>About Account</span>
                </div>
                <div className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded cursor-pointer" onClick={closeAllOverlays}>
                    <MdOutlineCancel className="w-5 h-5" />
                    <span>Cancel</span>
                </div>
            </div>
        </div>
    )}

    {/* About Profile Card */}
    {showAboutProfile && (
        <div className="absolute -top-40 sm:-top-20 -right-64 sm:-right-4 bg-[var(--gray-background)] p-4 rounded-lg w-72 z-30">
            <div className="relative">
                <RxCross2 className="absolute -top-3 -right-3 cursor-pointer" onClick={closeAllOverlays} />
                <div className="flex justify-center">
                    <img src={post.avatar} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
                </div>
                <div className="mt-4 text-center">
                    <p className="text-lg font-semibold mb-4">{post.username}</p>
                    <div className="space-y-2">
                        <p className="text-sm">Date Joined</p>
                        <p className="text-sm">16 January 2021</p>
                        <hr className="my-2 border-gray-600" />
                        <p className="text-sm">Location</p>
                        <p className="text-sm">South Africa</p>
                    </div>
                </div>
            </div>
        </div>
    )}

    {/* Report Box */}
    {showReportBox && (
        <div className="absolute -top-40 sm:-top-20 -right-64 sm:-right-4 bg-[var(--gray-background)] p-4 rounded-lg w-72 z-40">
            <div className="relative">
                <RxCross2 className="absolute -top-3 -right-3 cursor-pointer" onClick={closeAllOverlays} />
                <h5 className="text-lg font-medium text-center mb-3">Report</h5>
                <hr className="border-gray-600 mb-3" />
                <p className="text-sm mb-4">Why are you reporting this post?</p>
                <ul className="space-y-2">
                    {[
                        "I just don’t like it",
                        "Bullying or unwanted contact",
                        "Suicide, self-injury, or eating disorders",
                        "Violence, hate, or exploitation",
                        "Selling or promoting restricted items",
                        "Nudity or sexual activity",
                        "Scam, fraud, or spam",
                    ].map((reason) => (
                        <li 
                            key={reason}
                            className="text-sm p-2 hover:bg-gray-700 rounded cursor-pointer"
                            // onClick={() => handleReportOption(reason)}
                        >
                            {reason}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )}
</div>

        {/* Post Caption */}
        <div className="absolute bottom-12 2xl:bottom-16 left-2 md:left-42 xl:left-44 2xl:left-62 flex flex-col gap-2 z-2 text-white">
            <div className="flex items-center  gap-2">
                <img width={32} height={32} loading="lazy" src={post.avatar} alt={post.username} className="w-9 h-9 rounded-full" />
                <p className="text-sm 2xl:pb-1 font">@{post.username}</p>
                <button 
                    className={`text-xs cursor-pointer 2xl:text-md px-4 py-1 font rounded-lg ${
                        isFollowing ? "bg-transparent border border-white" : "bg-blue-500"
                    }`}
                    onClick={() => setIsFollowing(!isFollowing)}
                >
                    {isFollowing ? "Following" : "Follow"}
                </button>
            </div>
            <p className="text-[13px] pl-1 font">{post.caption}</p>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-xl text-sm">
                <img width={20} height={20} loading="lazy" src={song} alt="song" className="w-5 h-5 rounded-full" />
                <span className="font">{post.song}</span>
                <span className="font">•</span>
                <span className="font">Remix</span>
              
            </div>
        </div>

        {/* Overlays */}
        {activeOverlay === "comment" && (
            <div className="absolute bottom-0 w-full h-3/4 bg-gray-800 rounded-t-xl p-4 z-30">
                <CommentSection comments={post.comments || []} onCancel={closeAllOverlays} />
            </div>
        )}
        {activeOverlay === "share" && (
                <div className="absolute bottom-0 w-full h-3/4 bg-gray-800 rounded-t-xl p-4 z-30">
                    <ShareOptions onCancel={closeAllOverlays} />
                </div>
            )}
            {activeOverlay === "repost" && (
                <div className="absolute bottom-0 w-full h-3/4 bg-gray-800 rounded-t-xl p-4 z-30">
                    <RepostFlick onCancel={closeAllOverlays} />
                </div>
            )}
        
    </div>
</div>
    );
});


