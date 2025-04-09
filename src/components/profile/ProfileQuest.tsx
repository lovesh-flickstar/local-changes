import { questData } from "../../constants/QuestData";

export const ProfileQuest = () => {
  return (
    <div className="grid grid-cols-1 w-full">
      {questData.map((data, index) => (
        <div
          key={index}
          className="w-full relative h-auto overflow-y-auto rounded-lg mb-2"
        >
          <img
            src={data.image}
            alt={`Quest ${index + 1}`}
            className="w-full h-55 object-cover rounded-lg"
          />
          <p className="absolute top-3 right-3 flex gap-2 text-white">Completed</p>
          <div className="absolute bottom-[30%] left-0 w-full px-4 flex justify-between items-center">
            <h2 className="text-white font-bold text-lg drop-shadow-lg">
              {data.title}
            </h2>
            <span className=" text-white px-3 py-1 rounded-full text-sm font-medium">
              {data.status}
            </span>
          </div>
          <div className="absolute bottom-0 w-full px-4 py-3 bg-gradient-to-t from-black/60 to-transparent">
            <div className="flex justify-between items-center">
              <p className="text-white/90 text-sm line-clamp-2 pr-2">
                {data.description}
              </p>
              <span className="text-2xl font-bold text-white shrink-0">
                ${data.amount}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
