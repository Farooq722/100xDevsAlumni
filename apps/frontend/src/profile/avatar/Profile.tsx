import { useStore } from "@repo/zustand/store";
import { useUserData } from "@repo/zustand/user";
import axios from "axios";
import { useRef } from "react";
import { RingLoader } from "react-spinners";
import { toast } from "sonner";
const backendURL = import.meta.env.VITE_BACKEND_URI;

const Profile = () => {
  const { selfData, setAvatar } = useUserData();
  const { loader, setLoader } = useStore();
  const avatarRef = useRef<HTMLInputElement>(null);

  const profile = selfData?.avatar || "https://github.com/shadcn.png";

  const handleImageClick = () => {
    avatarRef.current?.click(); // this will make pop up to select avatar
  };

  const FileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setLoader(true);
      const { data } = await axios.post(`${backendURL}/avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      setLoader(false);
      if (data.success) {
        toast.success("Avatar Uploaded Successfully");
        setAvatar(data.avatar, data.avatarId);
      }
    } catch (error) {
      toast.error("Image upload failed");
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="rounded-full overflow-hidden w-32 h-32 sm:w-50 sm:h-50 md:ml-2 md:w-[300px] md:h-[300px] border-2 border-gray-900 dark:border-gray-900">
      {loader ? (
        <div className="flex items-center justify-center w-full h-full">
          <RingLoader size={25} color="purple" />
        </div>
      ) : (
        <img
          src={profile}
          onClick={handleImageClick}
          alt="User profile picture"
          className="w-full h-full object-cover cursor-pointer"
        />
      )}
      <input
        type="file"
        accept="image/*"
        ref={avatarRef}
        onChange={FileChange}
        className="hidden"
      />
    </div>
  );
};

export default Profile;
