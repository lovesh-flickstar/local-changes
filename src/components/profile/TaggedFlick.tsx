import { flicks } from "../Flicks/Flicks"
import avatar from "../../assets/compressed/avatar2_compressed_compressed_compressed-transformed-transformed.webp"
export const TaggedFlick= ()=> {
  return (
    <div className=" flex flex-col gap-2 lg:gap-4">
    <p className="fontPrimary text-lg text-white">Tagged Items<span className="text-sm text-white/70 fontSecondary"> (24)</span></p>
     <div className="flex overflow-x-auto gap-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {flicks.map((flick, index) => (
                <div key={index} className="relative w-auto flex-shrink-0 h-56 ">
                <img
                    src={flick}
                    alt={`Flick ${index + 1}`}
                    className=" h-full object-contain hover:scale-110 transition-transform duration-300 rounded-xl"
                />
                <p className="absolute top-1 right-1 text-xs py-0.5 fontPrimary px-2 font-semibold bg-blue-200 text-blue-900 rounded-xl">Flick</p>
                <div className="absolute bottom-0 rounded-lg w-full px-2 pt-5 pb-1  bg-gradient-to-t from-white/10 to-[#BBBBBE]">
               <div className="flex gap-2 items-center">
                <img
                  src={avatar}
                  className="w-8 h-8 rounded-full"
                  alt="User Avatar"
                  >
                </img>
                <div className="flex flex-col">
                  <h2 className="text-white  text-sm drop-shadow-lg fontPrimary">Albert Einstein</h2>
                  <span className="text-xs text-white/70 fontPrimary">YO_albert</span>
                </div>
               </div>
              </div>
                </div>
            ))}
                
        </div>
        </div>
  )
}
