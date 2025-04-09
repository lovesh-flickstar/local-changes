import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import ClipLoader from "react-spinners/ClipLoader";

interface LinkField {
    id: number;
    link: string;
    title: string;
  }

export const EditProfile = () => {
    const [links, setLinks] = useState<LinkField[]>([{ id: 1, link: '', title: '' }]);

    const addMoreLinks = () => {
      setLinks([...links, { id: links.length + 1, link: '', title: '' }]);
    };
  return (
    <div className="w-full mx-auto p-4 space-y-6 prose">
      <div className="flex flex-col items-center gap-2">
        <div className="relative inline-block">
          <img
            src={"https://via.placeholder.com/150"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-700"
          />

          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
            <ClipLoader
              color="#00c3ff"
              loading={true}
              size={70}
              aria-label="Loading Spinner"
              cssOverride={{
                display: "block",
                margin: "0 auto",
              }}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <label className="px-4 py-2 text-sm text-white border border-gray-700 rounded-lg hover:border-gray-500 hover:bg-gray-800 disabled:opacity-50 cursor-pointer">
            Edit Photo
            <input type="file" accept="image/*" className="hidden" />
          </label>
          <button className="p-2 border border-gray-700 rounded-full text-red-400 hover:border-gray-500 disabled:opacity-50">
            <RiDeleteBin5Line className="text-base" />
          </button>
        </div>
      </div>
      {/* User Name Section */}
      <div className="flex flex-col gap-4 w-full ">
        <div className="flex  w-full gap-12 items-center">
          <div className="flex flex-col min-w-xs">
            <p className="text-xl text-white">Username</p>
            <p className="text-md text-white/60">Set your UserName</p>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label className="text-sm text-white/70 font-semibold">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-2 border rounded-md border-gray-300"
            />
            <div className="flex gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-400">i</span>
              </div>
              <p className="text-sm text-white/40">
                Set a username that uniquely identifies you. You can change this
                at any time
              </p>
            </div>
          </div>
        </div>
        <hr className="border-t border-gray-700" />
        <div className="flex  w-full gap-12 items-center">
          <div className="flex flex-col min-w-xs">
            <p className="text-xl text-white">Bio</p>
            <p className="text-md text-white/60">Enter your Bio</p>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label className="text-sm text-white/70 font-semibold">Bio</label>
            <textarea
              placeholder="Enter your bio"
              className="w-full p-2 border h-28 rounded-md border-gray-300"
            />
             <div className="space-y-4">
      
      {links.map((field) => (
        <div key={field.id} className="flex justify-between gap-3">
          <input
            type="text"
            placeholder="Enter your link"
            className="w-full p-2 border rounded-md outline-none border-gray-300 text-sm"
          />
          <input
            type="text"
            placeholder="Enter your link Title"
            className="w-full p-2 border rounded-md outline-none border-gray-300 text-sm"
          />
        </div>
      ))}

      <button
        onClick={addMoreLinks}
        className="flex items-center gap-2  cursor-pointer transition-colors"
      >
        <div className="w-6 h-6 rounded-full text-center border-2  flex items-center justify-center">
          <span className="text-md pb-1">+</span>
        </div>
        <span className="text-sm">Add More Links</span>
      </button>
    </div>
          </div>
        </div>
        <hr className="border-t border-gray-700" />
        <div className="flex justify-end gap-2">
        <button className="px-4 py-2 text-sm text-gray-300 border border-gray-700 rounded-lg hover:border-gray-500 hover:bg-gray-800">
          Close
        </button>
        <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700" type="submit">
          
            <ClipLoader
              color="#00c3ff"
              loading={true}
              size={20}
              aria-label="Loading Spinner"
              cssOverride={{
                display: "block",
                margin: "0 auto",
              }}
            />
          
        
        </button>
      </div>
      </div>
    </div>
  );
};
