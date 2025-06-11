import { RingLoader } from "react-spinners";

export const Loader = () => {
  return (
    <div className="flex items-center justify-center h-dvh w-full dark:bg-black">
      <div className="flex flex-col justify-center items-center gap-4 px-4 text-center">
        <RingLoader color="#7c3aed" size={80} />
        {/* <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
          Loading ...
        </h1> */}
      </div>
    </div>
  );
};
