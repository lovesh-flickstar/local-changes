import {  useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { constant } from "../../../../constants/constant";
import avatar from '../../../../assets/compressed/avatar1_compressed_compressed_compressed_compressed_compressed-transformed-transformed.webp'
import { GalleryViewer } from "./ImageViewerModal";
import quest1 from '../../../../assets/compressed/quest1.webp'
import { LoadingSkeleton } from "../../questTabs/AllQuests";
import useFetchWithToken from "../../../../hooks/useQuest";
import { Quest } from "../../../../types/quest";

type QuestDetailsApiResponse = {
  data: {
    questdetails: Quest;
  };
};

const QuestDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [startQuest, setStartQuest] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setModalOpen(true);
  };


  const { data: quest, isError, isLoading } = useFetchWithToken<Quest>(
    `${constant.BASE_URL}/v1/quest/${id}`,
    {
      selector: (res) => (res as QuestDetailsApiResponse).data.questdetails,
    }
  );
  console.log(quest, "questdetailPage")
  if (isError) return <p>Failed to load quests</p>;

  if (isLoading) return <LoadingSkeleton />;


  return (
    <div className="p-6 fontClass flex flex-col gap-4 w-full h-full overflow-y-auto  [-ms-overflow-style:none] [scrollbar-width:none]
  [&::-webkit-scrollbar]:hidden py-10 md:py-0">
      <div className="flex justify-between w-full px-6 py-4">
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-semibold text-white flex gap-8 items-center">
            <span
              onClick={() => navigate(-1)}
              className="cursor-pointer text-white/80 hover:text-white transition-colors"
            >
              <svg
                width="12"
                height="21"
                viewBox="0 0 12 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.5 10.5391C0.5 10.2461 0.605469 9.97656 0.828125 9.76562L10.1211 0.671875C10.3203 0.472656 10.5781 0.367188 10.8828 0.367188C11.4922 0.367188 11.9609 0.824219 11.9609 1.43359C11.9609 1.72656 11.832 1.99609 11.6445 2.19531L3.11328 10.5391L11.6445 18.8828C11.832 19.082 11.9609 19.3398 11.9609 19.6445C11.9609 20.2539 11.4922 20.7109 10.8828 20.7109C10.5781 20.7109 10.3203 20.6055 10.1211 20.3945L0.828125 11.3125C0.605469 11.0898 0.5 10.832 0.5 10.5391Z"
                  fill="white"
                />
              </svg>
            </span>
            {quest?.title} 
          </p>
          <div className="pl-10">
            <p
              className={`${
                quest?.mode === "GoFlick"
                  ? "bg-[#FF9F0A33] text-[#FF9F0A]"
                  : "bg-[#34C75933] text-[#34C759]"
              }  px-4 py-1 w-20 rounded-xl`}
            >
              {quest?.mode}
            </p>
          </div>

          <p className="text-[#BBBBBE] font-medium 2xl:text-lg leading-6 flex gap-2 items-center pl-10">
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_2656_14518)">
                <path
                  d="M12.5026 2.08203C8.47135 2.08203 5.21094 5.34245 5.21094 9.3737C5.21094 14.8424 12.5026 22.9154 12.5026 22.9154C12.5026 22.9154 19.7943 14.8424 19.7943 9.3737C19.7943 5.34245 16.5339 2.08203 12.5026 2.08203ZM12.5026 11.9779C11.0651 11.9779 9.89844 10.8112 9.89844 9.3737C9.89844 7.9362 11.0651 6.76953 12.5026 6.76953C13.9401 6.76953 15.1068 7.9362 15.1068 9.3737C15.1068 10.8112 13.9401 11.9779 12.5026 11.9779Z"
                  fill="#999999"
                />
              </g>
              <defs>
                <clipPath id="clip0_2656_14518">
                  <rect width="25" height="25" fill="white" />
                </clipPath>
              </defs>
            </svg>
            {quest?.location ||
              "13 Street, South-east metro station, South Korea"}
          </p>
        </div>
        <div className="flex flex-col gap-1 ">
          <p className="text-4xl font-semibold text-white text-right">
            ${quest?.totalAmount}
          </p>
          <p className="text-[#BBBBBE] font-medium  2xl:text-lg">
            Reward amount
          </p>
          {!startQuest && (
            <button
            className="text-white bg-blue-600 rounded-lg px-10 py-1 cursor-pointer hover:bg-blue-700 transition-colors"
            onClick={() => setStartQuest(!startQuest)}
          >
            Start
          </button>
          )}
        </div>
      </div>

      {!startQuest ? (
        <div className="lg:pr-6 lg:pl-14 px-6 flex flex-col gap-4">
          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
  <div className="md:col-span-2 w-full">
    <img
      src={quest?.media?.[0]?.thumbnailURL || quest1}
      alt={quest?.media?.[0]?.alt[0] || "Quest Thumbnail"}
      className="w-full h-60 object-cover rounded-lg cursor-pointer"
      onClick={() => handleImageClick(0)}
    />
  </div>
  <div className="flex flex-col gap-2">
    {quest?.media?.slice(1).map((img, index) => (
      <div
        key={index + 1}
        className="relative w-full cursor-pointer"
        onClick={() => handleImageClick(index + 1)}
      >
        <img
          src={img.thumbnailURL || quest1}
          className="w-full h-28 object-cover rounded-lg"
        />
        {index === 1 && (quest.media ?? []).length > 3 && (
          <div className="absolute inset-0 bg-black/70  flex items-center justify-center text-white text-xl font-bold rounded-lg">
            +{(quest.media ?? []).length - 3}
          </div>
        )}
      </div>
    ))}
  </div>
</div>


          {/* Fullscreen Modal */}
          {modalOpen && (
            <GalleryViewer
              images={quest?.media?.map((media) => media.url) || []}
              startIndex={selectedIndex}
              onClose={() => setModalOpen(false)}
            />
          )}
          
          <div className="flex justify-between w-full flex-wrap">
          <div className="flex gap-3">
            <img
              src={quest?.user.photo || avatar}
              className="w-10 h-10 my-auto rounded-full object-cover"
            />
            <div className="flex flex-col">
              <p className="text-white font-semibold text-lg">
                {quest?.user.name}
              </p>
              <p className="text-[#BBBBBE] font-medium">
                {quest?.user.username}
              </p>
            </div>
          </div>
          <p className="text-[#8E8E93] font-normal my-auto">Last updated 3 days ago</p>
        </div>
            <div className="text-white  rounded-xl">
              <h2 className="text-2xl font-semibold ">
                Description
              </h2>
              <p className="font-medium leading-relaxed whitespace-pre-line">
                {quest?.description}
                A café is more than just a place to grab a cup of coffee; it is a space that blends comfort, culture, and conversation. Whether it’s a small, cozy corner shop or a modern, vibrant café bustling with energy, these spaces serve as a hub for people to relax, work, or socialize. The aroma of freshly brewed coffee, the soothing hum of conversations, and the inviting atmosphere create an experience that extends beyond just a beverage. Many cafés focus on crafting unique ambiances, from rustic wooden interiors and warm lighting to minimalist, contemporary designs. The choice of seating, music, and even the type of cups used contributes to the overall experience, making each café distinct in its charm and appeal. In urban settings, cafés often double as co-working spaces, offering free Wi-Fi and comfortable seating arrangements for freelancers, students, and professionals looking for a change of scenery.
              </p>
            </div>
        </div>
        
      ):(
        <div className=" w-3xl mx-auto flex flex-col  gap-2.5 text-white py-2">
          <div className='flex flex-col gap-3 w-full'>
              <label className='font-semibold text-lg'>Description</label>
              <textarea
                className='p-3 h-44 outline-none w-full border placeholder:text-[#E2E2E3] border-[#A8A8AC] rounded-lg'
                placeholder='Provide brief information about your quest.'
              />
            </div>
               <div className='flex flex-col gap-3 w-full'>
              <label className='font-semibold text-lg'>Upload Media</label>
              <div className='relative'>
                <input
                type='file'
                className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                />
                <div className='p-3 h-44 outline-none w-full border-2 border-dashed placeholder:text-[#E2E2E3] border-[#A8A8AC] rounded-lg flex items-center flex-col justify-center'>
                <svg width="73" height="59" viewBox="0 0 73 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.5 33.0544C0.5 39.9242 6.00374 45.4725 15.2613 45.4725H57.5977C66.2625 45.4725 71.4558 40.5846 71.4558 34.1905C71.4558 28.8534 68.0405 24.4672 62.5367 22.3799C62.5934 10.5958 53.5333 2.08789 41.9897 2.08789C34.3409 2.08789 28.8936 5.91907 25.5067 10.5429C19.0998 8.93116 10.9994 13.5814 10.8583 21.006C4.47961 21.9307 0.5 26.8188 0.5 33.0544ZM36.1189 59.0006C34.9054 59.0006 33.8611 58.0758 33.8611 56.9662V31.2313L34.0305 27.2944L32.4499 28.8534L28.0751 33.2129C27.68 33.6355 27.0872 33.8471 26.5228 33.8471C25.3373 33.8471 24.4906 33.0544 24.4906 31.9976C24.4906 31.4161 24.7446 30.9935 25.168 30.5971L34.4819 22.1949C35.0464 21.6665 35.5262 21.508 36.1189 21.508C36.6834 21.508 37.1632 21.6665 37.7279 22.1949L47.0417 30.5971C47.4651 30.9935 47.7192 31.4161 47.7192 31.9976C47.7192 33.0544 46.816 33.8471 45.6588 33.8471C45.0943 33.8471 44.5299 33.6355 44.1065 33.2129L39.76 28.8534L38.1793 27.2944L38.3487 31.2313V56.9662C38.3487 58.0758 37.3325 59.0006 36.1189 59.0006Z" fill="#007AFF"/>
                </svg>
                <p className='font-semibold text-lg'>Upload Files<span className='text-[#BBBBBE] text-md font-medium'>or drag and drop</span></p>
                <p className='font-medium text-sm text-[#BBBBBE]'>PNG,JPG up to 100MB</p>
                </div>
              </div>
            </div>
            <div className='flex gap-5 items-end justify-end mt-4'>
            <button className='px-6 cursor-pointer py-2 border border-[#A8A8AC] rounded-lg text-[#68686B] font-semibold text-md'>Cancel</button>
            <button className='px-6 cursor-pointer py-2 bg-blue-600 rounded-lg font-semibold text-md text-white'>Start Quest</button>
          </div>
        </div>
      )
      }
        
    </div>
  );
};

export default QuestDetail;
