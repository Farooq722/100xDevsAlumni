import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { FiYoutube } from "react-icons/fi";
import { CgWebsite } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useUserData } from "@repo/zustand/user";

const SocialMedia = () => {
  const { selfData } = useUserData();

  return (
    <div className="inline-block mt-2 items-center text-center w-full sm:w-72 md:w-[320px] px-2">
      <div className="text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed text-gray-800 dark:text-gray-200 max-w-3xl mx-auto px-4 py-2 text-center antialiased">
        <div className="flex flex-wrap justify-center sm:justify-evenly items-center border-t-4 border-b-4 border-cyan-600 rounded-xl py-3 gap-3 sm:gap-5">
          <Link to={selfData?.socialMedia?.instagram ?? ""} target="_blank">
            <FaInstagram
              size={25}
              className="text-cyan-500 hover:text-cyan-700"
            />
          </Link>
          <Link to={selfData?.socialMedia?.github ?? ""} target="_blank">
            <FaGithub size={25} className="text-cyan-500 hover:text-cyan-700" />
          </Link>
          <Link to={selfData?.socialMedia?.linkedin ?? ""} target="_blank">
            <CiLinkedin
              size={25}
              className="text-cyan-500 hover:text-cyan-700"
            />
          </Link>
          <Link to={selfData?.socialMedia?.twitter ?? ""} target="_blank">
            <FaXTwitter
              size={25}
              className="text-cyan-500 hover:text-cyan-700"
            />
          </Link>
          <Link to={selfData?.socialMedia?.youtube ?? ""} target="_blank">
            <FiYoutube
              size={25}
              className="text-cyan-500 hover:text-cyan-700"
            />
          </Link>
          <Link to={selfData?.socialMedia?.portfolio ?? ""} target="_blank">
            <CgWebsite
              size={25}
              className="text-cyan-500 hover:text-cyan-700"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
