import { FaHeart, FaRegHeart,} from "react-icons/fa";
import { Quest } from "../../../../types/quest";
import { useNavigate } from "react-router-dom";
import avatar from '../../../../assets/compressed/avatar1_compressed_compressed_compressed_compressed_compressed-transformed-transformed.webp'



interface Props {
  quest: Quest;
}


export const AllQuestCard: React.FC<Props> = ({ quest }) => {
  const navigate = useNavigate();
  const date = new Date(quest.createdAt);
  console.log(quest);

const formattedDate = date.toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

  const handleClick = () => {
    navigate(`/quests/${quest._id}`);
  };
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg bg-black/80 text-white w-full"
    onClick={handleClick}>
      <img
        src={quest.thumbnailURLs?.[0] ?? ""}
        alt={quest.title}
        className="w-full h-56 object-cover"
      />

      {/* Top Info */}
      <div className="fontClass absolute top-0 left-0 w-full p-3 flex justify-between items-start">
        <div className="flex items-center gap-2">
          <img
            src={quest.user.photo || avatar}
            alt={quest.user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-semibold">{quest.user.name}</p>
            <p className="text-md font-medium text-[#EFEFF0]">@{quest.user.username}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-lg">
            <div className="p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-gray-700/50 transition-colors">
          {quest.liked ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-white/80" />
          )}
          </div>
          <div className="p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-gray-700/50 transition-colors">
          <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 6.34281V2L21 9.59992L13 17.1998V12.857C13 12.857 1 11.8462 1 18C1 5.69139 13 6.34281 13 6.34281Z" stroke="white" strokeWidth="1.2" strokeMiterlimit="10"/>
</svg>
</div>

        </div>
      </div>

      {/* Content */}
      <div className="fontClass absolute bottom-0 left-0 w-full">
        <h3 className="font-semibold text-lg p-3">{quest.title}</h3>
        <div className=" p-3 bg-[#5252544d] backdrop-blur-2xl">
            <div className="flex justify-between">
        <p className=" text-[#E2E2E3] line-clamp-2">
          {quest.description}
        </p>
        <p className="font-semibold text-2xl text-white text-right">${quest.totalAmount}</p>
        </div>
        <div className="flex justify-between items-center mt-2 lg:mt-3">
          {/* Tag */}
          <span
            className={`px-2 py-1 text-md rounded-xl font-medium ${
              quest.mode === "OnFlick"
                ? "bg-[#34C759]"
                : quest.mode === "GoFlick"
                ? "bg-yellow-500"
                : "bg-gray-600"
            }`}
          >
            {quest.mode}
          </span>

          {/* Price and Date */}
          <div className="text-right">
            
            <p className="text-xs font-medium text-white">{formattedDate}</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

