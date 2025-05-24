import { useState } from "react";

const Bio = () => {
  const [bio, setBio] = useState("This is your bio.");
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

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      {isEditing ? (
        <div className="text-left">
          <textarea
            className="w-full p-2 border rounded mb-2 bg-gradient-to-bl from-emerald-100 via-cyan-100 to-blue-100 text-sm sm:text-base text-black leading-relaxed break-words"
            rows={4}
            value={tempBio}
            onChange={(e) => setTempBio(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              className="px-6 py-1 bg-gradient-to-bl from-indigo-500 via-purple-500 to-blue-500 text-white rounded hover:from-indigo-600 hover:via-purple-600 hover:to-blue-600 transition duration-300 shadow-md"
              onClick={handleSave}
              aria-label="Save bio"
            >
              Save
            </button>
            <button
              className="px-4 py-1 bg-gray-400 rounded hover:bg-gray-300 transition duration-200"
              onClick={handleCancel}
              aria-label="Cancel editing"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="inline-block text-center w-full">
          <div className=" text-sm sm:text-base md:text-lg leading-relaxed text-gray-800 dark:text-gray-200 py-2 px-4 text-left antialiased break-words rounded-md">
            <p className="w-full">{bio}</p>
          </div>

          <div className="bg-gradient-to-bl from-indigo-500 via-purple-500 to-blue-500 mt-2 py-2 font-semibold rounded-lg w-[220px] mx-auto hover:from-indigo-600 hover:via-purple-600 hover:to-blue-600 transition duration-300 shadow-md cursor-pointer">
            <button
              className="text-white text-md"
              onClick={handleEdit}
              aria-label="Edit bio"
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bio;
