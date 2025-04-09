import React, { useState, useCallback, memo } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { initialSuggestions } from "../../constants/MusicData"; // Adjust the import path as necessary

// Type definitions
interface Suggestion {
  id: number;
  username: string;
  handle: string;
  flicks: string;
  avatar: string;
  playing: boolean;
}

const Music: React.FC = memo(() => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>(initialSuggestions);

  const handleTogglePlay = useCallback((id: number) => {
    setSuggestions(prev => prev.map(friend => 
      friend.id === id ? { ...friend, playing: !friend.playing } : friend
    ));
  }, []);

  return (
<section className="p-4" aria-label="Music suggestions">
  <ul className="list-none p-0 m-0">
    {suggestions.map((friend) => (
      <li 
        key={friend.id} 
        className="flex items-center justify-between mb-4 last:mb-0"
        aria-label={`Music track: ${friend.username}`}
      >
        <div className="flex items-center flex-1">
          <img
            src={friend.avatar}
            alt={`${friend.username}'s avatar`}
            className="w-12 h-12 rounded-full object-cover"
            loading="lazy"
            width={48}
            height={48}
            decoding="async"
          />
          <div className="ml-3 flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate mb-0 dark:text-gray-100">
              {friend.username}
            </p>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <span className="truncate">{friend.handle}</span>
              <span className="mx-1" aria-hidden="true">•</span>
              <span>{friend.flicks}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center ml-2">
          <button
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
            onClick={() => handleTogglePlay(friend.id)}
            aria-label={friend.playing ? "Pause track" : "Play track"}
          >
            {friend.playing ? (
              <FaPause className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            ) : (
              <FaPlay className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </li>
    ))}
  </ul>
</section>
  );
});

export default Music;