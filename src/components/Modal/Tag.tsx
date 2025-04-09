import React, { memo } from "react";
import {tags} from "../../constants/SuggestionData";

export const Tags: React.FC = memo(() => {
  return (
    <section className="p-4" aria-label="Tag suggestions">
    <ul className="list-none p-0 m-0 space-y-3" role="list">
      {tags.map((tag) => (
        <li 
          key={tag.id}
          className="flex items-center group hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
          role="listitem"
          aria-label={`Tag: ${tag.username}`}
        >
          <div className="flex items-center flex-1 min-w-0">
            <img
              src={tag.avatar}
              alt={`${tag.username} icon`}
              className="w-8 h-8 rounded-lg object-cover"
              loading="lazy"
              width={32}
              height={32}
              decoding="async"
            />
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-100">
                #{tag.username}
              </p>
              <p 
                className="text-xs text-gray-500 truncate dark:text-gray-400"
                aria-label="Tag usage info"
              >
                {tag.handle} posts
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </section>
  );
});
