import React, { memo } from "react";
import { RxCross2 } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";

interface RecentSearchesProps {
    searches: string[];
    onSearch: (query: string) => void; 
    onClear: () => void;
  }

export const RecentSearches: React.FC<RecentSearchesProps> = memo(({  searches, 
    onSearch,
    onClear }) => {
  return (
    <div className="search-overlay position-absolute">
      <div className="d-flex justify-content-between align-items-center mb-3 w-100 search-heading">
        <h6 className="m-0">Recent Searches</h6>
        <button 
          onClick={onClear}
          aria-label="Clear recent searches"
          className="btn btn-link p-0"
        >
          <RxCross2 className="fs-5" />
        </button>
      </div>
      <div className="d-flex flex-wrap gap-2">
        {searches.map((search, index) => (
          <div 
            key={`${search}-${index}`}
            className="search-chip d-flex align-items-center"
            role="button"
            tabIndex={0}
            onClick={() => onSearch(search)}
          >
            <CiSearch className="fs-6 me-1" aria-hidden="true" />{search}
            <span>{search}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

RecentSearches.displayName = 'RecentSearches';