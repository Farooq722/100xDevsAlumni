import { FaGithub } from "react-icons/fa";
import { PiShare } from "react-icons/pi";

const Projects = ({ data }: any) => {
  return (
    <div className="text-center p-2 grid grid-cols-1 sm:grid-cols-2 gap-4 ">
      {data.map((project: any, index: number) => (
        <div
          key={index}
          className="w-full max-w-md h-62 border border-cyan-400 bg-gradient-to-tr from-cyan-100 to-blue-100 p-2 rounded-lg shadow-md text-black mx-auto"
        >
          <div className="relative p-4  text-black">
            <div className="absolute top-0 right-1 flex gap-4">
              <a href={project.githubUrl} target="_blank">
                <FaGithub
                  className=" cursor-pointer text-red-400 hover:text-pink-700"
                  size={20}
                />
              </a>
              <a href={project.liveUrl} target="_blank">
                <PiShare
                  className=" cursor-pointer text-red-400 hover:text-pink-700"
                  size={20}
                />
              </a>
            </div>

            <div className="flex justify-center items-center">
              <h1 className="text-xl font-bold mb-2">{project.title}</h1>
            </div>
          </div>

          <p className="text-sm sm:text-base text-gray-700 text-center w-full leading-relaxed break-words max-h-32 overflow-auto">
            {project.description}
          </p>

          <div className="mt-4 flex justify-center gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-800 text-lg"
            >
              GitHub
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-400 text-lg"
            >
              Live
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
