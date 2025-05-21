import { useState } from "react";
import { CiEdit } from "react-icons/ci";

const Box = () => {
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
