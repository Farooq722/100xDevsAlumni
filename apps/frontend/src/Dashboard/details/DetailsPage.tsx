import { useLocation } from "react-router-dom";
import { Timeline } from "../../Uicomponents/timeline";
import Github from "../../profile/Github";
import extractUsername from "../../lib/username";
import {
  Code2,
  FolderKanban,
  Github as GithubIcon,
  ExternalLink,
  User,
  Building,
  Briefcase,
  Star,
  MapPin,
  GraduationCap,
  TrophyIcon,
  Calendar,
} from "lucide-react";

function DetailsPage() {
  const location = useLocation();
  const { user } = location.state!;
  const githubUrl = user.socialMedia?.github;
  const username = githubUrl
    ? extractUsername(githubUrl)
    : "https://github.com/username";

  const data = [
    {
      title: "Education",
      content: (
        <div>
          <p className="mb-2 text-xs font-semibold text-neutral-800 md:text-sm">
            <span className="inline-block text-white bg-black rounded-xl p-2 hover:text-teal-400">
              <GraduationCap />
            </span>
          </p>

          <div className="">
            <div className="py-8 px-6 bg-black rounded-xl">
              <div className="flex justify-between items-center">
                <div className="flex justify-start items-center gap-2">
                  <span>
                    <Building className="text-white" size={25} />
                  </span>
                  <div className="flex flex-col justify-center items-center text-white font-semibold">
                    <span className="text-gray-400 text-md">Institution </span>{" "}
                    <span className="text-gray-100 text-xl">
                      {user.education?.college || "Not specified"}
                    </span>
                  </div>
                </div>

                <div className="flex justify-start items-center gap-2 mr-8">
                  <span>
                    <TrophyIcon className="text-white" size={25} />
                  </span>
                  <div className="flex flex-col justify-center items-center text-white font-semibold">
                    <span className="text-gray-400 text-md">Department </span>{" "}
                    <span className="text-gray-100 text-xl">
                      {user.education?.degree || "Not Specified"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <div className="flex justify-start items-center gap-2">
                  <span>
                    <Code2 className="text-white" size={25} />
                  </span>
                  <div className="flex flex-col justify-center items-center text-white font-semibold">
                    <span className="text-gray-400 text-md">Department </span>{" "}
                    <span className="text-gray-100 text-xl">
                      {user.education?.department || "Not Specified"}
                    </span>
                  </div>
                </div>

                <div className="flex justify-start items-center gap-2">
                  <span>
                    <Calendar className="text-white" size={25} />
                  </span>
                  <div className="flex flex-col justify-center items-center text-white font-semibold">
                    <span className="text-gray-400 text-md">
                      Graduation Year{" "}
                    </span>{" "}
                    <span className="text-gray-100 text-xl">
                      {user.education?.passingYear || "Not Specified"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Professional",
      content: (
        <div>
          <p className="mb-2 text-xs font-semibold text-neutral-800 md:text-sm">
            <span className="inline-block text-white bg-black rounded-xl p-2 hover:text-teal-400">
              <Briefcase />
            </span>
          </p>
          <div className="">
            <div className="py-8 px-6 bg-black rounded-xl">
              <div className="flex justify-between items-center">
                <div className="flex justify-start items-center gap-2">
                  <span>
                    <Building className="text-white" size={25} />
                  </span>
                  <div className="flex flex-col justify-center items-center text-white font-semibold">
                    <span className="text-gray-400 text-md">Company </span>{" "}
                    <span className="text-gray-100 text-xl">
                      {user.professionalData?.currentCompany || "Not Specified"}
                    </span>
                  </div>
                </div>

                <div className="flex justify-start items-center gap-2 mr-8">
                  <span>
                    <User className="text-white" size={25} />
                  </span>
                  <div className="flex flex-col justify-center items-center text-white font-semibold">
                    <span className="text-gray-400 text-md">Position </span>{" "}
                    <span className="text-gray-100 text-xl">
                      {user.professionalData?.jobTitle || "Not Specified"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <div className="flex justify-start items-center gap-2">
                  <span>
                    <Star className="text-white" size={25} />
                  </span>
                  <div className="flex flex-col justify-center items-center text-white font-semibold">
                    <span className="text-gray-400 text-md">Experience </span>{" "}
                    <span className="text-gray-100 text-xl">
                      {user.professionalData?.yearsOfExperience ||
                        "Not Specified"}{" "}
                    </span>
                  </div>
                </div>

                <div className="flex justify-start items-center gap-2">
                  <span>
                    <MapPin className="text-white" size={25} />
                  </span>
                  <div className="flex flex-col justify-center items-center text-white font-semibold">
                    <span className="text-gray-400 text-md">Location </span>{" "}
                    <span className="text-gray-100 text-xl">
                      {user.professionalData?.location || "Not Specified"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Projects",
      content: (
        <div>
          <div className="flex justify-between items-center mb-4">
            <span className="inline-block text-white bg-black rounded-xl p-2 hover:text-teal-400">
              <FolderKanban />
            </span>
            <span className="bg-slate-500 text-sky-100 px-4 py-2 rounded-xl text-sm font-bold border border-cyan-500/30">
              {user.projects?.length || 0} Projects
            </span>
          </div>
          {user.projects.length !== 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {user.projects.map((project: any, index: number) => (
                <div
                  key={index}
                  className="border rounded-xl p-6 duration-300 bg-black hover:shadow-xl hover:translate-y-0.5"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-md font-semibold mb-2">
                      <span className="text-xl font-sans text-teal-300 hover:text-teal-400">
                        {project.title}
                      </span>{" "}
                    </h3>
                    <div className="flex justify-center items-center gap-2">
                      <span>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          className="text-teal-400 hover:text-teal-500"
                        >
                          <ExternalLink />
                        </a>
                      </span>
                      <span>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          className="text-teal-400 hover:text-teal-600"
                        >
                          <GithubIcon />
                        </a>
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 dark:text-gray-600 ">
                    <span className="text-xl font-sans text-gray-200 ">
                      Description:
                    </span>{" "}
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8 text-center">
              <Code2 className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 font-medium">
                No projects available yet
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Check back later for amazing projects!
              </p>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Github Contri Chat",
      content: (
        <div>
          <div className="text-white hover:text-green-700 bg-black inline-block rounded-xl p-1">
            <GithubIcon size={30} />
          </div>
          <div className="bg-black p-3 py-2 rounded-xl">
            <p className="mb-2 mt-2 text-xs font-semibold text-gray-200 md:text-sm">
              Github Contribution Chart{" "}
              <span className="text-green-500">@{username}</span>
            </p>
            <div className="rounded-xl p-1 shadow-md ">
              <Github username={username} />
            </div>
          </div>
        </div>
      ),
    },
  ];

  //current user info
  const userInfo = [
    {
      name: user.name,
      bio: user.bio,
      avatar: user.avatar,
    },
  ];
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} info={userInfo} />
    </div>
  );
}

export default DetailsPage;
