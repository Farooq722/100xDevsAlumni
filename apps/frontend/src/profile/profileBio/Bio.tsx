const Bio = () => {
  return (
    <div className="inline-block  mt-6 items-center text-center sm:w-50 md:w-[320px] ">
      <div className="text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed text-gray-800 dark:text-gray-200 max-w-3xl mx-auto px-4 py-2 text-center antialiased">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe,
        reiciendis nesciunt voluptates numquam eaque porro, vero non doloribus
        rerum hic unde.
      </div>
      <div
        className="bg-gradient-to-bl from-indigo-500 via-purple-500 to-blue-500 mt-2 py-2 text-md font-semibold rounded-lg md:w-[220px] mx-auto hover:from-indigo-600 hover:via-purple-600 hover:to-blue-600 
        transition duration-300 shadow-md cursor-pointer"
      >
        <button className="text-white text-md ">Edit</button>
      </div>
    </div>
  );
};

export default Bio;
