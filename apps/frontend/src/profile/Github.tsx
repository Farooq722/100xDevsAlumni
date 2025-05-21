const Github = () => {
  const username = "Farooq722";

  return (
    <div className="bg-purple-200 text-center rounded-lg p-2">
      <div
        className="m-1 p-2 flex justify-center items-center 
 rounded-2xl"
      >
        <img
          src={`https://ghchart.rshah.org/${username}`}
          alt="GitHub Contribution Chart"
          className="w-full max-w-4xl mx-auto"
        />
      </div>
    </div>
  );
};

export default Github;
