import { useUserData } from "@repo/zustand/user";

const TimelineData = () => {
  const { selfData } = useUserData();

  return (
    <div className="bg-gradient-to-bl from-emerald-200 via-cyan-200 to-blue-200 text-center border-2 rounded-lg border-pink-200 p-2">
      <div className="text-center">
        <h3 className="text-3xl text-black font-mono font-semibold mb-3">
          Hi, 👋 {selfData?.name}
        </h3>
        <p className="text-xl font-light font-mono text-gray-500 mb-2">
          <li>{selfData?.username}</li>
        </p>
      </div>
    </div>
  );
};

export default TimelineData;
