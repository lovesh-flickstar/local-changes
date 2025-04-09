import { useState} from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"; 

const slides = [
  { id: 1, color: "bg-purple-600" },
  { id: 2, color: "bg-purple-700" },
  { id: 3, color: "bg-purple-800" },
  { id: 4, color: "bg-purple-900" },
];
const PhoneImages = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

 const renderText = () => {
   switch (current) {
    case 0:
      return <div className="flex gap-15 flex-col px-4">
        <p className="text-3xl 2xl:text-5xl ">Connecting Talent to Opportunities with FlickStar🌟</p>
        <p className="text-md 2xl:text-lg text-white/70">Discover endless opportunities on FlickStar, where talented Influencers and businesses unite. Jump right in with us!</p>
      </div>
     
    case 1:
      return <div className="flex gap-15 flex-col px-4">
      <p className="text-3xl 2xl:text-5xl "> Quests That Pay Off, Literally⚡</p>
      <p className="text-md 2xl:text-lg text-white/70">Take on exciting challenges and earn real rewards for completing them.</p>
    </div>
    case 2:
      return <div className="flex gap-15 flex-col px-4">
      <p className="text-3xl 2xl:text-5xl ">  All Eyes on You, FlickStar🌟</p>
      <p className="text-md 2xl:text-lg text-white/70">Whether you’re an artist, influencer, or explorer—this is your space to shine.</p>
    </div>
    case 3:
      return <div className="flex gap-15 flex-col px-4">
      <p className="text-3xl 2xl:text-5xl">  Flick Through Fun, Stay for the Rewards🎯</p>
      <p className="text-md 2xl:text-lg text-white/70">Unlimited scrolling meets unlimited potential. Flicks, quests, and rewards all in one place.</p>
    </div>
    default:
      return <div className="flex gap-15 flex-col px-4">
      <p className="text-3xl 2xl:text-5xl ">Connecting Talent to Opportunities with FlickStar🌟</p>
      <p className="text-md 2xl:text-lg text-white/70">Discover endless opportunities on FlickStar, where talented Influencers and businesses unite. Jump right in with us!</p>
    </div>
   }}

   const renderparatext = () => {
    switch (current) {
      case 0: return <p className="text-white text-2xl font-extralight">Upload samples of your work to impress potential clients</p>
      case 1: return <p className="text-white text-2xl font-extralight">Sign up and start your first quest today.</p>
      case 2: return <p className="text-white text-2xl font-extralight">Start sharing your work and grow your following.</p>
      case 3: return <p className="text-white text-2xl font-extralight">Engage with content and earn rewards as you scroll.</p>
      default: return <p className="text-white text-2xl font-extralight">Upload samples of your work to impress potential clients</p>
   }}

  return (
    <div className="flex flex-col">
      <div className="text-2xl hidden lg:block 2xl:text-3xl logo-font  home-content text-white">
            FlickStar
        </div>
    
    <div className="w-full h-full max-h-screen rounded-md flex flex-col justify-center items-center p-5 flex-1">
       
      <div className="relative w-3/4 2xl:min-h-96 flex bg-white/20 text-white p-4 2xl:p-10 rounded-md">
      {renderText()}
      </div>
      <div/>
  <div className="flex flex-col w-full items-center justify-center text-center mt-14 2xl:mt-26 2xl:gap-10 gap-6">
    {renderparatext()}
<div className="flex justify-between w-full 2xl:px-35">
{/* Left Arrow */}
<button
  onClick={prevSlide}
  className=" text-white cursor-pointer"
>
  <FaAngleLeft size={24} />
</button>

{/* Right Arrow */}

{/* Indicators */}
<div className="flex gap-2 items-center">
  {slides.map((_, i) => (
    <div
      key={i}
      className={`w-2.5 h-2.5 rounded-full ${
        i === current ? "bg-white" : "bg-white/40"
      } transition-all`}
    />
  ))}
</div>
<button
  onClick={nextSlide}
  className="text-white cursor-pointer"
>
  <FaAngleRight size={24} />
</button>

</div>
</div>
    </div>
    </div>
  );
};

export default PhoneImages;
