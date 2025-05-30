import { useUserData } from "@repo/zustand/user";

const TimelineData = () => {
  const { selfData } = useUserData();

  return (
    <div className="bg-gradient-to-bl from-emerald-200 via-cyan-200 to-blue-200 text-center border-2 rounded-lg border-pink-200 p-4">
      <h3 className="text-2xl sm:text-3xl text-black font-mono font-semibold mb-2">
        Hi, 👋 {selfData?.name}
      </h3>
      <p className="text-md sm:text-xl font-light font-mono text-gray-500">
        <li>{selfData?.username}</li>
      </p>
    </div>
  );
};

export default TimelineData;
