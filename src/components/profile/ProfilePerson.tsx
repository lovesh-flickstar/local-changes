import avatar from '../../assets/compressed/logo1.png'

interface  ProfilePersonProps {
  // Define any props you need here
  photo?: string;
  name?: string;
  flickCount? :number;
  followingCount?: number;
  followerCount?: number;
  category?: string;
  description?: string;
  bioLinks : BioLinks[];
}

interface BioLinks {
  title: string;
  url: string;
}

const mockBioLinks: BioLinks[] = [
  { title: "Website", url: "https://example.com" },
  { title: "LinkedIn", url: "https://linkedin.com/in/example" },
  { title: "GitHub", url: "https://github.com/example" },
];


export const ProfilePerson = ({photo , name ,flickCount , followerCount , followingCount ,category , description } : ProfilePersonProps) => {
  return (
    <div className="flex flex-col lg:flex-row  gap-6 p-2 2xl:px-20 w-full">
      {/* Avatar - Always left aligned */}
      <img
        src={photo || avatar}
        className="w-40 h-40 flex my-auto  rounded-full object-contain mx-auto lg:mx-0"
      />

      {/* Main Content Container */}
      <div className="flex-1 w-full">
        {/* Desktop Layout */}
        <div className="hidden lg:flex flex-col gap-4">
          {/* Name Row */}
          <div className="flex justify-between items-start">
            
          </div>

          {/* Buttons + Stats Row */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-7">
            <p className="text-white/70 text-2xl">{name || 'Johnsmith_'}</p>
              <button className="py-2 px-4 bg-slate-700 text-white rounded-md text-sm">
                Edit Profile
              </button>
              <button className="py-2 px-4 bg-slate-700 text-white rounded-md text-sm">
                Share Profile
              </button>
            </div>

            {/* Desktop Stats */}
            <div className="flex gap-14">
              <div className="flex flex-col lg:flex-row lg:gap-2">
                <span className="text-white text-xl lg:text-lg">{flickCount || 120}</span>
                <span className="text-white/70 text-sm lg:text-lg ">Posts</span>
              </div>
              <div className="flex flex-col lg:flex-row lg:gap-2">
                <span className="text-white text-xl lg:text-lg">{followerCount ||  10}K</span>
                <span className="text-white/70 text-sm lg:text-lg">Followers</span>
              </div>
              <div className="flex flex-col lg:flex-row lg:gap-2">
                <span className="text-white text-xl lg:text-lg">{followingCount || 500}</span>
                <span className="text-white/70 text-sm lg:text-lg">Following</span>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="flex flex-col gap-1">
            <p className="text-white font-semibold text-lg">{name ||"John Smith"}</p>
            <p className="text-white/50 text-sm">{category || "Product/Service"}</p>
            <p className="text-white/70 text-sm">
              {description || "Your favourite fun clips 💹 In your language 💺"}
            </p>
            <p className="text-blue-500 text-sm">{mockBioLinks[0].title || "upvox.net"} + {mockBioLinks.length - 1} More</p>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col gap-3 w-full">
          {/* Mobile Name */}
          <p className="text-white/70 text-xl text-center w-full">{name || "Johnsmith_"}</p>

          {/* Mobile Stats */}
          <div className="grid grid-cols-3 gap-4 w-full">
            <div className="flex flex-col items-center">
              <span className="text-white text-xl">120</span>
              <span className="text-white/70 text-sm">Posts</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-white text-xl">10K</span>
              <span className="text-white/70 text-sm">Followers</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-white text-xl">500</span>
              <span className="text-white/70 text-sm">Following</span>
            </div>
          </div>

          {/* Bio Section */}
          <div className="flex flex-col gap-1 text-center">
            <p className="text-white font-semibold lg:block hidden">John Smith</p>
            <p className="text-white/50 text-sm">Product/Service</p>
            <p className="text-white/70 text-sm">
              Your favourite fun clips 💹 In your language 💺
            </p>
            <p className="text-blue-500 text-sm">upvox.net</p>
          </div>

          {/* Mobile Buttons */}
          <div className="flex gap-2 w-full">
            <button className="py-2 px-4 bg-slate-700 text-white rounded-md flex-1 text-sm">
              Edit Profile
            </button>
            <button className="py-2 px-4 bg-slate-700 text-white rounded-md flex-1 text-sm">
              Share Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};