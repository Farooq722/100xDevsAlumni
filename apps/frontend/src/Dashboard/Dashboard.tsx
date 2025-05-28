import { useData, useStore } from "@repo/zustand/store";
import { Navbar } from "../body/Navbar/Navbar";
import AlumniCard from "./card/AlumniCard";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "../Home/Loader";
const backendURL = import.meta.env.VITE_BACKEND_URI;

export default function Dashboard() {
  const { setLoader } = useStore();
  const { allAlumniData, setAllAlumniData } = useData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        const alumniRes = await axios.get(`${backendURL}/alumnus/data`, {
          withCredentials: true,
        });
        setAllAlumniData(alumniRes.data.allAlumnus || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoader(false);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-slate-200 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 gap-2 sm:gap-4 lg:gap-8 xl:gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {allAlumniData.map((user, index) => (
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
