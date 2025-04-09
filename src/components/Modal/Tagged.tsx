import  { useRef, useState, useEffect } from "react";
import avatar1 from "../../assets/compressed/avatar2_compressed_compressed_compressed-transformed-transformed.webp";
import { FaArrowRight } from "react-icons/fa6";
import { flicks, quests } from "../../constants/TaggedData";



import { Link } from "react-router-dom";





export const Tagged = () => {
    const flicksRef = useRef<HTMLDivElement | null>(null);
    const questsRef = useRef<HTMLDivElement | null>(null);
    const [showFlicksArrow, setShowFlicksArrow] = useState(true);
    const [showQuestsArrow, setShowQuestsArrow] = useState(true);


    const checkScroll = (ref: any, setShowArrow : any) => {
        if (ref.current) {
            setShowArrow(ref.current.scrollLeft + ref.current.clientWidth < ref.current.scrollWidth);
        }
    };

    useEffect(() => {
        const flicksElement = flicksRef.current;
        const questsElement = questsRef.current;

        if (flicksElement) {
            flicksElement.addEventListener("scroll", () => checkScroll(flicksRef, setShowFlicksArrow));
            checkScroll(flicksRef, setShowFlicksArrow);
        }

        if (questsElement) {
            questsElement.addEventListener("scroll", () => checkScroll(questsRef, setShowQuestsArrow));
            checkScroll(questsRef, setShowQuestsArrow);
        }

        return () => {
            if (flicksElement) flicksElement.removeEventListener("scroll", () => checkScroll(flicksRef, setShowFlicksArrow));
            if (questsElement) questsElement.removeEventListener("scroll", () => checkScroll(questsRef, setShowQuestsArrow));
        };
    }, []);

    const scrollRight = (ref: any, setShowArrow : any) => {
        if (ref.current) {
            ref.current.scrollBy({ left: 400, behavior: "smooth" });
            setTimeout(() => checkScroll(ref, setShowArrow), 300);
        }
    };

    return (
        <div className="tagged-section">
            <div className="tagged-header">
                <h2 className="tagged-title mb-0">Tagged Items</h2>
                <span className="tagged-count">(24)</span>
            </div>

            {/* Flicks Section */}
            <div className="tagged-flicks-container">
                <div className="tagged-flicks-scroll" ref={flicksRef}>
                    {flicks.map((flick) => (
                        <div key={flick.id} className="tagged-flick-card col-2">
                            <img src={flick.image} alt="Flick Post" className="tagged-flick-image" />
                            <span className="tagged-flick-label">Flick</span>
                            <div className="tagged-flick-info">
                                <img src={avatar1} alt="user avatar" className="tagged-avatar-icon" />
                                <div>
                                    <p className="tagged-user-name mb-0">{flick.user}</p>
                                    <p className="tagged-user-handle mb-0">{flick.username}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {showFlicksArrow && (
                    <button className="scroll-btn right text-white" onClick={() => scrollRight(flicksRef, setShowFlicksArrow)}>
                        <FaArrowRight />
                    </button>
                )}
            </div>

            {/* Quests Section */}
            <div className="tagged-quests-container">
                <div className="tagged-quests-scroll" ref={questsRef}>
                    {quests.map((quest) => (
                        <div key={quest.id} className="tagged-quest-card col-6 landscape">
                            <img src={quest.image} alt="Quest Post" className="tagged-quest-image landscape" />
                            <span className="tagged-quest-label">Quest</span>
                            <div className="tagged-quest-info">
                                <p className="tagged-quest-title mb-0">{quest.title}</p>
                                <p className="tagged-quest-description mb-0">{quest.description}</p>
                                <Link to="/" className="tagged-quest-link"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M0.539062 1.28906C0.539062 1.28906 1.07812 0.773438 1.875 0.75H4.5C4.5 0.75 4.82812 0.75 5.03906 0.960938C5.03906 0.960938 5.25 1.17188 5.25 1.5C5.25 1.5 5.25 1.82812 5.03906 2.03906C5.03906 2.03906 4.82812 2.25 4.5 2.25H1.875C1.875 2.25 1.52344 2.27344 1.5 2.625V10.125C1.5 10.125 1.52344 10.4766 1.875 10.5H9.375C9.375 10.5 9.72656 10.4766 9.75 10.125V7.5C9.75 7.5 9.75 7.17188 9.96094 6.96094C9.96094 6.96094 10.1719 6.75 10.5 6.75C10.5 6.75 10.8281 6.75 11.0391 6.96094C11.0391 6.96094 11.25 7.17188 11.25 7.5V10.125C11.25 10.125 11.2266 10.9219 10.7109 11.4609C10.7109 11.4609 10.1719 11.9766 9.375 12H1.875C1.875 12 1.07812 11.9766 0.539062 11.4609C0.539062 11.4609 0.0234375 10.9219 0 10.125V2.625C0 2.625 0.0234375 1.82812 0.539062 1.28906ZM7.54688 0.46875C7.54688 0.46875 7.75781 0.0234375 8.25 0H11.25C11.25 0 11.5781 0 11.7891 0.210938C11.7891 0.210938 12 0.421875 12 0.75V3.75C12 3.75 11.9766 4.24219 11.5312 4.45312C11.5312 4.45312 11.0859 4.61719 10.7109 4.28906L9.75 3.30469L5.78906 7.28906C5.78906 7.28906 5.55469 7.5 5.25 7.5C5.25 7.5 4.94531 7.5 4.71094 7.28906C4.71094 7.28906 4.5 7.05469 4.5 6.75C4.5 6.75 4.5 6.44531 4.71094 6.21094L8.69531 2.25L7.71094 1.28906C7.71094 1.28906 7.38281 0.914062 7.54688 0.46875Z" fill="currentColor" />
                                </svg><span className="mx-2">View Original</span></Link>
                            </div>
                        </div>
                    ))}
                </div>
                {showQuestsArrow && (
                    <button className="scroll-btn right text-white" onClick={() => scrollRight(questsRef, setShowQuestsArrow)}>
                        <FaArrowRight />
                    </button>
                )}
            </div>
        </div>
    );
};


