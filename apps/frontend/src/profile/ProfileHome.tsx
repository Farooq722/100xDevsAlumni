import { useEffect, useState } from "react";
import { Navbar } from "../body/Navbar/Navbar";
import Profile from "./avatar/Profile";
import Bio from "./profileBio/Bio";
import Projects from "./projectsDirectory/Projects";
import SocialMedia from "./socialPresence/SocialMedia";
import TimelineData from "./timeline/TimelineData";
import axios from "axios";
import Github from "./Github";
const backendURL = import.meta.env.VITE_BACKEND_URI;

type ProjectData = {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
};

const ProfileHome = () => {
  const [data, setData] = useState<ProjectData[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get(`${backendURL}/projects/get-pro`, {
  //         withCredentials: true,
  //       });
  //       setData(res.data.allPro);
  //     } catch (error) {
  //       console.error("Failed to fetch projects", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <div>
      <Navbar />
      <div className="bg-gradient-to-bl from-teal-300 to-pink-300 min-h-screen p-4 sm:p-6">
        <div className="max-w-8xl mx-auto border-2 border-t-pink-300 border-r-pink-300 border-b-teal-300 border-l-teal-300 bg-gradient-to-bl from-teal-100 to-pink-100 p-4 sm:p-6 rounded-xl shadow-lg">
          <div className="flex gap-4">
            <div className="w-[320px] flex flex-col gap-4">
              <Profile />
              <Bio />
              <SocialMedia />
            </div>

            <div className="flex-1 ml-10 space-y-4">
              <TimelineData />
              {/* <Projects data={data} /> */}
              <Github />

              {/* <div className=" mt-4 grid grid-cols-3 gap-4 p-4">
                <Box />
                <Box />
                <Box />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHome;
