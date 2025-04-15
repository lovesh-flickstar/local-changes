import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import ClipLoader from "react-spinners/ClipLoader";
import avatar from "../../../../assets/compressed/profile.webp";

interface LinkField {
  id: number;
  link: string;
  title: string;
}

export const EditProfile = () => {
  const [links, setLinks] = useState<LinkField[]>([{ id: 1, link: "", title: "" }]);
  const [loading, setLoading] = useState(false);

  const addMoreLinks = () => {
    setLinks([...links, { id: links.length + 1, link: "", title: "" }]);
  };

  return (
    <div className="w-full  p-6 space-y-8 text-white">
      {/* Profile Section */}
      <div className="flex flex-col items-center gap-4">
        <img
          src={avatar}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-600"
        />
        <div className="flex gap-3">
          <label className="px-4 py-2 text-sm border border-gray-600 rounded-lg hover:border-gray-400 hover:bg-gray-800 cursor-pointer">
            Edit Photo
            <input type="file" accept="image/*" className="hidden" />
          </label>
          <button className="p-2 border border-gray-600 rounded-full text-red-400 hover:border-gray-400">
            <RiDeleteBin5Line className="text-base" />
          </button>
        </div>
      </div>

      {/* Username Section */}
      <div className="flex flex-col sm:flex-row gap-12 items-start">
        <div className="w-full sm:w-1/3">
          <p className="text-lg font-semibold">User Name</p>
          <p className="text-sm text-white/60">Set your Username</p>
        </div>
        <div className="w-full sm:flex-1 space-y-3">
          <label className="text-sm font-medium text-white/80">Username</label>
          <input
            type="text"
            placeholder="Enter your Username"
            className="w-full p-2 border border-gray-300 rounded-md text-black"
          />
          <div className="flex items-start gap-2 text-sm text-white/50">
            <div className="w-4 h-4 border-2 border-gray-400 rounded-full flex items-center justify-center text-xs">
              i
            </div>
            <p>
              Set a username that uniquely identifies you. You can change this at any time
            </p>
          </div>
        </div>
      </div>

      <hr className="border-gray-700" />

      {/* Bio Section */}
      <div className="flex flex-col sm:flex-row gap-12 items-start">
        <div className="w-full sm:w-1/3">
          <p className="text-lg font-semibold">Bio</p>
          <p className="text-sm text-white/60">Enter your bio</p>
        </div>
        <div className="w-full sm:flex-1 space-y-4">
          <label className="text-sm font-medium text-white/80">Bio</label>
          <textarea
            placeholder="Write here.."
            className="w-full h-28 p-2 border border-gray-300 rounded-md text-black resize-none"
          />

          {/* Link Fields */}
          {links.map((field) => (
            <div key={field.id} className="flex flex-col sm:flex-row gap-3 w-full">
              <div className="flex flex-col gap-1 w-full">
                <label>Add External Link</label>
              <input
                type="text"
                placeholder="Enter your link"
                className="w-full placeholder:text-white p-2 border border-gray-300 rounded-md text-sm text-black"
              />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label>Title</label>
              <input
                type="text"
                placeholder="Enter your link Title"
                className="w-full placeholder:text-white p-2 border border-gray-300 rounded-md text-sm text-black"
              />
              </div>
            </div>
          ))}

          <button
            onClick={addMoreLinks}
            className="flex items-center gap-2 text-sm hover:text-blue-400 transition-colors"
          >
            <div className="w-6 h-6 border-2 border-white flex items-center justify-center rounded-full">
              +
            </div>
            <span>Add More Links</span>
          </button>
        </div>
      </div>

      <hr className="border-gray-700" />

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        <button className="px-4 py-2 text-sm border border-gray-700 text-gray-300 rounded-lg hover:border-gray-500 hover:bg-gray-800">
          Close
        </button>
        <button
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center min-w-[120px]"
          onClick={() => setLoading(true)}
        >
          {loading ? (
            <ClipLoader
              color="#fff"
              loading={true}
              size={18}
              aria-label="Loading Spinner"
              cssOverride={{ display: "block" }}
            />
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </div>
  );
};
