import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import avatar1 from "../../assets/compressed/avatar1_compressed_compressed_compressed_compressed_compressed-transformed-transformed.webp";
import avatar2 from "../../assets/compressed/avatar2_compressed_compressed_compressed-transformed-transformed.webp";
import avatar3 from "../../assets/compressed/avatar3_compressed_compressed_compressed-transformed-transformed-transformed-transformed.webp";
import avatar4 from "../../assets/compressed/avatar4_compressed_compressed_compressed-transformed-transformed-transformed-transformed.webp";
import avatar5 from "../../assets/compressed/avatar5_compressed_compressed_compressed-transformed.webp";
import avatar6 from "../../assets/compressed/avatar6.webp";
import avatar7 from "../../assets/compressed/avatar7_compressed_compressed_compressed.webp";
import avatar8 from "../../assets/compressed/avatar8_compressed_compressed_compressed-transformed-transformed-transformed.webp";


export const ShareProfileModal = ({ isOpen, onClose } : {isOpen : boolean,  onClose :  ()=> void}) => {
    const [searchTerm, setSearchTerm] = useState("");

    if (!isOpen) return null;

    const users = [
        { id: 1, name: "Javlis_loma", avatar: avatar1 },
        { id: 2, name: "Christina", avatar: avatar2 },
        { id: 3, name: "Nathan Jomes", avatar: avatar3 },
        { id: 4, name: "John Cena", avatar: avatar4 },
        { id: 5, name: "John Clan", avatar: avatar5 },
        { id: 6, name: "Javlis_loma", avatar: avatar6 },
        { id: 7, name: "Christopher", avatar: avatar7 },
        { id: 8, name: "Tanner Kolt", avatar: avatar8 },
        { id: 9, name: "Colt Steel", avatar: avatar6 },
        { id: 10, name: "Steve James", avatar: avatar7 },
        { id: 11, name: "Javlis_loma", avatar: avatar8 },
        { id: 12, name: "Javlis_loma", avatar: avatar6 },

    ];

    return (
        <div className="overlay">
            <div className="share-modal">
                <div className="share-modal-header">
                    <h5 className="share-modal-title mb-0">Share Profile</h5>
                    <button className="share-close-button" onClick={onClose}>
                        <RxCross2 size={24} />
                    </button>
                </div>

                {/* Profile Info */}
                <div className="share-profile-info">
                    <img src={avatar1} alt="User Avatar" className="share-profile-avatar" />
                    <div className="share-profile-details">
                        <p className="mb-0 share-profile-name">John Anderson</p>
                        <p className="mb-0 share-profile-username">@john_anderson</p>
                    </div>
                </div>

                {/* Search Bar */}
                <p className="share-heading mb-0">Share with people</p>
                <input
                    type="text"
                    placeholder="Search people..."
                    className="share-search-input mb-4"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* User List */}

                <div className="share-user-list">
                    {users.slice(0, window.innerWidth < 768 ? 10 : 12).map((user) => (
                        <div key={user.id} className="share-user-item">
                            <img src={user.avatar} alt={user.name} className="share-user-avatar" />
                            <p className="mb-0 share-username mt-2">{user.name}</p>
                        </div>
                    ))}
                </div>

                {/* Social Media Icons */}
                <p className="share-heading mb-0">Share via social platforms</p>
                <div className="share-social-icons">
                    <button className="social-button facebook1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                        <g clipPath="url(#clip0_1627_8469)">
                            <mask id="mask0_1627_8469" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="10" height="16">
                                <rect width="10" height="16" fill="white" />
                            </mask>
                            <g mask="url(#mask0_1627_8469)">
                                <path d="M2.26027 9.71875V16.375V9.71875V16.375H6.23288V9.71875H9.21233L9.82877 6.65625H6.23288V5.59375C6.23288 4.40625 6.81507 3.875 6.81507 3.875C7.39726 3.34375 8.73288 3.34375 8.73288 3.34375C9.58904 3.34375 10 3.40625 10 3.40625V0.624999C9.58904 0.531248 8.86986 0.437498 8.86986 0.437498C8.15069 0.374998 7.60274 0.374998 7.60274 0.374998C2.19178 0.312498 2.26027 5.34375 2.26027 5.34375V6.6875H0V9.71875H2.26027Z" fill="white" />
                            </g>
                        </g>
                        <defs>
                            <clipPath id="clip0_1627_8469">
                                <rect width="10" height="16" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    </button>
                    <button className="social-button twitter1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <g clipPath="url(#clip0_1627_8475)">
                            <mask id="mask0_1627_8475" style={{ WebkitMask: "luminance", maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                                <rect width="16" height="16" fill="white" />
                            </mask>
                            <g mask="url(#mask0_1627_8475)">
                                <path d="M14.3438 5.125C14.375 5.34375 14.375 5.53125 14.375 5.53125C14.375 7.75 13.2812 9.875 13.2812 9.875C12.2188 12 10.125 13.4062 10.125 13.4062C8.0625 14.8125 5.03125 14.875 5.03125 14.875C2.21875 14.8438 0 13.4062 0 13.4062C0.375 13.4375 0.78125 13.4375 0.78125 13.4375C3.125 13.4062 4.875 12.0312 4.875 12.0312C3.75 12 2.9375 11.375 2.9375 11.375C2.125 10.75 1.8125 9.78125 1.8125 9.78125C2.09375 9.8125 2.40625 9.8125 2.40625 9.8125C2.875 9.8125 3.28125 9.71875 3.28125 9.71875C2.125 9.46875 1.40625 8.59375 1.40625 8.59375C0.6875 7.71875 0.65625 6.5 0.65625 6.5V6.4375C1.3125 6.8125 2.125 6.875 2.125 6.875C0.75 5.90625 0.65625 4.125 0.65625 4.125C0.6875 3.21875 1.125 2.46875 1.125 2.46875C2.34375 3.96875 4.09375 4.875 4.09375 4.875C5.8125 5.78125 7.875 5.90625 7.875 5.90625C7.8125 5.53125 7.8125 5.15625 7.8125 5.15625C7.84375 3.78125 8.75 2.84375 8.75 2.84375C9.6875 1.90625 11.0625 1.875 11.0625 1.875C12.5312 1.90625 13.4688 2.90625 13.4688 2.90625C14.5938 2.6875 15.5625 2.125 15.5625 2.125C15.1562 3.28125 14.125 3.9375 14.125 3.9375C15.0938 3.8125 16 3.40625 16 3.40625C15.3125 4.40625 14.3438 5.125 14.3438 5.125Z" fill="white" />
                            </g>
                        </g>
                        <defs>
                            <clipPath id="clip0_1627_8475">
                                <rect width="16" height="16" fill="white" />
                            </clipPath>
                        </defs>
                    </svg></button>
                    <button className="social-button linkedin"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
                        <g clipPath="url(#clip0_1627_8481)">
                            <mask id="mask0_1627_8481" style={{ WebkitMask: "luminance", maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="16">
                                <rect width="14" height="16" fill="white" />
                            </mask>
                            <g mask="url(#mask0_1627_8481)">
                                <path fillRule="evenodd" clipRule="evenodd" d="M3.11111 14.375H0.217778V5.03125H3.11111V14.375ZM1.68 3.75C0.964444 3.71875 0.497778 3.25 0.497778 3.25C0.0311111 2.78125 0 2.0625 0 2.0625C0.0311111 1.09375 0.84 0.59375 0.84 0.59375C1.68 0.15625 2.52 0.59375 2.52 0.59375C3.32889 1.09375 3.36 2.0625 3.36 2.0625C3.32889 2.78125 2.86222 3.25 2.86222 3.25C2.39556 3.71875 1.68 3.75 1.68 3.75ZM11.0444 14.375H13.9378V9.25C13.9378 9.25 14 7.3125 13.3156 6.0625C13.3156 6.0625 12.6 4.84375 10.4844 4.78125C10.4844 4.78125 9.42667 4.8125 8.71111 5.28125C8.71111 5.28125 8.02667 5.71875 7.74667 6.3125H7.71556V5.03125H4.91556V14.375H7.80889V9.75C7.80889 9.75 7.77778 8.8125 8.12 8.09375C8.12 8.09375 8.46222 7.375 9.55111 7.34375C9.55111 7.34375 10.6089 7.40625 10.8578 8.1875C10.8578 8.1875 11.1067 8.96875 11.0444 9.8125V14.375Z" fill="white" />
                            </g>
                        </g>
                        <defs>
                            <clipPath id="clip0_1627_8481">
                                <rect width="14" height="16" fill="white" />
                            </clipPath>
                        </defs>
                    </svg></button>
                    <button className="social-button whatsapp1"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
                        <g clipPath="url(#clip0_1627_8490)">
                            <mask id="mask0_1627_8490" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="16">
                                <rect width="14" height="16" fill="white" />
                            </mask>
                            <g mask="url(#mask0_1627_8490)">
                                <path fillRule="evenodd" clipRule="evenodd" d="M11.9062 3.40625C9.84375 1.40625 7 1.375 7 1.375C5.0625 1.40625 3.5 2.3125 3.5 2.3125C1.9375 3.25 1 4.8125 1 4.8125C0.09375 6.375 0.0625 8.3125 0.0625 8.3125C0.0625 10.1875 0.96875 11.7812 0.96875 11.7812L0 15.375L3.6875 14.4062C5.21875 15.25 7 15.25 7 15.25C8.9375 15.2188 10.5 14.3125 10.5 14.3125C12.0938 13.375 13.0312 11.8125 13.0312 11.8125C13.9688 10.25 14 8.3125 14 8.3125C14 6.90625 13.4375 5.65625 13.4375 5.65625C12.9062 4.40625 11.9062 3.40625 11.9062 3.40625ZM7 14.0938C5.40625 14.0625 4.0625 13.2812 4.0625 13.2812L3.84375 13.1562L1.65625 13.7188L2.25 11.5938L2.125 11.375C1.25 9.96875 1.21875 8.3125 1.21875 8.3125C1.28125 5.875 2.9375 4.25 2.9375 4.25C4.5625 2.59375 7 2.5625 7 2.5625C9.375 2.5625 11.0625 4.25 11.0625 4.25C12.7812 5.9375 12.8438 8.3125 12.8438 8.3125C12.75 10.75 11.0938 12.4062 11.0938 12.4062C9.4375 14.0312 7 14.0938 7 14.0938ZM9.5625 9.46875C9.5625 9.46875 10 9.6875 10.1562 9.78125C10.1562 9.78125 10.1875 9.78125 10.25 9.8125C10.25 9.8125 10.4375 9.875 10.5 9.96875C10.5 9.96875 10.5938 10.125 10.375 10.8125C10.375 10.8125 10.25 11.125 9.875 11.3438C9.875 11.3438 9.5 11.5625 9.21875 11.625C9.21875 11.625 8.84375 11.6875 8.375 11.625C8.375 11.625 7.9375 11.5312 7.125 11.1875C7.125 11.1875 5.90625 10.5938 5.15625 9.75C5.15625 9.75 4.375 8.90625 4.21875 8.625C4.21875 8.625 4.1875 8.59375 4.1875 8.5625H4.15625C4.15625 8.5625 4.0625 8.4375 3.78125 7.9375C3.78125 7.9375 3.5 7.40625 3.46875 6.78125C3.46875 6.78125 3.5 6.1875 3.6875 5.84375C3.6875 5.84375 3.875 5.5 4.03125 5.375C4.03125 5.375 4.0625 5.34375 4.0625 5.3125C4.0625 5.3125 4.34375 5.09375 4.53125 5.125H4.875H4.90625C4.90625 5.125 5.0625 5.03125 5.25 5.40625C5.25 5.40625 5.3125 5.5625 5.4375 5.8125C5.4375 5.8125 5.5625 6.125 5.65625 6.375C5.65625 6.375 5.75 6.65625 5.78125 6.6875C5.78125 6.6875 5.875 6.84375 5.8125 7C5.8125 7 5.5625 7.4375 5.40625 7.5625C5.40625 7.5625 5.1875 7.75 5.3125 7.9375C5.3125 7.9375 5.78125 8.78125 6.34375 9.21875C6.34375 9.21875 6.90625 9.65625 7.65625 10C7.65625 10 7.90625 10.1562 8.03125 9.96875C8.03125 9.96875 8.125 9.875 8.3125 9.65625C8.3125 9.65625 8.46875 9.4375 8.59375 9.28125C8.59375 9.28125 8.75 9.0625 8.96875 9.21875C8.96875 9.21875 9.125 9.28125 9.5625 9.46875Z" fill="white" />
                            </g>
                        </g>
                        <defs>
                            <clipPath id="clip0_1627_8490">
                                <rect width="14" height="16" fill="white" />
                            </clipPath>
                        </defs>
                    </svg></button>
                    <button className="social-button mail"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <g clipPath="url(#clip0_1618_6904)">
                            <mask id="mask0_1618_6904" style={{ WebkitMask: "luminance", maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                                <rect width="16" height="16" fill="white" />
                            </mask>
                            <g mask="url(#mask0_1618_6904)">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0 12.3438V5.84375L6.8125 10.9375C6.8125 10.9375 7.34375 11.3438 8 11.3438C8 11.3438 8.65625 11.3438 9.1875 10.9375L16 5.84375V12.3438C16 12.3438 15.9688 13.1875 15.4062 13.75C15.4062 13.75 14.8438 14.3125 14 14.3438H2C2 14.3438 1.15625 14.3125 0.59375 13.75C0.59375 13.75 0.03125 13.1875 0 12.3438ZM0.4375 2.78125C0.4375 2.78125 0.875 2.375 1.5 2.34375H14.5C14.5 2.34375 15.125 2.375 15.5625 2.78125C15.5625 2.78125 15.9688 3.21875 16 3.84375C16 3.84375 15.9688 4.59375 15.4062 5.03125L8.59375 10.1562C8.59375 10.1562 8 10.5312 7.40625 10.1562L0.59375 5.03125C0.59375 5.03125 0.03125 4.59375 0 3.84375C0 3.84375 0.03125 3.21875 0.4375 2.78125Z" fill="white" />
                            </g>
                        </g>
                        <defs>
                            <clipPath id="clip0_1618_6904">
                                <rect width="16" height="16" fill="white" />
                            </clipPath>
                        </defs>
                    </svg></button>
                </div>

                {/* Profile Link & Copy Button */}
                <p className="share-heading mb-0">Profile Link</p>
                <div className="share-profile-link-container">
                    <input type="text" value="https://platform.com/profile/john-anderson" readOnly />
                    <button className="share-copy-button">Copy Link</button>
                </div>

                {/* Bottom Buttons */}
                <div className="share-modal-footer">
                    <button className="share-btn share-cancel-btn" onClick={onClose}>Cancel</button>
                    <button className="share-btn share-profile-btn">Share Profile</button>
                </div>
            </div>
        </div>
    );
};


