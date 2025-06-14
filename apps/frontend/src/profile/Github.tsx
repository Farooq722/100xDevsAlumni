interface Username {
  username: string;
}
const Github = ({ username }: Username) => {
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
