import React, { useState, useCallback, memo } from "react";
import {peoples} from "../../constants/SuggestionData"

interface Person {
    id: number;
    username: string;
    handle: string;
    avatar: string;
    followed: boolean;
  }

export const People: React.FC = memo(() => {
  const [suggestions, setSuggestions] = useState<Person[]>(peoples);

  const handleFollow = useCallback((id: number) => {
    setSuggestions(prev => prev.map(person => 
      person.id === id ? { ...person, followed: !person.followed } : person
    ));
  }, []);

  return (
    <section className="p-4" aria-label="People suggestions">
    <ul className="list-none p-0 m-0 space-y-4" role="list">
      {suggestions.map((person) => (
        <li 
          key={person.id}
          className="flex items-center justify-between group"
          role="listitem"
          aria-label={`User: ${person.username}`}
        >
          <div className="flex items-center flex-1 min-w-0">
            <img
              src={person.avatar}
              alt={`${person.username}'s avatar`}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-gray-800"
              loading="lazy"
              width={48}
              height={48}
              decoding="async"
            />
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-100">
                {person.username}
              </p>
              <p 
                className="text-xs text-gray-500 truncate dark:text-gray-400"
                aria-label="User handle"
              >
                @{person.handle}
              </p>
            </div>
          </div>
  
          <div className="flex items-center ml-2">
            <button
              className={`text-sm px-4 py-2 rounded-full transition-all duration-200 ${
                person.followed 
                  ? 'bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
              onClick={() => handleFollow(person.id)}
              aria-label={
                person.followed 
                  ? `Unfollow ${person.username}` 
                  : `Follow ${person.username}`
              }
            >
              {person.followed ? "Following" : "Follow"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  </section>
  );
});