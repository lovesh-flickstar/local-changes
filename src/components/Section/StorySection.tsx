import { useState, useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { MdNavigateNext, MdNavigateBefore, MdMoreVert } from "react-icons/md";
import { FaPlay, FaVolumeUp, FaEllipsisH } from "react-icons/fa";
import FlickStarLogo from "../../assets/compressed/logo1.png";
import song from "../../assets/compressed/song.png";
import { GrEmoji } from "react-icons/gr";
import { FiHeart } from "react-icons/fi";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { VscEye } from "react-icons/vsc";
import { CiPaperplane } from "react-icons/ci";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { GoSearch } from "react-icons/go";
import { ImBin } from "react-icons/im";
import { Story } from "../Card/StoryCard";

export const StoryView = ({
  stories,
  currentStoryIndex,
  onClose,
}: {
  stories: Story[];
  currentStoryIndex: number;
  onClose: () => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(currentStoryIndex);
  const [showViewers, setShowViewers] = useState(false);
  const [activeViewer, setActiveViewer] = useState<number | null>(null);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(null);
  const [replyViewer, setReplyViewer] = useState<Viewer | null>(null);

  const viewerOptionsRef = useRef<HTMLDivElement | null>(null);
  const confirmBoxRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(
    viewerOptionsRef,
    () => setActiveViewer(null),
    activeViewer !== null
  );

  useOutsideClick(
    confirmBoxRef,
    () => setConfirmAction(null),
    confirmAction !== null
  );

  const isYourStory = stories[currentIndex]?.id === 1;

  const goNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const getClassNameForStory = (index : number) => {
    const difference = index - currentIndex;
    if (difference === 0) return "scale-120 z-3 relative mx-16";
    if (Math.abs(difference) === 1) return "scale-100 z-2 opacity-90 mx-10";
    if (Math.abs(difference) === 2) return "scale-100 z-1 opacity-90 m-0";
    return "hidden-story";
  };

  interface ConfirmAction {
    action: string;
    viewer: Viewer;
  }

  interface Viewer {
    avatar: string;
    username: string;
    icon?: React.ReactElement | string;
  }

  const handleConfirm = (action: string, viewer: Viewer) => {
    setConfirmAction({ action, viewer });
  };

  const closeConfirm = () => {
    setConfirmAction(null);
  };

  const handleReply = (viewer: Viewer) => {
    setReplyViewer(viewer);
  };

  const closeReply = () => {
    setReplyViewer(null);
  };

  return (
    <div className="story-view-overlay w-f fixed inset-0 w-full h-full bg-[var(--background-color)] text-[var(--text-color)] z-[1000] flex flex-col justify-center items-center">
      <div className="story-view-header absolute top-[10px] w-full flex justify-between items-center px-[20px]">
        <div className="logo-content flex items-center mb-7">
          <img src={FlickStarLogo} alt="FlickStar Logo" className="logo w-14 h-14 mr-2" />
          <div className="content text-[var(--text-color)] text-[32px] font-normal mb-[-10px]">FlickStar</div>
        </div>

        {isYourStory && showViewers && (
          <>
            {/* Delete Icon */}
            <button
              className="story-delete-icon absolute top-[100px] left-[50px] -translate-x-1/2 bg-none border-none text-[24px] text-[var(--red-color)] cursor-pointer z-[1050]"
              onClick={() => console.log("Delete action triggered")}
            >
              <ImBin />
            </button>

            {/* Three Dots Icon */}
            <button
              className="more-options-icon absolute top-[100px] right-[20px] bg-none border-none text-[24px] text-[var(--text-color)] cursor-pointer z-[1050]"
              onClick={() => console.log("More options clicked")}
            >
              <MdMoreVert />
            </button>
          </>
        )}
        <button className="close-button bg-none border-none text-[24px] text-[var(--text-color)] cursor-pointer" onClick={onClose}>
          <RxCross2 />
        </button>
      </div>

      <div className={`story-view-content flex flex-col items-center justify-center w-full h-full ${showViewers ? "shrinked" : ""}`}>
        <div className="story-carousel flex justify-center items-center relative">
          {stories.map((story, index) => {
            const className = getClassNameForStory(index);

            if (className === "hidden-story" && !isYourStory) return null;

            if (isYourStory && story.id === 1) {
              return (
                <div key={index} className="story current-story scale-120 z-3 relative mx-16">
                  <img
                    src={story.images}
                    alt={story.name}
                    className="story-view-image w-full h-[70vh] rounded-xl blur-0"
                    onClick={() => setShowViewers(true)}
                  />
                  {!showViewers && (
                    <>
                      <div
                        className="viewers-section absolute bottom-[10px] left-[15px] right-[10px] flex flex-col items-start p-2 rounded-md text-white"
                        onClick={() => setShowViewers(true)}
                      >
                        <div className="avatars flex items-center mb-1">
                          {(story.viewers ?? []).slice(0, 3).map((viewer, idx) => (
                            <img
                              key={idx}
                              src={viewer.avatar}
                              alt={`Viewer ${idx}`}
                              className="viewer-avatar w-7 h-7 rounded-full object-cover -ml-2.5 shadow-md"
                            />
                          ))}
                        </div>
                        <p className="views-text text-[14px] text-white shadow-lg m-0 italic font-[var(--font-family-primary)]">{story.views} Views</p>
                      </div>
                      <div className="story-info absolute top-0 left-0 right-0 h-[13%] flex items-center justify-between p-2 rounded-lg box-border bg-[var(--story-view-shadow)] z-2 w-full lg:w-md md:w-full md:rounded-none">
                        <div className="progress-container absolute top-0 left-0 right-0 flex flex-row py-2.5 cursor-pointer z-10">
                          <div className="progress h-0.5 flex-grow rounded-[4px] mx-[5px] flex bg-gradient-to-r from-[rgba(255,255,255,0.5)] via-[rgba(255,255,255,0.5)] to-[rgba(88,89,104,0.5)] bg-no-repeat bg-[length:200%_100%] bg-[position:100%_50%] animate-[loader-animation_15s_linear_forwards]"></div>
                        </div>

                        <div className="avatar-section flex items-center gap-3">
                          <img
                            src={story.thumbnailImage}
                            alt={story.name}
                            className="avatar w-10 h-10 rounded-full object-cover"
                          />
                          <div className="details flex flex-col justify-center leading-6 z-3">
                            <p className="username font-medium text-sm text-white m-0 whitespace-nowrap overflow-hidden text-ellipsis">{story.username}</p>
                            <div className="story-song-info flex items-center gap-1.5 text-xs font-normal text-white">
                              <img
                                src={song}
                                alt="song-avatar"
                                className="story-song-avatar w-4 h-4 rounded-md object-cover"
                              />
                              <span>{story.song}</span>
                              <span className="story-dot text-sm text-white mx-0.5">•</span>
                              <span>Charlie Puth</span>
                            </div>
                          </div>
                        </div>

                        {/* Icons */}
                        <div className="icons flex items-center gap-4 z-3 text-white">
                          <FaPlay />
                          <FaVolumeUp />
                          <FaEllipsisH />
                          <RxCross2
                            onClick={onClose}
                            className="d-md-none fw-bold"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            }

            return (
              <div
                key={index}
                className={`story ${className}`}
                onClick={() => setCurrentIndex(index)}
              >
                <img
                  src={story.images}
                  alt={story.name}
                  className="story-view-image"
                />
                {/* need to edit here with conditional rendering of story-view-image */}

                <div
                  className={` ${
                    index === currentIndex
                      ? ""
                      : Math.abs(index - currentIndex) === 1
                      ? "story-info-nearby absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center p-2 rounded-lg text-center text-white text-sm font-medium"
                      : Math.abs(index - currentIndex) === 2
                      ? "story-info-far absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center p-1.5 rounded-lg text-center text-white text-sm font-medium"
                      : ""
                  }`}
                >
                  {index !== currentIndex && (
                    <img src={story.thumbnailImage} alt={story.name} className="avatar" />
                  )}
                  {index !== currentIndex && <p>{story.name}</p>}

                  {index === currentIndex && (
                    <>
                      <div className="story-info absolute top-0 left-0 right-0 h-[13%] flex items-center justify-between p-2 rounded-lg box-border bg-[var(--story-view-shadow)] z-10 w-full md:w-[430px] md:rounded-lg sm:w-full sm:rounded-none">
                        <div className="progress-container mt-2 mb-2">
                          <div className="progress"></div>
                        </div>

                        <div className="avatar-section mt-4">
                          <img
                            src={story.thumbnailImage}
                            alt={story.name}
                            className="avatar"
                          />
                          <div className="details">
                            <p className="username">{story.username}</p>
                            <div className="story-song-info">
                              <img
                                src={song}
                                alt="song-avatar"
                                className="story-song-avatar"
                              />
                              <span>{story.song}</span>
                              <span className="story-dot">•</span>
                              <span>Charlie Puth</span>
                            </div>
                          </div>
                        </div>

                        {/* Icons */}
                        <div className="icons mt-4">
                          <FaPlay />
                          <FaVolumeUp />
                          <FaEllipsisH />
                          <RxCross2
                            onClick={onClose}
                            className="d-md-none fw-bold"
                          />
                        </div>
                      </div>

                      {/* Reply Section */}
                      <div className="reply-section">
                        <div className="reply-input-container">
                          <input
                            type="text"
                            placeholder="Add a reply..."
                            className="reply-input"
                          />
                          <button className="emoji-button">
                            <GrEmoji className="fs-5" />
                          </button>
                          <button className="emoji-button">
                            <FiHeart className="fs-5" />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {showViewers && isYourStory && (
          <div className="viewers-container">
            <div className="d-flex align-items-center justify-content-between">
              <h6 className="d-flex align-items-center">
                <VscEye className="me-2 fs-5" /> 19
              </h6>
              <GoSearch />
            </div>

            <hr />
            <h6 className="view-heading">Viewers</h6>
            {stories[currentIndex]?.viewers?.map((viewer, idx) => (
              <div key={idx} className="viewer-row">
                <div className="viewer-avatar-container">
                  <img
                    src={viewer.avatar}
                    alt={viewer.username}
                    className="viewer-avatar"
                    onClick={() =>
                      setActiveViewer(idx === activeViewer ? null : idx)
                    }
                  />
                  {typeof viewer.icon === "string" && viewer.icon === "heart" && (
                    <span className="icon-heart">❤️</span>
                  )}
                  {typeof viewer.icon === "string" && viewer.icon === "love" && (
                    <span className="icon-love">😍</span>
                  )}
                  {typeof viewer.icon === "string" && viewer.icon === "fire" && (
                    <span className="icon-fire">🔥</span>
                  )}
                </div>
                <span
                  className="viewer-username"
                  onClick={() =>
                    setActiveViewer(idx === activeViewer ? null : idx)
                  }
                >
                  {viewer.username}
                </span>
                <IoPaperPlaneOutline
                  className="paperplane-icon fs-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReply(viewer);
                  }}
                />
                {activeViewer === idx && (
                  <div
                    className="viewer-options-card position-absolute"
                    ref={viewerOptionsRef}
                  >
                    <div
                      className="viewer-option block"
                      onClick={() => handleConfirm("Block", viewer)}
                    >
                      Block
                    </div>
                    <div
                      className="viewer-option"
                      onClick={() => handleConfirm("Remove", viewer)}
                    >
                      Remove Follower
                    </div>
                    <div className="viewer-option">View Profile</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {replyViewer && (
          <div className="storyview-reply-box">
            <button className="storyview-reply-close" onClick={closeReply}>
              <RxCross2 />
            </button>
            <img
              src={replyViewer.avatar}
              alt={replyViewer.username}
              className="storyview-reply-avatar me-2"
            />
            <span className="storyview-reply-text">
              Reply to {replyViewer.username}
            </span>
            <div className="storyview-reply-input-wrapper">
              <input
                type="text"
                className="storyview-reply-input-field"
                placeholder="Write a reply..."
              />
              <CiPaperplane className="storyview-send-reply-icon fs-2" />
            </div>
          </div>
        )}

        {confirmAction && (
          <div className="confirm-box" ref={confirmBoxRef}>
            <img
              src={confirmAction.viewer.avatar}
              alt={confirmAction.viewer.username}
              className="confirm-avatar"
            />
            <p className="confirm-text">
              Are you sure you want to {confirmAction.action}{" "}
              {confirmAction.viewer.username}?
            </p>
            <div className="confirm-buttons">
              <button
                className="confirm-button"
                onClick={() => {
                  closeConfirm();
                }}
              >
                {confirmAction.action}
              </button>
              <button className="cancel-button" onClick={closeConfirm}>
                Close
              </button>
            </div>
          </div>
        )}

        {!isYourStory && (
          <div className="story-navigation">
            {currentIndex > 0 && (
              <button
                className="story-nav-button story-left"
                onClick={goPrevious}
              >
                <MdNavigateBefore />
              </button>
            )}
            {currentIndex < stories.length - 1 && (
              <button className="story-nav-button story-right" onClick={goNext}>
                <MdNavigateNext />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
