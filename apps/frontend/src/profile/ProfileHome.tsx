import { Navbar } from "../body/Navbar/Navbar";
import Profile from "./avatar/Profile";
import Bio from "./profileBio/Bio";
import SocialMedia from "./socialPresence/SocialMedia";
import TimelineData from "./timeline/TimelineData";

const ProfileHome = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-gradient-to-bl from-teal-300 to-pink-300 min-h-screen p-4 sm:p-6">
        <div className="max-w-8xl mx-auto border-2 border-t-pink-300 border-r-pink-300 border-b-teal-300 border-l-teal-300 bg-gradient-to-bl from-teal-100 to-pink-100 p-4 sm:p-6 rounded-xl shadow-lg">
          {/* 2-column layout: left column with Profile + Bio, right with TimelineData */}
          <div className="flex gap-4">
            {/* Left column */}
            <div className="w-[320px] flex flex-col gap-4">
              <Profile />
              <Bio />
              <SocialMedia />
            </div>

            {/* Right column: takes remaining space */}
            <div className="flex-1 ml-10 ">
              <TimelineData />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHome;
