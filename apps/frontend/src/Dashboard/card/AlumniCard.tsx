import { BackgroundGradient } from "@repo/ui/uicomponents/background-gradient";
import { Link, useNavigate } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";

interface Education {
  id: string;
  college: string;
  department: string;
  passingYear: number;
  degree: string;
}

interface ProfessionalData {
  id: string;
  currentCompany: string;
  jobTitle: string;
  location: string;
  yearsOfExperience: number;
  resumeUrl?: string;
}

interface SocialMedia {
  id: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  instagram?: string;
  [key: string]: string | undefined;
}

interface Project {
  id: string;
  title: string;
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  techStack?: string[];
}

interface User {
  id: string;
  avatar?: string | null;
  avatarId?: string | null;
  name: string;
  username: string;
  bio?: string;
  role: "Alumni" | "User" | string;
  education?: Education;
  professionalData?: ProfessionalData;
  socialMedia?: SocialMedia | null;
  projects?: Project[];
  skills?: string[];
}

export default function AlumniCard({ user }: { user: User }) {
  const profilePhoto = user.avatar;
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center p-4">
      <BackgroundGradient className="rounded-2xl w-64 h-[370px] sm:w-72 sm:h-[430px] overflow-hidden dark:bg-zinc-900 shadow-md">
        <img
          src={profilePhoto || "https://github.com/shadcn.png"}
          onError={(e) => {
            e.currentTarget.src = "https://github.com/shadcn.png";
          }}
          alt="Profile Pic"
          className="object-cover w-24 h-24 sm:w-28 sm:h-28 rounded-full mx-auto border-4 border-gray-200 dark:border-zinc-700 mt-2"
        />

        <p className="text-base sm:text-lg font-semibold text-center text-black mt-4 dark:text-neutral-200">
          {user?.name}
        </p>

        <p className="text-xs sm:text-sm text-center text-neutral-700 dark:text-neutral-400 mt-2 px-2 line-clamp-5">
          {user.bio || "No bio available"}
        </p>

        <p className="text-xs sm:text-sm text-center text-neutral-800 dark:text-neutral-400 mt-3">
          <span className="font-medium">Company:</span>{" "}
          {user.professionalData?.currentCompany || "N/A"}
        </p>
        <p className="text-xs sm:text-sm text-center text-neutral-800 dark:text-neutral-400 mt-1">
          <span className="font-medium">Role: </span>
          {user.professionalData?.jobTitle || "N/A"}
        </p>

        <div className="flex justify-center items-center gap-3 mt-3">
          <Link
            to={user.socialMedia?.twitter ?? "#"}
            target="_blank"
            className="hover:text-blue-300"
          >
            <FaXTwitter size={20} />
          </Link>
          <Link
            to={user.socialMedia?.github ?? "#"}
            target="_blank"
            className="hover:text-slate-400"
          >
            <FaGithub size={20} />
          </Link>
          <Link
            to={user.socialMedia?.linkedin ?? "#"}
            target="_blank"
            className="hover:text-slate-400"
          >
            <CiLinkedin size={25} />
          </Link>
        </div>

        <div className="flex justify-center items-center mt-5">
          <button
            className="rounded-lg py-2 px-4 bg-black text-white dark:bg-zinc-800 text-xs sm:text-sm font-semibold transition hover:bg-gray-900"
            onClick={() => {
              navigate("/alumnidetails", {
                state: {
                  user: user,
                },
              });
            }}
          >
            View Details
          </button>
        </div>
      </BackgroundGradient>
    </div>
  );
}
