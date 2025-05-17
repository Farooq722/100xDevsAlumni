import { Link, useNavigate } from "react-router-dom";
import { CoverDemo } from "./cover";
import Avatar from "@mui/material/Avatar";
import { useStore } from "@repo/zustand";
import { motion } from "motion/react";

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useStore();

  console.log(user);
  return (
    <motion.div
      className="text-white p-3 bg-gradient-to-bl from-teal-200 to-pink-200"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <motion.div
        className="flex justify-between items-center m-2 mx-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="text-2xl italic rounded-full font-medium">
          <Link to={"/"}>
            <CoverDemo />
          </Link>
        </div>
        <div className="border bg-gradient-to-bl from-teal-300 to-pink-300 px-8 py-2 rounded-full">
          {!user ? (
            <div className="flex justify-around gap-6 text-black font-medium">
              <Link to={"/price"} className="hover:text-teal-500 ">
                Price
              </Link>
              <Link
                to={"https://harkirat.classx.co.in"}
                target="_blank"
                className="hover:text-teal-500 "
              >
                100xDevs
              </Link>
              <Link
                to={"https://school.100xdevs.com"}
                target="_blank"
                className="hover:text-teal-500 "
              >
                100xSchool
              </Link>
              <Link to={"#"} className="hover:text-teal-500 ">
                Contact us
              </Link>
            </div>
          ) : (
            <div className="flex justify-around gap-6 text-black font-medium">
              <Link to={"/dashboard"} className="hover:text-teal-500 ">
                Dashboard
              </Link>
              <Link to={"/alumniform"} className="hover:text-teal-500 ">
                Form
              </Link>
              <Link
                to={"https://harkirat.classx.co.in"}
                target="_blank"
                className="hover:text-teal-500 "
              >
                100xDevs
              </Link>
              <Link
                to={"https://school.100xdevs.com"}
                target="_blank"
                className="hover:text-teal-500 "
              >
                100xSchool
              </Link>

              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  setUser(false);
                  navigate("/");
                }}
              >
                logout
              </button>
            </div>
          )}
        </div>
        {!user ? (
          <div className="flex justify-between gap-4 text-black font-medium">
            <div className="py-3">
              <button
                className="hover:bg-teal-300 hover:text-black hover:bg-gradient-to-r hover:from-purple-300 hover:to-pink-300 transition-all duration-300 px-5 bg-gradient-to-bl from-teal-400 to-pink-400 text-black py-2 rounded-2xl"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          </div>
        ) : (
          <div>
            <Avatar alt="Travis Howard" src="https://github.com/shadcn.png" />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
