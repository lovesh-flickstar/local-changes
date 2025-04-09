import React, { useEffect, useState } from 'react';
import {FaCheck} from 'react-icons/fa';
import {users, socialIcons} from '../../constants/ShareSectionData';

// Custom hook for debouncing
function useDebounce(value: string, delay : number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}






interface User {
    id: number;
    name: string;
    avatar: string;
}

interface SocialIcon {
    id: number;
    name: string;
    icon: React.ReactNode;
    url: string;
}


export const ShareOptions = ({ onCancel }: {onCancel :  ()=>  void}) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [message, setMessage] = useState<string>('');

    // Debounced search term
    const debouncedSearchTerm = useDebounce(searchTerm, 300);  // 300ms debounce

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );  

    const handleUserClick = (user : User) => {
        setSelectedUsers((prevSelectedUsers: User[]) => {
            if (prevSelectedUsers.find((selected : User) => selected.id === user.id)) {
                return prevSelectedUsers.filter((selected : User) => selected.id !== user.id);
            }
            return [...prevSelectedUsers, user];
        });
    };

    const handleSend = () => {
        if (message.trim() && selectedUsers.length > 0) {
            const userNames = selectedUsers.map((user : User) => user.name).join(', ');
            alert(`Message sent to ${userNames}: ${message}`);
            setMessage('');
            setSelectedUsers([]);
        }
    };

    return (
        <div className="share-component" style={{ overflowY: "auto", flexGrow: 1 }}>
            <div className="share-section-header">
                <h3>Share</h3>
                <button className="cancel-btn" onClick={onCancel}>
                    <i className="bi bi-x remove-icon"></i>
                </button>
            </div>
            <hr />

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Scrollable User Avatars */}
            <div className="user-list">
                {filteredUsers.map((user : User) => (
                    <div
                        key={user.id}
                        className={`user-item ${selectedUsers.find((selected : User) => selected.id === user.id)
                            ? 'selected'
                            : ''
                            }`}
                        onClick={() => handleUserClick(user)}
                    >
                        <img src={user.avatar} alt={user.name} className="share-flick-user-avatar" />
                        {selectedUsers.find((selected : User) => selected.id === user.id) && (
                            <span className="share-flick-tick-mark"><FaCheck /></span>
                        )}
                        <span className="share-flick-user-name">{user.name}</span>
                    </div>
                ))}
            </div>

            {/* Fixed Social Icons */}
            <div className="social-icons">
                {socialIcons.map((icon : SocialIcon) => (
                    <div
                        key={icon.id}
                        className={`social-item ${icon.name.toLowerCase().replace(" ", "-")}`}
                    >
                        <a href={icon.url} target="_blank" rel="noopener noreferrer">
                            {icon.icon}
                        </a>
                        <span className="social-name">{icon.name}</span>
                    </div>
                ))}
            </div>

            {/* Message Card */}
            {selectedUsers.length > 0 && (
                <div className="message-card">
                    <h4>Send a Message</h4>
                    <textarea
                        placeholder="Write a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    <button onClick={handleSend}>Send</button>
                </div>
            )}
        </div>
    );
};


