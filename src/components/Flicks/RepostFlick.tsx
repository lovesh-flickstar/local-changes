interface RepostFlickProps {
    onCancel: () => void;
}

export const RepostFlick: React.FC<RepostFlickProps> = ({ onCancel }) => {
    return (
        <div className="flick-component" style={{ overflowY: "auto", flexGrow: 1 }}>
            <div className="flick-section-header">
                <h3>Repost Flick</h3>
                <button className="cancel-btn" onClick={onCancel}>
                    <i className="bi bi-x remove-icon"></i>
                </button>
            </div>
            <hr />
            <div className="flick-content">
                <p className="flick-text">Loved this flick?  Repost it to share on your profile.</p>
                <p className="flick-text">You can update the description below to repost with your own thoughts↓</p>
                <textarea name="" id="" rows={12}></textarea>
            </div>
            <div className="flick-button">
                <button>Repost</button>
            </div>
        </div>
    );
};

