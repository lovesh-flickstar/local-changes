import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoPaperPlane } from "react-icons/io5";
import avatar3 from "../../assets/compressed/avatar3_compressed_compressed_compressed-transformed-transformed-transformed-transformed.webp";



interface Comment {
    avatar: string;
    username: string;
    time: string;
    text: string;
    liked: boolean;
    replies?: Reply[];
}

interface Reply {
    avatar: string;
    username: string;
    time: string;
    text: string;
    liked: boolean;
}
export const CommentSection = ({ comments = [], onCancel } :  {comments : Comment[] ,onCancel : ()=> void }) => {
    const [commentData, setCommentData] = useState(comments);

    const toggleHeart = (commentIndex : number, isReply: boolean = false, replyIndex:number | null = null): Promise<void> => {
        return new Promise((resolve) => {
            setCommentData((prevComments : Comment[]) =>
                prevComments.map((comment : Comment, idx : number) => {
                    if (idx === commentIndex) {
                        if (isReply && replyIndex !== null) {
                            return {
                                ...comment,
                                replies: comment?.replies?.map((reply, rIdx) =>
                                    rIdx === replyIndex ? { ...reply, liked: !reply.liked } : reply
                                ),
                            };
                        }
                        return { ...comment, liked: !comment.liked };
                    }
                    return comment;
                })
            );
            resolve();
        });
    };

    return (
        <div className="comment-section" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div className="comment-section-header">
                <h3>Comments <span>({comments.length})</span></h3>
                <button className="cancel-btn" onClick={onCancel}>
                    <i className="bi bi-x remove-icon"></i>
                </button>
            </div>
            <hr />

            <div
                className="comments-list"
                style={{
                    overflowY: "auto",
                    flexGrow: 1,
                    marginBottom: "1rem", // Adds space between comments and input
                }}
            >
                {commentData.map((comment, index) => (
                    <div key={index} className="comment-item" style={{ marginBottom: "1rem" }}>
                        <div className="comment-avatar">
                            <img src={comment.avatar} alt="User Avatar" />
                        </div>
                        <div className="comment-content">
                            <div className="comment-header">
                                <span className="username">{comment.username}</span>
                                <span className="time">{comment.time}</span>
                                <button
                                    className="like-btn"
                                    onClick={() => toggleHeart(index)}
                                >
                                    {comment.liked ? <FaHeart color="red" /> : <FaRegHeart />}
                                    <span className="like-count">20</span>
                                </button>
                            </div>
                            <p className="comment-text">{comment.text}</p>

                            <div className="comment-actions">
                                <button className="reply-btn">Reply</button>
                                {comment.replies && comment.replies.length > 0 && (
                                    <button className="view-replies-btn">
                                        View Replies ({comment.replies.length})
                                    </button>
                                )}
                            </div>
                            {comment.replies && comment.replies.length > 0 && (
                                <div className="replies-list">
                                    {comment.replies.map((reply : Reply, rIdx : number) => (
                                        <div key={rIdx} className="reply-item" style={{ marginBottom: "0.5rem" }}>
                                            <div className="reply-avatar">
                                                <img src={reply.avatar} alt="Reply Avatar" />
                                            </div>
                                            <div className="reply-content">
                                                <div className="reply-header">
                                                    <span className="username">{reply.username}</span>
                                                    <span className="time">{reply.time}</span>
                                                    <button
                                                        className="like-btn"
                                                        onClick={() => toggleHeart(index, true, rIdx)}
                                                    >
                                                        {reply.liked ? <FaHeart color="red" /> : <FaRegHeart />}
                                                        <span className="like-count">30</span>
                                                    </button>
                                                </div>
                                                <p className="reply-text mb-0">{reply.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Comment Input Section */}
            <div
                className="comment-input-section"
                style={{ position: "sticky", bottom: 0, width: "100%", }}
            >
                <div className="emoji-bar">
                    <span>😀</span>
                    <span>😂</span>
                    <span>❤️</span>
                    <span>😮</span>
                    <span>😢</span>
                    <span>👍</span>
                </div>
                <div className="comment-input-wrapper">
                    <img src={avatar3} alt="User Avatar" className="input-avatar" />
                    <input type="text" placeholder="Add a comment..." />
                    <button className="send-btn">
                        <IoPaperPlane />
                    </button>
                </div>
            </div>
        </div>
    );
};


