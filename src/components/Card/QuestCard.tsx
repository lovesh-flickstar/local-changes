interface Quest {
    title: string;
    description: string;
    image: string;
    status: string;
    amount: number;
}
export const QuestCard = ({ data }: {data : Quest}) => {
    return (
        <div className="user-profile-quest-card mb-2">
            {/* Image Section */}
            <div className="user-profile-quest-image-wrapper">
                <img src={data.image} alt="Quest" className="user-profile-quest-image" />
                {/* Top-right Icons */}
                <div className="user-profile-quest-overlay-top-right">
                    <h6 className="user-profile-quest-status">Completed</h6>
                </div>
            </div>

            {/* Title and GO Flick (Inline, No Background) */}
            <div className="user-profile-quest-title-wrapper">
                <h5 className="user-profile-quest-title mb-0">{data.title}</h5>
                <span className="user-profile-quest-go-flick text-white">{data.status}</span>
            </div>

            {/* Bottom Overlay with Description and Amount (Inline) */}
            <div className="user-profile-quest-overlay-bottom">
                <p className="user-profile-quest-description mb-0">{data.description}</p>
                <span className="user-profile-quest-amount">${data.amount}</span>
            </div>
        </div>
    );
};
