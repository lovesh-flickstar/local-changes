import React, { useState, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import avatar1 from "../../assets/compressed/avatar1_compressed_compressed_compressed_compressed_compressed-transformed-transformed.webp";
import { flicks, quests, songs, tags, peoples } from "../../constants/SuggestionData";

// Type definitions
interface Person {
  id: number;
  username: string;
  handle: string;
  avatar: string;
  followed: boolean;
}
interface SuggestionsProps {
  onNavigate: (tab: string) => void;
  onClose: () => void;
}


export const Suggestions: React.FC<SuggestionsProps> = memo(({ onNavigate, onClose }) => {
  const [people, setPeople] = useState<Person[]>(peoples);

  const toggleFollow = useCallback((id: number) => {
    setPeople(prev => prev.map(person => 
      person.id === id ? { ...person, followed: !person.followed } : person
    ));
  }, []);

  const handleNavigation = useCallback((tab: string) => {
    onNavigate(tab);
    onClose();
  }, [onNavigate, onClose]);

  return (
    <div className="suggestion-overlay position-absolute" role="region" aria-label="Search suggestions">
      <div className="d-flex justify-content-between align-items-center mb-4 w-100 suggestion-heading">
        <h2 className="mb-0 h6">Search Results</h2>
      </div>

      {/* People Section */}
      <div className="suggestion-section mb-3">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="mb-0 h6">People</h3>
          <button 
            className="suggestion-btn-link" 
            onClick={() => handleNavigation("people")}
            aria-label="View all people"
          >
            See All
          </button>
        </div>
        <div className="row mt-2 px-3 people-section">
          {people.map((person) => (
            <div key={person.id} className="col-12 col-md-6 suggestion-item d-flex align-items-center gap-3">
              <img 
                src={person.avatar} 
                alt={`${person.username}'s avatar`} 
                className="suggestion-avatar"
                loading="lazy"
                width={40}
                height={40}
              />
              <Link 
                to="/friend-profile" 
                className="d-flex flex-column text-decoration-none"
                aria-label={`View ${person.username}'s profile`}
              >
                <span className="suggestion-name">{person.username}</span>
                <span className="suggestion-username">{person.handle}</span>
              </Link>
              <button
                className={`suggestion-button ms-auto ${person.followed ? "suggestion-following-button" : ""}`}
                onClick={() => toggleFollow(person.id)}
                aria-label={person.followed ? `Unfollow ${person.username}` : `Follow ${person.username}`}
              >
                {person.followed ? "Following" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Flicks Section */}
      <div className="suggestion-section flick-section mb-3">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="mb-0 h6">Flicks</h3>
          <button 
            className="suggestion-btn-link" 
            onClick={() => handleNavigation("flicks")}
            aria-label="View all flicks"
          >
            See All
          </button>
        </div>
        <div className="suggestion-flicks-container px-3">
          <div className="suggestion-flicks-grid">
            {flicks.slice(0, 6).map((flick) => (
              <div key={flick.id} className="suggestion-flick-card">
                <img 
                  src={flick.image} 
                  alt={`Post by ${flick.user}`} 
                  className="suggestion-flick-image"
                  loading="lazy"
                  width={300}
                  height={300}
                />
                <div className="suggestion-flick-info">
                  <img 
                    src={avatar1} 
                    alt={`${flick.user}'s avatar`} 
                    className="suggestion-avatar-icon"
                    loading="lazy"
                    width={24}
                    height={24}
                  />
                  <div>
                    <p className="suggestion-user-name mb-0">{flick.user}</p>
                    <p className="suggestion-user-handle mb-0">{flick.username}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Music Section */}
      <div className="suggestion-section mb-3">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="mb-0 h6">Music</h3>
          <button 
            className="suggestion-btn-link" 
            onClick={() => handleNavigation("music")}
            aria-label="View all music"
          >
            See All
          </button>
        </div>
        <div className="row mt-2 px-3 music-section">
          {songs.map((song) => (
            <div key={song.id} className="col-md-4 col-12 suggestion-item d-flex align-items-center gap-3">
              <img 
                src={song.avatar} 
                alt={`${song.username} cover`} 
                className="suggestion-music-avatar"
                loading="lazy"
                width={40}
                height={40}
              />
              <div className="d-flex flex-column">
                <span className="suggestion-song-name">{song.username}</span>
                <span className="suggestion-song-username">{song.handle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quest Section */}
      <div className="suggestion-section quest-section mb-3">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="mb-0 h6">Quest</h3>
          <button 
            className="suggestion-btn-link" 
            onClick={() => handleNavigation("quest")}
            aria-label="View all quests"
          >
            See All
          </button>
        </div>
        <div className="row mt-2 px-3">
          {quests.map((quest) => (
            <div key={quest.id} className="col-4 suggestion-item d-flex gap-3">
              <img 
                src={quest.image} 
                alt={quest.title} 
                className="suggestion-quest-image"
                loading="lazy"
                width={100}
                height={100}
              />
              <div className="d-flex flex-column">
                <span className="suggestion-quest-name">{quest.title}</span>
                <span className="suggestion-quest-description">{quest.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tags Section */}
      <div className="suggestion-section mb-3">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="mb-0 h6">Tags</h3>
          <button 
            className="suggestion-btn-link" 
            onClick={() => handleNavigation("tags")}
            aria-label="View all tags"
          >
            See All
          </button>
        </div>
        <div className="row mt-2 px-3 teg-section">
          {tags.map((tag) => (
            <div key={tag.id} className="col-md-4 col-12 suggestion-item d-flex align-items-center gap-3">
              <img 
                src={tag.avatar} 
                alt={`${tag.username} tag`} 
                className="suggestion-tag-avatar"
                loading="lazy"
                width={24}
                height={24}
              />
              <div className="d-flex flex-column">
                <span className="suggestion-tag-name">{tag.username}</span>
                <span className="suggestion-tag-username">{tag.handle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});