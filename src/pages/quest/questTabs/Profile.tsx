// import { useEffect, useState } from "react";
// import { Quest } from "../../../../types/quest";

import { AllQuestData } from "../../../constants/Quest/AllQuestData";
import avatar from "../../../assets/compressed/avatar1_compressed_compressed_compressed_compressed_compressed-transformed-transformed.webp";

import { AllQuestCard } from "../_components/questCard/AllQuestCard";
import { useState } from "react";

const TabButton: React.FC<{
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }> = ({ active, onClick, children }) => (
    <button
      onClick={onClick}
      className={`lg:px-4 lg:py-2 cursor-pointer fontClass text-md ${
        active 
          ? 'text-white font-semibold lg:text-xl text-xs'
          : 'text-[#8E8E93] font-medium'
      }`}
    >
      {children}
    </button>
  );
export const QuestProfile = () => {
//   const [quests, setQuests] = useState<Quest[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchQuests = async () => {
//     //   try {
//     //     const response = await fetch("/api/quests");
//         // const data = await response.json();
//         // setQuests(data);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuests();
//   }, []); // Empty dependency array ensures this runs only once on mount

//   if (loading) return <LoadingSkeleton />;
const [activeTab, setActiveTab] = useState<'all' | 'applied' | 'Favourites'>('all');


  return (
    <div className="w-full flex flex-col gap-3 fontClass">
      <div className="bg-[#323234] w-full lg:p-8 p-2 rounded-xl flex  md:gap-0 justify-between items-center">
        <div className="flex  items-center gap-3 md:gap-20">
            <img
            src={avatar}
            className="w-18 h-18 lg:w-24 lg:h-24 rounded-full object-cover"
            ></img>
            <div className="flex flex-col md:gap-2">
                <p className="text-white font-semibold text-md md:text-2xl leading-6">John_Doe</p>
                <p className="text-[#BBBBBE] font-medium text-xs md:text-xl leading-6">FlickStar Quest</p>
                <div className="flex flex-col lg:flex-row md:gap-3">
                    <p className="flex gap-2 items-center">
                    <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.70833 9.95V6.625H4.79167V7.5C4.79167 8.05417 4.96736 8.55365 5.31875 8.99844C5.67014 9.44323 6.13333 9.76042 6.70833 9.95ZM16.2917 9.95C16.8667 9.76042 17.3299 9.44323 17.6812 8.99844C18.0326 8.55365 18.2083 8.05417 18.2083 7.5V6.625H16.2917V9.95ZM10.5417 17.125V14.4125C9.75903 14.2521 9.06024 13.9495 8.44531 13.5047C7.83038 13.0599 7.37917 12.5021 7.09167 11.8313C5.89375 11.7 4.89149 11.2224 4.0849 10.3984C3.2783 9.57448 2.875 8.60833 2.875 7.5V6.625C2.875 6.14375 3.06267 5.73177 3.43802 5.38906C3.81337 5.04635 4.26458 4.875 4.79167 4.875H6.70833C6.70833 4.39375 6.89601 3.98177 7.27135 3.63906C7.6467 3.29635 8.09792 3.125 8.625 3.125H14.375C14.9021 3.125 15.3533 3.29635 15.7286 3.63906C16.104 3.98177 16.2917 4.39375 16.2917 4.875H18.2083C18.7354 4.875 19.1866 5.04635 19.562 5.38906C19.9373 5.73177 20.125 6.14375 20.125 6.625V7.5C20.125 8.60833 19.7217 9.57448 18.9151 10.3984C18.1085 11.2224 17.1062 11.7 15.9083 11.8313C15.6208 12.5021 15.1696 13.0599 14.5547 13.5047C13.9398 13.9495 13.241 14.2521 12.4583 14.4125V17.125H15.3333C15.6049 17.125 15.8325 17.2089 16.0161 17.3766C16.1998 17.5443 16.2917 17.7521 16.2917 18C16.2917 18.2479 16.1998 18.4557 16.0161 18.6234C15.8325 18.7911 15.6049 18.875 15.3333 18.875H7.66667C7.39514 18.875 7.16753 18.7911 6.98385 18.6234C6.80017 18.4557 6.70833 18.2479 6.70833 18C6.70833 17.7521 6.80017 17.5443 6.98385 17.3766C7.16753 17.2089 7.39514 17.125 7.66667 17.125H10.5417Z" fill="white"/>
                        </svg>
                    <span className="text-white font-medium text-sm md:text-lg leding-6"> 17 Completed</span>
                    </p>
                    <p className="flex gap-2 items-center">
                    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_5184_18489)">
                        <path d="M10.3263 9.99167C8.34 9.45083 7.70125 8.89167 7.70125 8.02083C7.70125 7.02167 8.585 6.325 10.0637 6.325C11.6212 6.325 12.1988 7.10417 12.2512 8.25H14.185C14.1237 6.67333 13.205 5.225 11.3762 4.7575V2.75H8.75125V4.73C7.05375 5.115 5.68875 6.27 5.68875 8.03917C5.68875 10.1567 7.36 11.2108 9.80125 11.825C11.9887 12.375 12.4262 13.1817 12.4262 14.0342C12.4262 14.6667 11.9975 15.675 10.0637 15.675C8.26125 15.675 7.5525 14.8317 7.45625 13.75H5.53125C5.63625 15.7575 7.07125 16.885 8.75125 17.2608V19.25H11.3762V17.2792C13.0825 16.94 14.4388 15.9042 14.4388 14.025C14.4388 11.4217 12.3125 10.5325 10.3263 9.99167Z" fill="white"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_5184_18489">
                        <rect width="21" height="22" fill="white"/>
                        </clipPath>
                        </defs>
                        </svg>

                    <span className="text-white font-medium text-sm md:text-lg leding-6"> Earnings : $120</span>
                    </p>
                </div>
            </div>
            
        </div>
        <div className="flex flex-col gap-2 lg:gap-3">
                <p className="text-white font-medium text-sm md:text-lg leading-6">Total Balance</p>
                <p className="text-white font-semibold text-lg md:text-3xl ">$2,280</p>
            </div>
      </div>

      <div className=" border-b-1 border-b-white/10">
      <div className="flex justify-between w-full lg:px-8">
            <div className={` ${activeTab==="all" && "border-b-2 border-b-white"} px-2 lg:px-12 items-center flex gap-2 cursor-pointer`}>
                <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.97461 3.38477C1.1543 3.38477 0.490234 2.7207 0.490234 1.90039C0.490234 1.08984 1.1543 0.425781 1.97461 0.425781C2.79492 0.425781 3.45898 1.08984 3.45898 1.90039C3.45898 2.7207 2.79492 3.38477 1.97461 3.38477ZM6.71094 2.93555C6.14453 2.93555 5.69531 2.45703 5.69531 1.90039C5.69531 1.33398 6.14453 0.875 6.71094 0.875H19.9531C20.5293 0.875 20.9785 1.33398 20.9785 1.90039C20.9785 2.4668 20.5195 2.93555 19.9531 2.93555H6.71094ZM1.97461 9.44922C1.1543 9.44922 0.490234 8.78516 0.490234 7.97461C0.490234 7.1543 1.1543 6.49023 1.97461 6.49023C2.79492 6.49023 3.45898 7.1543 3.45898 7.97461C3.45898 8.78516 2.79492 9.44922 1.97461 9.44922ZM6.71094 9C6.14453 9 5.69531 8.52148 5.69531 7.97461C5.69531 7.4082 6.14453 6.93945 6.71094 6.93945H19.9531C20.5293 6.93945 20.9785 7.39844 20.9785 7.97461C20.9785 8.53125 20.5195 9 19.9531 9H6.71094ZM1.97461 15.5234C1.1543 15.5234 0.490234 14.8496 0.490234 14.0391C0.490234 13.2188 1.1543 12.5547 1.97461 12.5547C2.79492 12.5547 3.45898 13.2188 3.45898 14.0391C3.45898 14.8496 2.79492 15.5234 1.97461 15.5234ZM6.71094 15.0742C6.14453 15.0742 5.69531 14.5957 5.69531 14.0391C5.69531 13.4727 6.14453 13.0039 6.71094 13.0039H19.9531C20.5293 13.0039 20.9785 13.4629 20.9785 14.0391C20.9785 14.5957 20.5195 15.0742 19.9531 15.0742H6.71094Z" fill="white"/>
                </svg>
                <TabButton
            active={activeTab === 'all'}
            onClick={() => setActiveTab('all')}
          >            My Quest
          </TabButton>
          </div>
          <div className={` ${activeTab==="applied" && "border-b-2 border-b-white"} px-2 lg:px-12 items-center flex gap-2 cursor-pointer`}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_2652_10618)">
                <path d="M12.2266 21.7129C12.9297 21.7129 13.4277 21.1074 13.7891 20.1699L20.1855 3.46094C20.3613 3.01172 20.459 2.61133 20.459 2.2793C20.459 1.64453 20.0684 1.25391 19.4336 1.25391C19.1016 1.25391 18.7012 1.35157 18.252 1.52735L1.45508 7.96289C0.634766 8.27539 0 8.77344 0 9.48633C0 10.3848 0.683594 10.6875 1.62109 10.9707L6.89453 12.5723C7.51953 12.7676 7.87109 12.748 8.29102 12.3574L19.0039 2.34766C19.1309 2.23047 19.2773 2.25 19.375 2.33789C19.4727 2.43555 19.4824 2.58203 19.3652 2.70899L9.39453 13.4609C9.01367 13.8613 8.98438 14.1934 9.16992 14.8476L10.7227 20.0039C11.0156 20.9902 11.3184 21.7129 12.2266 21.7129Z" fill="#8E8E93"/>
                </g>
                <defs>
                <clipPath id="clip0_2652_10618">
                <rect width="21.8262" height="21.3965" fill="white" transform="translate(0 0.316406)"/>
                </clipPath>
                </defs>
             </svg>

                <TabButton
            active={activeTab === 'applied'}
            onClick={() => setActiveTab('applied')}
          >            Applied Quest
          </TabButton>
          </div>
          <div className={` ${activeTab==="Favourites" && "border-b-2 border-b-white"} px-2 lg:px-12 items-center flex gap-2 cursor-pointer`}>
             <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3281 2.9882C8.42876 0.887048 5.25489 0.237701 2.87509 2.16173C0.495286 4.08575 0.160242 7.3026 2.02912 9.57817C3.58296 11.4701 8.28542 15.4604 9.82664 16.752C9.99901 16.8965 10.0852 16.9687 10.1858 16.9971C10.2736 17.0218 10.3696 17.0218 10.4574 16.9971C10.558 16.9687 10.6442 16.8965 10.8166 16.752C12.3579 15.4604 17.0603 11.4701 18.6141 9.57817C20.483 7.3026 20.1888 4.06551 17.7681 2.16173C15.3474 0.257941 12.2275 0.887048 10.3281 2.9882Z" fill="#8E8E93" stroke="#8E8E93" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
             </svg>

                <TabButton
            active={activeTab === 'Favourites'}
            onClick={() => setActiveTab('Favourites')}
          >           Favorites
          </TabButton>
          </div>
          </div>
      </div>
       
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4 overflow-y-auto max-h-[calc(100vh-370px)]  md:max-h-[calc(100vh-362px)]  [-ms-overflow-style:none] [scrollbar-width:none]
  [&::-webkit-scrollbar]:hidden">
        {AllQuestData.map((quest) => (
          <AllQuestCard quest={quest}/>
        ))}
      </div>
    </div>
  );
};

// const LoadingSkeleton = () => (
//   <div className="max-w-4xl mx-auto space-y-4">
//     {[...Array(3)].map((_, i) => (
//       <div key={i} className="p-4 bg-white rounded-xl animate-pulse">
//         <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
//         <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
//         <div className="h-3 bg-gray-200 rounded w-2/3"></div>
//       </div>
//     ))}
//   </div>
// );
