import { questData } from "../../constants/QuestData"
import {EvaExternalLinkOutline} from "../icons/LinkOut"
export const TaggedQuest = () => {
  return (
    <div className="flex overflow-x-auto gap-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
         {questData.map((data, index) => (
           <div
             key={index}
             className="md:w-[calc(50%-8px)] w-full h-auto flex-shrink-0 relative overflow-y-auto rounded-lg mb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
           >
             <img
               src={data.image}
               alt={`Quest ${index + 1}`}
               className="w-full h-auto object-contain rounded-lg"
             />
             <p className="absolute top-1 right-1 text-sm py-0.5 fontSecondary font-semibold px-2 bg-[#F3E8FF] text-[#6B21A8] rounded-xl">Quest</p>
             <div className="absolute bottom-0 w-full h-30 px-3 py-3  bg-[#323234]">
               <div className="flex flex-col gap-1">
                    <p className="text-white text-lg font-bold fontPrimary">Modern Workspace Setup Guide</p>
                    <p className="text-white/60 text-md fontPrimary">Tips for creating an efficient and aesthetically pleasing 
                    workspace...</p>
                    <div className="flex text-white/60 gap-1 items-center">
                    <EvaExternalLinkOutline className="" width={20} height={20}/>
                    <p className=" text-sm fontPrimary">View Original</p>
                    </div>
                    
                    
               </div>
              </div>
            </div>
        ))}
    </div>
  )
}
