import React, { useState, useCallback, memo } from "react";
import { PiShareFat } from "react-icons/pi";
import { GoHeart, GoHeartFill } from "react-icons/go";
import {questData} from "../../constants/QuestData";

interface QuestData {
    image: string;
    avatar: string;
    name: string;
    username: string;
    title: string;
    status: "OnFlick" | "GoFlick";
    description: string;
    amount: number;
  }

interface QuestCardProps {
  data: QuestData;
}

 const QuestCard: React.FC<QuestCardProps> = memo(({ data }) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = useCallback(() => {
    setIsLiked(prev => !prev);
  }, []);

  return (
    <article 
    className="relative w-full rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
    aria-labelledby={`quest-${data.title}`}
  >
    <div className="relative group">
      <img 
        src={data.image} 
        alt="" 
        className="w-full h-64 object-cover aspect-video"
        loading="lazy"
        width={400}
        height={300}
      />

      {/* User Profile Section */}
      <div className="absolute top-3 left-3 flex items-center gap-2 backdrop-blur-sm bg-black/30 rounded-full pr-3">
        <img 
          src={data.avatar} 
          alt="" 
          className="w-10 h-10 rounded-full object-cover border-2 border-white"
          loading="lazy"
          width={40}
          height={40}
        />
        <div className="flex flex-col">
          <span className="text-white font-medium text-sm">{data.name}</span>
          <span className="text-xs text-white/80">@{data.username}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-3 right-3 flex gap-2">
        <button 
          className="p-2 rounded-full bg-gray-800/30 backdrop-blur-sm hover:bg-gray-700/50 transition-colors"
          aria-label="Share quest"
        >
          <PiShareFat className="w-5 h-5 text-white" />
        </button>
        <button 
          className="p-2 rounded-full bg-gray-800/30 backdrop-blur-sm hover:bg-gray-700/50 transition-colors" 
          onClick={toggleLike}
          aria-label={isLiked ? "Unlike quest" : "Like quest"}
        >
          {isLiked ? (
            <GoHeartFill className="w-5 h-5 text-red-500" />
          ) : (
            <GoHeart className="w-5 h-5 text-white" />
          )}
        </button>
      </div>

      {/* Title Section */}
      <div className="absolute bottom-[30%] left-0 w-full px-4 flex justify-between items-center">
        <h2 id={`quest-${data.title}`} className="text-white font-bold text-lg drop-shadow-lg">
          {data.title}
        </h2>
        <span className="bg-green-500/90 text-white px-3 py-1 rounded-full text-sm font-medium">
          {data.status}
        </span>
      </div>

      {/* Bottom Overlay */}
      <div className="absolute bottom-0 w-full px-4 py-3 bg-gradient-to-t from-black/60 to-transparent">
        <div className="flex justify-between items-center">
          <p className="text-white/90 text-sm line-clamp-2 pr-2">{data.description}</p>
          <span className="text-2xl font-bold text-white shrink-0">
            ${data.amount}
          </span>
        </div>
      </div>
    </div>
  </article>
)});

export const SearchQuest = memo(() => (
  <section 
  className="flex flex-col overflow-y-scroll gap-6 p-4 container mx-auto 
  [-ms-overflow-style:none] [scrollbar-width:none]
  [&::-webkit-scrollbar]:hidden"
  aria-label="Quest listings"
  
>
<div className="p-2 overflow-y-auto max-h-[calc(100vh-10rem)] [-ms-overflow-style:none] [scrollbar-width:none]
  [&::-webkit-scrollbar]:hidden scroll-smooth">
  {questData.map((data, index) => (
    <QuestCard 
      key={`quest-${data.title}-${index}`} 
      data={data} 
    />
  ))}
  </div>
</section>
));