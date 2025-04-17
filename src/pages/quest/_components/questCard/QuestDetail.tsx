import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { AllQuestData } from "../../../../constants/Quest/AllQuestData";
import { GalleryViewer } from "./ImageViewerModal";
export interface Quest {
    startIndex?: number;
    onClose?: () => void;
    id: string;
    coverImage: string; // Keep this as is
    images?: string[]; // Optional additional images
    title: string;
    description: string;
    price: number;
    date: string;
    authorName: string;
    authorUsername: string;
    authorAvatar: string;
    tag: "OnFlick" | "GoFlick" | "OffFlick";
    liked: boolean;
    amount?: number;
    location?: string;
  }
const QuestDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quest, setQuest] = useState<Quest | undefined>();
  const [startQuest, setStartQuest] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setModalOpen(true);
  };
  const navigate = useNavigate();
  useEffect(() => {
    const found = AllQuestData.find((q) => q.id === id);
    setQuest(found);
  }, [id]);

  if (!quest) return <p className="text-center">Quest not found.</p>;

  return (
    <div className="p-6 fontClass flex flex-col gap-2 w-full">
        <div className="flex justify-between w-full px-6 py-4">
            <div className="flex flex-col gap-1">
                <p className="text-2xl font-semibold text-white flex gap-8 items-center">
                    <span onClick={() => navigate(-1)} className="cursor-pointer text-white/80 hover:text-white transition-colors">
                        <svg width="12" height="21" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.5 10.5391C0.5 10.2461 0.605469 9.97656 0.828125 9.76562L10.1211 0.671875C10.3203 0.472656 10.5781 0.367188 10.8828 0.367188C11.4922 0.367188 11.9609 0.824219 11.9609 1.43359C11.9609 1.72656 11.832 1.99609 11.6445 2.19531L3.11328 10.5391L11.6445 18.8828C11.832 19.082 11.9609 19.3398 11.9609 19.6445C11.9609 20.2539 11.4922 20.7109 10.8828 20.7109C10.5781 20.7109 10.3203 20.6055 10.1211 20.3945L0.828125 11.3125C0.605469 11.0898 0.5 10.832 0.5 10.5391Z" fill="white"/>
                        </svg>
                    </span>
                    {quest.title} If you send me the order details and one photo
                </p>
                <div className="pl-10">
                 <p className={`${quest.tag === "GoFlick" ? "bg-[#FF9F0A33] text-[#FF9F0A]":"bg-[#34C75933] text-[#34C759]"}  px-4 py-1 w-20 rounded-xl`}>{quest.tag}</p>
                </div>
               
                <p className="text-[#BBBBBE] font-medium text-lg leading-6 flex gap-2 items-center pl-10">
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_2656_14518)">
                    <path d="M12.5026 2.08203C8.47135 2.08203 5.21094 5.34245 5.21094 9.3737C5.21094 14.8424 12.5026 22.9154 12.5026 22.9154C12.5026 22.9154 19.7943 14.8424 19.7943 9.3737C19.7943 5.34245 16.5339 2.08203 12.5026 2.08203ZM12.5026 11.9779C11.0651 11.9779 9.89844 10.8112 9.89844 9.3737C9.89844 7.9362 11.0651 6.76953 12.5026 6.76953C13.9401 6.76953 15.1068 7.9362 15.1068 9.3737C15.1068 10.8112 13.9401 11.9779 12.5026 11.9779Z" fill="#999999"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_2656_14518">
                    <rect width="25" height="25" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>
                    {quest.location || "13 Street, South-east metro station, South Korea"}
                </p>
            </div>
            <div className="flex flex-col gap-1 ">
                <p className="text-4xl font-semibold text-white text-right">${quest.price}</p>
                <p className="text-[#BBBBBE] font-medium  2xl:text-lg">Reward amount</p>
                <button className="text-white bg-blue-600 rounded-lg px-10 py-2.5" onClick={() => setStartQuest(!startQuest)}>Start</button>
            </div>
        </div>
        {
            !startQuest && (
                <div>
      {/* Image Grid */}
            <div className="grid grid-cols-3 gap-2 max-h-[512px]">
                <div className="col-span-2">
                <img
                    src={quest.images?.[0] || ""}
                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                    onClick={() => handleImageClick(0)}
                />
                </div>
                <div className="flex flex-col gap-2">
                {quest.images?.slice(1, 3).map((img, index) => (
                    <div
                    key={index + 1}
                    className="relative w-full h-1/2 cursor-pointer"
                    onClick={() => handleImageClick(index + 1)}
                    >
                    <img
                        src={img}
                        className="w-full h-full object-cover rounded-lg"
                    />
                    {index === 1 && (quest.images ?? []).length > 3 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xl font-bold rounded-lg">
                        +{(quest.images ?? []).length - 3}
                        </div>
                    )}
                    </div>
                ))}
                </div>
            </div>

            {/* Fullscreen Modal */}
            {modalOpen && (
                <GalleryViewer
                images={quest.images || []}
                startIndex={selectedIndex}
                onClose={() => setModalOpen(false)}
                />
            )}
            </div>

            
            )
        }
    </div>
  );
};

export default QuestDetail;
