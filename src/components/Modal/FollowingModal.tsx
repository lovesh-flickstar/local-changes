import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { followingData } from "../../constants/FollowingData"; // Assuming you have this data in a separate file




interface Following {
    avatar: string;
    name: string;
    username: string;
    removed: boolean;
}
export const FollowingModal = ({ isOpen, onClose }: { isOpen: boolean , onClose: () => void }) => {
    const [followings, setFollowings] = useState<Following[]>(followingData);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedFollowing, setSelectedFollowing] = useState<Following | null>(null);

    if (!isOpen) return null;

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    // Filter followings based on search query
    const filteredFollowings = followings.filter(
        (following) =>
            following.name.toLowerCase().includes(searchQuery) ||
            following.username.toLowerCase().includes(searchQuery)
    );

    const handleRemoveClick = (following: Following) => {
        if (following.removed) {
            setFollowings(prevFollowings =>
                prevFollowings.map(f =>
                    f.username === following.username ? { ...f, removed: false } : f
                )
            );
        } else {
            setSelectedFollowing(following);
        }
    };

    const confirmRemove = () => {
        setFollowings((prevFollowings: Following[]) =>
            prevFollowings.map(f =>
                f.username === selectedFollowing?.username ? { ...f, removed: true } : f
            )
        );
        setSelectedFollowing(null);
    };

    return (
        <>
            <div className="overlay">
                <div className="modal-content">
                    <button className="close-btn" onClick={onClose}><RxCross2 /></button>
                    <h3 className="following-heading">Following</h3>
                    <div className="following-list">
                        <div className="following-search">
                            <input
                                type="text"
                                placeholder="Search people..."
                                className="share-search-input mb-2 py-2"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                        {filteredFollowings.length > 0 ? (
                            filteredFollowings.map((following, index) => (
                                <div key={index} className="following-row" style={{ color: following.removed ? 'blue' : 'black' }}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <img src={following.avatar} alt={following.name} className="following-avatar" />
                                        <div className="following-info">
                                            <p className="following-name mb-0">{following.name}</p>
                                            <p className="following-username mb-0">@{following.username}</p>
                                        </div>
                                    </div>
                                    <button
                                        className="following-button"
                                        onClick={() => handleRemoveClick(following)}
                                        style={{ backgroundColor: following.removed ? 'blue' : 'var(--remove-button)' }}
                                    >
                                        {following.removed ? 'Follow' : 'Following'}
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="no-results">No users found</p>
                        )}
                    </div>
                </div>
            </div>
            {selectedFollowing && (
                <div className="overlay">
                    <div className="modal-content-2">
                        <img src={selectedFollowing.avatar} alt={selectedFollowing.name} className="confirmation-avatar" />
                        <p className="confirmation-name mb-0">{selectedFollowing.name}</p>
                        <p className="mb-0 confirmation-description">Are you sure you want to unfollow this user?</p>
                        <div className="confirmation-buttons">
                            <button className="user-profile-remove-button" onClick={confirmRemove}>Unfollow</button>
                            <button className="user-profile-cancel-button" onClick={() => setSelectedFollowing(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

