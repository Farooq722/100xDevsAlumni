import { useUserData } from "@repo/zustand/user";

const Github = () => {
  const { selfData } = useUserData();
  const url = selfData?.socialMedia?.github || "https://github.com/username";
  const { pathname } = new URL(url!);
  const username = pathname.split("/")[1];

  return (
    <div className="bg-purple-200 text-center rounded-lg p-4">
      <div className="flex justify-center">
        <img
          src={`https://ghchart.rshah.org/${username}`}
          alt="GitHub Contribution Chart"
          className="w-full max-w-full sm:max-w-3xl"
        />
      </div>
    </div>
  );
};

export default Github;
