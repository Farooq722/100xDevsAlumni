import { Navbar } from "../body/Navbar/Navbar";
import Profile from "./avatar/Profile";
import Bio from "./profileBio/Bio";
import TimelineData from "./timeline/TimelineData";
import Github from "./Github";
import SocialMedia from "./settings/socialPresence/SocialMedia";

const ProfileHome = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-gradient-to-bl from-teal-300 to-pink-300 min-h-screen p-4 sm:p-6">
        <div className="max-w-8xl mx-auto border-2 border-t-pink-300 border-r-pink-300 border-b-teal-300 border-l-teal-300 bg-gradient-to-bl from-teal-100 to-pink-100 p-4 sm:p-6 rounded-xl shadow-lg">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-[320px] flex flex-col gap-2">
              <Profile />
              <Bio />
              <SocialMedia />
            </div>
            <div className="flex-1 ml-0 lg:ml-10 space-y-4">
              <TimelineData />
              <Github />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHome;
