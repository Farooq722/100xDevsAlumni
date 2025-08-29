import { useData, useStore } from "@repo/zustand/store";
import { Navbar } from "../body/Navbar/Navbar";
import AlumniCard from "./card/AlumniCard";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "../Home/Loader";
const backendURL = import.meta.env.VITE_BACKEND_URI;
import { IoIosSearch } from "react-icons/io";

export default function Dashboard() {
  const { setLoader } = useStore();
  const { allAlumniData, setAllAlumniData, setAnalytics } = useData();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        const alumniRes = await axios.get(`${backendURL}/alumnus/data`, {
          withCredentials: true,
        });
        setAllAlumniData(alumniRes.data.allAlumnus || []);
        setAnalytics(alumniRes.data.analytics);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoader(false);
        setLoading(false);
      }
    };

    fetchData();
  }, [setAllAlumniData, setAnalytics, setLoader]);

  const filterUser = allAlumniData.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="bg-slate-200 min-h-screen">
      <Navbar />
      <motion.div
        className="
          absolute my-4 flex items-center
          top-20 right-10 w-1/5
          min-w-[240px] max-w-[92vw]
          sm:right-4 sm:top-8
          md:right-8 md:top-16 md:w-2/5
          lg:right-10 lg:top-20 lg:w-1/4
          xl:w-1/5
        "
        initial={{ opacity: 0.2, x: 100 }}
        transition={{ duration: 1.01 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <input
          placeholder="Find Your Mentor here"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-2 p-2 rounded-2xl w-full h-[45.5px] pr-10"
        />
        <p className="absolute right-2 text-red-900 flex items-center h-11">
          <IoIosSearch size={25} />
        </p>
      </motion.div>

      <div className="container mx-auto mt-6 px-4 py-6">
        {loading ? (
          <Loader />
        ) : filterUser.length === 0 ? (
          <div className="text-gray-500 text-center text-xl">
            No Alumni with this name
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2 sm:gap-4 lg:gap-8 xl:gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {filterUser.map((user, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0.2, y: 40 }}
                transition={{ duration: 1.01 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <AlumniCard user={user} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
