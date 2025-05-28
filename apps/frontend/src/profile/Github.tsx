import { useUserData } from "@repo/zustand/user";

const Github = () => {
  const { selfData } = useUserData();
  const url = selfData?.socialMedia?.github || "https://github.com/username";
  const { pathname } = new URL(url!);

  const username = pathname.split("/")[1];

  return (
    <div className="bg-purple-200 text-center rounded-lg p-2">
      <div
        className="m-1 p-2 flex justify-center items-center 
 rounded-2xl"
      >
        {
          <img
            src={`https://ghchart.rshah.org/${username}`}
            alt={`To Update GitHub Contribution Chart
             Go To Profile -> Settings -> Update Social Links`}
            className="w-full max-w-4xl mx-auto"
          />
        }
      </div>
    </div>
  );
};

export default Github;
