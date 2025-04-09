import React, { useState } from "react";
import { followersData } from "../../constants/FollowerData";
import { RxCross2 } from "react-icons/rx";



interface Follower {
    avatar: string;
    name: string;
    username: string;
    removed: boolean;
}

export const FollowersModal = ({ isOpen, onClose  } : {isOpen : boolean,  onClose : () => void }) => {
    const [followers, setFollowers] = useState<Follower[]>(followersData);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedFollower, setSelectedFollower] = useState<Follower | null>(null);

    if (!isOpen) return null;

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    // Filter followers based on search query
    const filteredFollowers = followers.filter(
        (follower) =>
            follower.name.toLowerCase().includes(searchQuery) ||
            follower.username.toLowerCase().includes(searchQuery)
    );

    const handleRemoveClick = (follower : Follower) => {
        if (follower.removed) {
            setFollowers(prevFollowers =>
                prevFollowers.map(f =>
                    f.username === follower.username ? { ...f, removed: false } : f
                )
            );
        } else {
            setSelectedFollower(follower);
        }
    };

    const confirmRemove = () => {
        setFollowers((prevFollowers: Follower[]) =>
            prevFollowers.map(f =>
                f.username === selectedFollower?.username ? { ...f, removed: true } : f
            )
        );
        setSelectedFollower(null);
    };

    return (
        <>
            <div className="overlay">
                <div className="modal-content">
                    <h3 className="follower-heading">Followers</h3>
                    <button className="close-btn" onClick={onClose}><RxCross2 /></button>
                    <div className="followers-list">
                        <div className="follower-search">
                            <input
                                type="text"
                                placeholder="Search people..."
                                className="share-search-input mb-2 py-2"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                        {filteredFollowers.length > 0 ? (
                            filteredFollowers.map((follower, index) => (
                                <div key={index} className="follower-row" style={{ color: follower.removed ? 'blue' : 'black' }}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <img src={follower.avatar} alt={follower.name} className="follower-avatar" />
                                        <div className="follower-info">
                                            <p className="follower-name mb-0">{follower.name}</p>
                                            <p className="follower-username mb-0">@{follower.username}</p>
                                        </div>
                                    </div>
                                    <button
                                        className="remove-btn"
                                        onClick={() => handleRemoveClick(follower)}
                                        style={{ backgroundColor: follower.removed ? 'blue' : 'var(--remove-button)' }}
                                    >
                                        {follower.removed ? 'Follow Back' : 'Remove'}
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="no-results">No followers found</p>
                        )}
                    </div>
                </div>
            </div>
            {selectedFollower && (
                <div className="overlay">
                    <div className="modal-content-2">
                        <img src={selectedFollower.avatar} alt={selectedFollower.name} className="confirmation-avatar" />
                        <p className="confirmation-name mb-0">{selectedFollower.name}</p>
                        <p className="mb-0 confirmation-description">Are you sure you want to remove this follower?</p>
                        <div className="confirmation-buttons">
                            <button className="user-profile-remove-button" onClick={confirmRemove}>Remove</button>
                            <button className="user-profile-cancel-button" onClick={() => setSelectedFollower(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};


