import { useState, useCallback, useRef, useEffect } from "react";
import avatar1 from "../../assets/compressed/avatar1_compressed_compressed_compressed_compressed_compressed-transformed-transformed.webp";
import { StoryCard } from "../../components/Card/StoryCard";
import {  stories } from "../../constants/StoryData/StoryData";
import {Comment, PostCard} from "../../components/Card/PostCard";
import {FriendSuggestions} from "../../components/Section/FriendSuggestionSection";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import {MobileNav} from "../../components/media/MobileNav";
import { CommentSection } from "../../components/Section/CommentSection";
import {ShareOptions} from "../../components/Section/ShareSection";
import {RepostFlick} from "../../components/Section/ReportSection";
// import {StoryView} from "../../components/Section/StorySection";
import {posts} from "../../constants/PostData";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAmount = 300; // Adjust this value based on your card width

  const checkScrollPosition = () => {
    if (!containerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } : {scrollLeft :  number ,  scrollWidth: number , clientWidth :  number} = containerRef.current;
    setShowLeftButton(scrollLeft > 0);
    setShowRightButton(scrollLeft + clientWidth < scrollWidth);
  };

  const handleScroll = (direction: string) => {
    if (!containerRef.current) return;
    
    const newScrollLeft = direction === 'left' 
      ? containerRef.current.scrollLeft - scrollAmount
      : containerRef.current.scrollLeft + scrollAmount;

    containerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initial check
    checkScrollPosition();
    
    // Add event listeners
    container.addEventListener('scroll', checkScrollPosition);
    window.addEventListener('resize', checkScrollPosition);

    return () => {
      container.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, []);

  const storiesContainerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const toggleHeart = useCallback((postId: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  }, []);

  // const [isStoryViewOpen, setIsStoryViewOpen] = useState(false);

  // const closeStoryView = () => {
  //   setIsStoryViewOpen(false);
  // };

  const [activeSidebar, setActiveSidebar] = useState("friendSuggestions");
  const [currentSidebarComments, setCurrentSidebarComments] = useState<Comment[] | []>([]);

  const toggleSidebar = (view: string, comments: Comment[] = []  ) => {
    setActiveSidebar(view);
    if (view === "comments") {
      setCurrentSidebarComments(comments);
    }
  };

  const renderSidebarContent = () => {
    switch (activeSidebar) {
      case "comments":
        return (
          <CommentSection
            comments={currentSidebarComments || []}
            onCancel={() => toggleSidebar("friendSuggestions")}
          />
        );
      case "share":
        return (
          <ShareOptions onCancel={() => toggleSidebar("friendSuggestions")} />
        );
      case "repost":
        return (
          <RepostFlick onCancel={() => toggleSidebar("friendSuggestions")} />
        );
      default:
        return <FriendSuggestions />;
    }
  };
  return (
    <>   
            <main className="flex-1 border-r border-white/10 h-full overflow-hidden md:mt-0 flex flex-col">
    {/* Stories Container - Fixed Height */}
    <div 
        className="sticky hidden md:block top-0 z-20 bg-black w-full px-2.5 py-0 shadow-black shadow-2xl"
        ref={storiesContainerRef}
    >
        <div className="relative h-full">
      <div
        ref={containerRef}
        className="flex h-full gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-black"
      >
        {stories.map((story) => (
          <div
            key={story.id}
            className="h-full flex-shrink-0"
          >
            <StoryCard story={story} isYourStory={story.id === 1} />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      {showLeftButton && (
        <button
          className="absolute top-1/2 -translate-y-1/2 z-30 bg-white rounded-full p-2 left-2"
          onClick={() => handleScroll('left')}
        >
          <FaAngleLeft />
        </button>
      )}
      {showRightButton && (
        <button
          className="absolute top-1/2 -translate-y-1/2 z-30 bg-white rounded-full p-2 right-2"
          onClick={() => handleScroll('right')}
        >
          <FaAngleRight />
        </button>
      )}
    </div>
    </div>

    {/* Posts Container - Full Viewport Height */}
    <div className="flex-1 overflow-y-auto snap-y snap-mandatory scroll-smooth
        [scrollbar-width:none] [-ms-overflow-style:none] 
        [-webkit-overflow-scrolling:touch] relative ">
        {posts.map((post) => (
            <div 
                key={post.id}
                className="h-full snap-start flex items-center justify-center w-full max-w-[500px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1100px] 2xl:max-w-[1300px]
                relative mx-auto"
            >
                <PostCard
                    post={post}
                    isLiked={likedPosts.has(post.id)}
                    toggleHeart={() => toggleHeart(post.id)}
                    toggleMute={toggleMute}
                    isMuted={isMuted}
                    toggleSidebar={(view) => toggleSidebar(view, post.comments)}
                    stories={stories}
                />
            </div>
        ))}
    </div>
</main>

            <aside className="hidden lg:flex flex-col py-3 sticky top-0 h-screen overflow-y-auto lg:w-3/12">
                <div className="flex items-center justify-between p-3">
                    <Link to='/profile' className="flex items-center no-underline">
                        <img src={avatar1} alt="User Avatar" className="w-12 h-12 rounded-full object-cover" />
                        <div className="ml-3">
                            <p className="text-md font-medium font-[--font-family-primary] tracking-wider text-white">John Smith</p>
                            <p className="text-xs text-[var(--gray-dark)]">@johnsmith2045</p>
                        </div>
                    </Link>
                    <div className="flex items-center gap-2 text-white">
                        <svg className="mx-2" xmlns="http://www.w3.org/2000/svg" width="31" height="29" viewBox="0 0 31 29" fill="none">
                        <path d="M27.5556 29H3.44444C1.55 29 0 27.55 0 25.7778V3.22222C0 1.45 1.55 0 3.44444 0H27.5556C29.45 0 31 1.45 31 3.22222V25.7778C31 27.55 29.45 29 27.5556 29Z" fill="#007AFF" />
                        <path d="M21.3557 18.5012C21.3557 22.605 17.3104 23.1179 16.5652 23.1179V25.375H14.649V23.1179C14.0102 23.0153 9.53906 22.605 9.53906 17.6804H13.0521C13.0521 18.1934 13.0521 20.5531 15.7135 20.5531C17.9491 20.5531 17.9491 18.809 17.9491 18.6038C17.9491 14.9104 10.2843 16.4493 10.2843 10.704C10.2843 7.2158 13.5844 6.08726 15.0748 6.08726V3.625H16.991V6.08726C18.162 6.18986 21.4621 7.11321 21.4621 11.4222H17.9491C17.9491 10.4988 17.7362 8.65212 15.7135 8.65212C13.6909 8.65212 13.6908 10.3962 13.6908 10.704C13.5844 14.0896 21.3557 12.6533 21.3557 18.5012Z" fill="white" />
                        </svg>
                    </div>
                </div>
                <hr className="my-2" />
                {renderSidebarContent()}
            </aside>
        
        <MobileNav />
        </>
);
}
