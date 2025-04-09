// import { useState, useCallback, useRef, lazy} from "react";
// // import { Link } from "react-router-dom";
// import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
// import { PostType, CommentType } from "@/types";
// import  Button  from "../../components/ui/Button/Button";
// import  StoryCard  from "../../components/home/story/StoryCard";
// import MobileNav  from "../../components/media/MobileNav";
// import  CommentSection  from "../../components/home/attributes/CommentSection";
// import ShareOptions  from "../../components/home/attributes/ShareOptions";
// import  RepostFlick  from "../../components/home/attributes/RepostFlick";
// import  StoryView  from "../../components/home/attributes/StoryView";
// import { LeftSidebar } from "";
// import { FriendSuggestions } from "@/components/FriendSuggestions";
// import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
// import avatar1 from "@/assets/compressed/avatar1.webp";
// import { posts as mockPosts, stories as mockStories } from "@/data/mockData";

// // const LazyPhoneImages = lazy(() => import("../../components/media/PhoneImages"));

// export const HomePage = () => {
//   const [showLeftButton,] = useState(false);
//   const [showRightButton,] = useState(true);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isStoryViewOpen, setIsStoryViewOpen] = useState(false);
//   const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
//   const [activeSidebar, setActiveSidebar] = useState<"comments" | "share" | "repost" | "friendSuggestions">("friendSuggestions");
//   const [currentSidebarComments, setCurrentSidebarComments] = useState<CommentType[]>([]);
  
//   const storiesContainerRef = useRef<HTMLDivElement>(null);
//   const postsContainerRef = useRef<HTMLDivElement>(null);
//   const scrollDistance = storiesContainerRef.current?.offsetWidth ? storiesContainerRef.current.offsetWidth / 2 : 240;

//   // Optimized scroll handlers
//   const scrollStories = useCallback(() => {
//     storiesContainerRef.current?.scrollBy({ left: scrollDistance, behavior: "smooth" });
//   }, [scrollDistance]);

//   const scrollBack = useCallback(() => {
//     storiesContainerRef.current?.scrollBy({ left: -scrollDistance, behavior: "smooth" });
//   }, [scrollDistance]);

//   // Intersection Observer for lazy loading posts
//   useIntersectionObserver({
//     target: postsContainerRef,
//     onIntersect: ([entry]: IntersectionObserverEntry[]) => {
//       if (entry?.isIntersecting) {
//         // Handle post loading logic
//       }
//     },
//     threshold: 0.1
//   });

//   const toggleMute = useCallback(() => setIsMuted(prev => !prev), []);
//   // const toggleHeart = useCallback((postId: number) => {
//   //   // Optimized like toggle logic
//   // }, []);

//   // Story viewing logic
//   const openStoryView = useCallback((index: number) => {
//     setCurrentStoryIndex(index);
//     setIsStoryViewOpen(true);
//   }, []);

//   const closeStoryView = useCallback(() => setIsStoryViewOpen(false), []);

//   // Sidebar management
//   const toggleSidebar = useCallback(
//     (view: typeof activeSidebar, comments: CommentType[] = []) => {
//       setActiveSidebar(view);
//       if (view === "comments") setCurrentSidebarComments(comments);
//     },
//     []
//   );

//   return (
//     <div className="flex min-h-screen bg-background">
//       {/* Left Sidebar */}
//       <LeftSidebar />

//       {/* Main Content */}
//       <main className="flex-1 border-r border-border md:ml-[70px] lg:ml-0 lg:w-[700px]">
//         {/* Stories Section */}
//         <section className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//           <div 
//             ref={storiesContainerRef}
//             className="flex gap-3 overflow-x-auto px-4 py-3 scrollbar-hide"
//             onScroll={handleScroll}
//           >
//             {mockStories.map((story, index) => (
//               <StoryCard
//                 key={story.id}
//                 story={story}
//                 onClick={() => openStoryView(index)}
//               />
//             ))}
//           </div>
          
//           {/* Scroll Arrows */}
//           {showLeftButton && (
//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 shadow"
//               onClick={scrollBack}
//             >
//               <FaAngleLeft className="h-5 w-5" />
//             </Button>
//           )}
//           {showRightButton && (
//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 shadow"
//               onClick={scrollStories}
//             >
//               <FaAngleRight className="h-5 w-5" />
//             </Button>
//           )}
//         </section>

//         {/* Posts Feed */}
//         <section 
//           ref={postsContainerRef}
//           className="h-[calc(100vh-140px)] overflow-y-auto scrollbar-hide"
//         >
//           {mockPosts.map(post => (
//             <Post
//               key={post.id}
//               post={post}
//               onLike={toggleHeart}
//               onComment={(comments) => toggleSidebar("comments", comments)}
//               isMuted={isMuted}
//               onToggleMute={toggleMute}
//             />
//           ))}
//         </section>
//       </main>

//       {/* Right Sidebar */}
//       <aside className="hidden w-[350px] border-l border-border lg:block">
//         <div className="p-4">
//           <div className="mb-4 flex items-center gap-3">
//             <img
//               src={avatar1}
//               alt="User avatar"
//               className="h-12 w-12 rounded-full object-cover"
//               loading="lazy"
//             />
//             <div>
//               <h3 className="font-semibold">John Smith</h3>
//               <p className="text-sm text-muted-foreground">@johnsmith2045</p>
//             </div>
//           </div>
          
//           {activeSidebar === "comments" ? (
//             <CommentSection 
//               comments={currentSidebarComments}
//               onClose={() => toggleSidebar("friendSuggestions")}
//             />
//           ) : activeSidebar === "share" ? (
//             <ShareOptions onClose={() => toggleSidebar("friendSuggestions")} />
//           ) : activeSidebar === "repost" ? (
//             <RepostFlick onClose={() => toggleSidebar("friendSuggestions")} />
//           ) : (
//             <FriendSuggestions />
//           )}
//         </div>
//       </aside>

//       {/* Mobile Navigation */}
//       <MobileNav />

//       {/* Story View Modal */}
//       {isStoryViewOpen && (
//         <StoryView
//           stories={mockStories}
//           initialIndex={currentStoryIndex}
//           onClose={closeStoryView}
//         />
//       )}
//     </div>
//   );
// };

// // Post Component (separate file)
// interface PostProps {
//   post: PostType;
//   onLike: (postId: number) => void;
//   onComment: (comments: CommentType[]) => void;
//   isMuted: boolean;
//   onToggleMute: () => void;
// }

// const Post = ({ post, onLike, onComment, isMuted, onToggleMute }: PostProps) => {
//   const [localLikes, setLocalLikes] = useState(post.likes);
  
//   const handleLike = useCallback(() => {
//     setLocalLikes(prev => prev + 1);
//     onLike(post.id);
//   }, [post.id, onLike]);

//   return (
//     <article className="mb-8 rounded-xl border bg-card shadow-sm">
//       <header className="flex items-center gap-3 p-4">
//         <div className="relative">
//           <img
//             src={post.avatar}
//             alt={post.username}
//             className="h-12 w-12 rounded-full object-cover"
//             loading="lazy"
//           />
//         </div>
//         <div>
//           <h3 className="font-semibold">{post.username}</h3>
//           <p className="text-sm text-muted-foreground">{post.location}</p>
//         </div>
//       </header>

//       <div className="relative aspect-square">
//         <img
//           src={post.image}
//           alt={post.caption}
//           className="h-full w-full object-cover"
//           loading="lazy"
//           decoding="async"
//         />
//         <button
//           onClick={onToggleMute}
//           className="absolute bottom-4 right-4 rounded-full bg-background/80 p-2 backdrop-blur"
//           aria-label={isMuted ? "Unmute video" : "Mute video"}
//         >
//           {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
//         </button>
//       </div>

//       <div className="p-4">
//         <div className="flex gap-4">
//           <Button variant="ghost" size="icon" onClick={handleLike}>
//             <HeartIcon className="h-6 w-6" />
//           </Button>
//           <Button variant="ghost" size="icon" onClick={() => onComment(post.comments)}>
//             <CommentIcon className="h-6 w-6" />
//           </Button>
//         </div>
//         <p className="mt-2 font-medium">{localLikes.toLocaleString()} likes</p>
//         <p className="mt-1">
//           <span className="font-semibold">{post.username}</span> {post.caption}
//         </p>
//       </div>
//     </article>
//   );
// };