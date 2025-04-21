import { useNavigate } from 'react-router-dom';


export function Button({ path }: any) {

  const navigate = useNavigate();

  return (
    <div className='w-full'>
      <hr className="border-t border-gray-900 dark:border-gray-700" />
        <br /> 
        <div className="flex justify-center items-center bg-gradient-to-bl from-teal-500 to-pink-500 py-2 sm:py-3 md:py-1 rounded-md mx-2 sm:mx-4">
        <button className="text-black text-sm sm:text-base md:text-md font-semibold rounded hover:bg-opacity-90 transition-all duration-200"
        onClick={() => {navigate(path)}}
        >Home</button>
        </div>
    </div>
  );
}
