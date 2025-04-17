import { useState, useCallback, useRef, useEffect } from "react";
import { StoryCard } from "../../components/Card/StoryCard";
import {  stories } from "../../constants/StoryData/StoryData";
import {Comment, PostCard} from "../../components/Card/PostCard";
import {FriendSuggestions} from "../../components/Section/FriendSuggestionSection";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { CommentSection } from "../../components/Section/CommentSection";
import {ShareOptions} from "../../components/Section/ShareSection";
import {RepostFlick} from "../../components/Section/ReportSection";
// import {StoryView} from "../../components/Section/StorySection";
import {posts} from "../../constants/PostData";

import RightSidebar from "../../components/Sidebar/RightSidebar";

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
    <div className="flex w-full justify-between h-full overflow-y-auto py-10 md:py-0">
            <main  className=" w-full border-r px-4 border-white/10 h-full overflow-hidden md:mt-0 flex flex-col">
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

<RightSidebar>
            {renderSidebarContent()}
            </RightSidebar>
        
        
        </div>
);
}
