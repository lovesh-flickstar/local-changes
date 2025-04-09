import React, { memo } from "react";

export interface Story {
    id: number;
    self ?: boolean;
    thumbnailImage: string;
    name: string;
    images : string;
    song? : string;
    username : string;
    views?: number;
    viewers?: Viewer[];
}
interface StoryCardProps {
    story: Story;
    isYourStory?: boolean;  // Add this prop definition
  }

interface Viewer {
    avatar: string;
    username: string;
    icon?: React.ReactElement | string;
}
// Memoized StoryCard component
export const StoryCard = memo(({ story, isYourStory }: StoryCardProps)=>(
    <div className={`min-w-16 text-center ${isYourStory ? "fixed-story" : ""}`}>
    <div className={`relative w-16 h-16 rounded-full flex items-center justify-center 
        ${isYourStory ? "before:content-[''] before:absolute before:inset-0 before:rounded-full before:p-1 before:bg-gradient-to-b before:from-[#5006B5] before:via-[#D255FD] before:to-[#4D3AC9] before:[mask:radial-gradient(circle,transparent_64%,black_66%)]" : "before:content-[''] before:absolute before:inset-0 before:rounded-full before:p-1 before:bg-gradient-to-b before:from-[#5006B5] before:via-[#D255FD] before:to-[#4D3AC9] before:[mask:radial-gradient(circle,transparent_64%,black_66%)]"}`}>
        
        <img
            src={story.thumbnailImage}
            alt={`Story of ${story.name}`}
            width={50}
            height={50}
            className="relative w-13 h-13 rounded-full object-cover bg-transparent"
            loading="lazy"
            title={isYourStory ? "Add to Your Story" : `View ${story.name}'s story`}
        />
        
        {isYourStory && (
            <div className="absolute -bottom-1 right-1 bg-[var(--primary-color)] rounded-full w-6 h-6 flex items-center justify-center border-3 border-[var(--background-color)]">
                <span className="text-white text-lg leading-none pb-0.5">+</span>
            </div>
        )}  
    </div>

    <p className="text-md text-white font-[--font-family-secondary] tracking-widest">
        {story.name}
    </p>
</div>
));

