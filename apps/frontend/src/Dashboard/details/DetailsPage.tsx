import { useLocation } from "react-router-dom";
import { Timeline } from "../../Uicomponents/timeline";
import Github from "../../profile/Github";
import extractUsername from "../../lib/username";

function DetailsPage() {
  const location = useLocation();
  const { user } = location.state!;
  const githubUrl = user.socialMedia.github;
  const username = githubUrl
    ? extractUsername(githubUrl)
    : "https://github.com/username";

  const data = [
    {
      title: "Education",
      content: (
        <div>
          <p className="mb-6 text-xs text-neutral-800 md:text-sm font-semibold">
            Education Details
          </p>
          <div className="border border-purple-400 p-1 bg-gradient-to-br from-pink-200 via-teal-200 to-purple-200 rounded-xl">
            <div className="border border-purple-400 p-4 bg-gradient-to-br from-pink-100 via-teal-100 to-purple-100">
              <h1 className="text-black font-semibold">
                <span className="text-gray-500">College:</span>{" "}
                {user.education?.college || "N/A"}
              </h1>
              <h1 className="text-black font-semibold">
                <span className="text-gray-500">Department:</span>{" "}
                {user.education?.department || "N/A"}
              </h1>
              <h1 className="text-black font-semibold">
                <span className="text-gray-500"> Passed Out Year:</span>{" "}
                {user.education?.passingYear || "N/A"}
              </h1>
              <h1 className="text-black font-semibold">
                <span className="text-gray-500">Degree:</span>{" "}
                {user.education?.degree || "N/A"}
              </h1>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Professional",
      content: (
        <div>
          <p className="mb-6 text-xs font-semibold text-neutral-800 md:text-sm">
            Professional Details
          </p>
          <div className="border border-purple-300 p-1 bg-gradient-to-br from-pink-200 via-teal-200 to-purple-200 rounded-xl">
            <div className="border border-purple-300 p-4 bg-gradient-to-br from-pink-100 via-teal-100 to-purple-100">
              <h1 className="text-black font-semibold">
                <span className="text-gray-500">Company: </span>{" "}
                {user.professionalData?.currentCompany || "N/A"}
              </h1>
              <h1 className="text-black font-semibold">
                <span className="text-gray-500">Job Title: </span>{" "}
                {user.professionalData?.jobTitle || "N/A"}
              </h1>
              <h1 className="text-black font-semibold">
                <span className="text-gray-500">Experience: </span>{" "}
                {user.professionalData?.yearsOfExperience || "N/A"}
              </h1>
              <h1 className="text-black font-semibold">
                <span className="text-gray-500">Location: </span>{" "}
                {user.professionalData?.location || "N/A"}
              </h1>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Projects",
      content: (
        <div>
          <p className="mb-6 text-xs font-semibold text-neutral-800 md:text-sm ">
            My top {user.projects.length} projects which i built.
          </p>
          {user.projects.length !== 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {user.projects.map((project: any, index: number) => (
                <div
                  key={index}
                  className="border rounded-xl p-4 shadow-md bg-gradient-to-br from-pink-100 via-teal-100 to-purple-100"
                >
                  <h3 className="text-md font-semibold mb-2">
                    <span className="text-xl font-sans text-pink-400">
                      Title:
                    </span>{" "}
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-600">
                    <span className="text-xl font-sans text-pink-400">
                      Description:
                    </span>{" "}
                    {project.description}
                  </p>
                  <div className="flex justify-start items-center gap-4 mt-4">
                    <span>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        className="text-teal-400 hover:text-teal-600"
                      >
                        Live Url
                      </a>
                    </span>
                    <span>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        className="text-teal-400 hover:text-teal-600"
                      >
                        Github
                      </a>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-teal-300 p-4 font-semibold">
              No Projects Available By Now
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Github Contri Chat",
      content: (
        <div>
          <p className="mb-6 text-xs font-semibold text-neutral-800 md:text-sm">
            My Github Contribution Chart.
          </p>
          <div className="border rounded-xl p-1 shadow-md bg-gradient-to-br from-pink-300 via-teal-300 to-purple-300">
            <Github username={username} />
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
