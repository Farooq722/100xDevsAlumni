import { useState } from "react";
import { CiEdit } from "react-icons/ci";

const Box = () => {
  const [bio, setBio] =
    useState(` Hello there! 👋I'm B Farooq, a driven Full Stack developer hailing
          from the vibrant tech landscape of India. Currently, I'm pursuing my
          undergraduate from KLU`);
  const [isEditing, setIsEditing] = useState(false);
  const [tempBio, setTempBio] = useState(bio);

  const handleEdit = () => {
    setTempBio(bio);
    setIsEditing(true);
  };

  const handleSave = () => {
    setBio(tempBio);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };
  // console.log("self data ", selfData?.bio)
  // console.log("setr self data ", setSelfData)

  return (
    <div className="bg-white p-2 rounded shadow text-center text-base">
      <div className="flex justify-end items-end">
        {!isEditing && (
          <CiEdit
            className="text-violet-400 hover:text-violet-700 cursor-pointer"
            size={20}
            onClick={handleEdit}
            title="Edit Bio"
          />
        )}
      </div>

      {isEditing ? (
        <div className="text-left">
          <textarea
            className="w-full p-2 border rounded mb-2 bg-gradient-to-bl from-emerald-100 via-cyan-100 to-blue-100 text-black"
            rows={4}
            value={tempBio}
            onChange={(e) => setTempBio(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              className="px-6 py-1 bg-gradient-to-bl from-indigo-500 via-purple-500 to-blue-500 text-white rounded hover:from-indigo-600 hover:via-purple-600 hover:to-blue-600 
                   transition duration-300 shadow-md cursor-pointer"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="px-4 py-1 bg-gray-400 rounded hover:bg-gray-300"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h3 className="text-3xl text-black font-semibold mb-1">
            Hi, 👋 {bio}
          </h3>
        </div>
      )}
    </div>
  );
};

export default Box;

/**
 *
 
<div className="inline-block mt-6 text-center sm:w-50 md:w-[320px]">
      <div className="border border-red-300 text-[14px] sm:text-[16px] md:text-[18px] leading-relaxed text-gray-800 dark:text-gray-200 max-w-3xl mx-auto py-2 px-4 text-left antialiased break-words">
        <p className="w-full">
          Hello there! 👋I'm B Farooq, a driven Full Stack developer hailing
          from the vibrant tech landscape of India. Currently, I'm pursuing my
          undergraduate from KLU
        </p>
      </div>

      <div className="bg-gradient-to-bl from-indigo-500 via-purple-500 to-blue-500 mt-2 py-2 font-semibold rounded-lg md:w-[220px] mx-auto hover:from-indigo-600 hover:via-purple-600 hover:to-blue-600 transition duration-300 shadow-md cursor-pointer">
        <button className="text-white text-md">Edit</button>
      </div>
    </div>
  );
 */
