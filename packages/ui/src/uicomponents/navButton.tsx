import { useNavigate } from "react-router-dom";

interface PathFromFe {
  path: string;
}

export function Button({ path }: PathFromFe) {
  const navigate = useNavigate();

  return (
    <div className="w-full ">
      <hr className="border-t border-gray-900 dark:border-gray-700" />
      <br />
      <div className="flex justify-center items-center bg-gradient-to-bl from-teal-400 to-pink-400 py-2 sm:py-3 md:py-1 rounded-md mx-2 sm:mx-4 hover:bg-gradient-to-tr hover:from-teal-300 hover:to-pink-300 ">
        <button
          className="text-black text-sm sm:text-base md:text-md font-semibold rounded hover:bg-opacity-90 transition-all duration-200  "
          onClick={() => {
            navigate(path);
          }}
        >
          Home
        </button>
      </div>
    </div>
  );
}
