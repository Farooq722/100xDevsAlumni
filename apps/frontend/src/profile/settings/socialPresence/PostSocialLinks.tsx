import axios from "axios";
import { Input } from "@repo/ui/uicomponents/input";
import { useState } from "react";
import { toast } from "sonner";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { FiYoutube } from "react-icons/fi";
import { TbWorldWww } from "react-icons/tb";
import { RingLoader } from "react-spinners";
const backendURL = import.meta.env.VITE_BACKEND_URI;

const PostSocialLinks = () => {
  const [loader, setLoader] = useState(false);

  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");
  const [portfolio, setPortfolio] = useState("");

  const handleSave = async () => {
    try {
      setLoader(true);
      const { data } = await axios.post(
        `${backendURL}/accounts/`,
        {
          linkedin,
          github,
          twitter,
          instagram,
          youtube,
          portfolio,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      if (data.success) {
        toast.success("Social links Created");
        setLinkedin("");
        setGithub("");
        setTwitter("");
        setInstagram("");
        setYoutube("");
        setPortfolio("");
      } else {
        toast.error("failed");
      }
    } catch (error) {
      toast.error("Failed to Create links");
      console.error("Create error:", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      <div className="max-w-lg mx-auto p-6 bg-gradient-to-bl from-teal-200 to-fuchsia-300 rounded-xl shadow-md  mt-10">
        <h2 className="text-xl font-base mb-4 text-center">
          Post Social Links
        </h2>

        <div className="space-y-4">
          <div className="flex justify-start items-center gap-4 ">
            <CiLinkedin size={30} className="text-pink-900" />
            <Input
              type="text"
              placeholder="LinkedIn URL"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="w-96 p-2 border rounded"
            />
          </div>

          <div className="flex justify-start items-center gap-4">
            <FaGithub size={30} className="text-pink-900" />
            <Input
              type="text"
              placeholder="GitHub URL"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              className="w-96 p-2 border rounded"
            />
          </div>

          <div className="flex justify-start items-center gap-4">
            <FaXTwitter size={30} className="text-pink-900" />
            <Input
              type="text"
              placeholder="Twitter URL"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              className="w-96 p-2 border rounded"
            />
          </div>
          <div className="flex justify-start items-center gap-4">
            <FaInstagram size={30} className="text-pink-900" />
            <Input
              type="text"
              placeholder="Instagram URL"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="w-96 p-2 border rounded"
            />
          </div>
          <div className="flex justify-start items-center gap-4">
            <FiYoutube size={30} className="text-pink-900" />
            <Input
              type="text"
              placeholder="Youtube URL"
              value={youtube}
              onChange={(e) => setYoutube(e.target.value)}
              className="w-96 p-2 border rounded"
            />
          </div>
          <div className="flex justify-start items-center gap-4">
            <TbWorldWww size={30} className="text-pink-900" />
            <Input
              type="text"
              placeholder="Portfolio URL"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              className="w-96 p-2 border rounded"
            />
          </div>

          {loader ? (
            <div className="flex items-center justify-center w-full h-full">
              <RingLoader size={30} color="purple" />
            </div>
          ) : (
            <button
              onClick={handleSave}
              className="w-full bg-gradient-to-bl from-indigo-500 via-purple-500 to-blue-500 hover:bg-gradient-to-bl hover:from-indigo-600 hover:via-purple-600 hover:to-blue-600 text-white text-lg py-2 rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostSocialLinks;
