import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CoverDemo } from "./cover";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { motion } from "motion/react";
import { Button } from "@mui/material";
import { useStore } from "@repo/zustand/store";
import { useUserData } from "@repo/zustand/user";
import axios from "axios";
import { toast } from "sonner";
const backendURL = import.meta.env.VITE_BACKEND_URI;

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser, logout, setLoader } = useStore();
  const { selfData, setSelfData, clearData } = useUserData();
  const profile = selfData?.avatar || "https://github.com/shadcn.png";

  console.log(selfData);

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        const res = await axios.get(`${backendURL}/user-data`, {
          withCredentials: true,
        });
        setSelfData(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, []);

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
        initial={{ y: -30, opacity: 0 }}
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
              {selfData?.role === "Alumni" ? (
                <Link to={"/alumniform"} className="hover:text-teal-500">
                  Form
                </Link>
              ) : (
                <Link
                  to={"#"}
                  className="hover:text-slate-500 text-gray-400 cursor-not-allowed"
                  onClick={() => {
                    toast.warning("User don't have access to this");
                  }}
                >
                  Form
                </Link>
              )}
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
          <div className="flex items-center gap-2 max-w-[250px] ml-4 overflow-hidden">
            <div className="min-w-0">
              <h2
                className="text-black text-sm md:text-base lg:text-lg truncate whitespace-nowrap overflow-hidden"
                title={`Hey, ${selfData?.name}`}
              >
                Hey, {selfData?.name}
              </h2>
            </div>

            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <>
                  <Button {...bindTrigger(popupState)}>
                    <Avatar
                      alt={selfData?.name}
                      src={profile}
                      sx={{ width: 45, height: 45 }}
                    />
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={() => navigate("/profile")}>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/setting")}>
                      Setting
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        logout();
                        clearData();
                        setUser(false);
                        navigate("/");
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              )}
            </PopupState>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
