import { useStore } from "@repo/zustand/store";
import axios from "axios";
import React, { useState } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const backendURL = import.meta.env.VITE_BACKEND_URI;

const ForgetPassword = () => {
  const navigate = useNavigate();
  const { loader, setLoader } = useStore();
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [input, setInput] = useState({
    otp: "",
    password: "",
  });

  const eventHandlerForReset = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const eventHandlerForUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const resetHandle = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoader(true);
      const { data } = await axios.post(`${backendURL}/auth/forget-password`, {
        username: email,
      });

      if (data.success) {
        toast.success(data.msg || "OTP sent to your email.");
        setOtpSent(true);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.msg || "Failed to send OTP.");
    } finally {
      setLoader(false);
    }
  };

  const passwordHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.otp.length !== 6 || isNaN(Number(input.otp))) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }
    try {
      setLoader(true);

      const { data } = await axios.post(
        `${backendURL}/auth/verify-forget-password`,
        {
          otp: Number(input.otp),
          password: input.password,
        },
      );

      if (data.success) {
        toast.success(data.msg || "Password updated successfully.");
        navigate("/login");
      } else {
        toast.error(data.msg || "Failed to update password.");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.msg || "Something went wrong.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="shadow-input my-20 mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl rounded-none p-4 md:rounded-2xl md:p-4 bg-gray-300">
      <div className="mb-4 flex justify-start items-center gap-1 text-gray-800 hover:text-green-600 transition duration-300">
        <IoIosArrowDropleft size={20} color={"green"} />
        <Link className="font-semibold cursor-pointer" to={"/login"}>
          Login here
        </Link>
      </div>

      {!otpSent ? (
        <div className="flex flex-col justify-center items-center gap-5">
          <h1 className="text-xl font-semibold">Reset Your Password</h1>
          <form
            onSubmit={resetHandle}
            className="flex flex-col items-center w-full gap-4"
          >
            <input
              className="w-full sm:w-2/3 p-2 rounded-xl"
              placeholder="Enter Your Registered Email"
              id="email"
              name="email"
              value={email}
              type="email"
              onChange={eventHandlerForReset}
              required
            />
            <button
              type="submit"
              disabled={loader}
              className={`bg-slate-600 text-white px-8 py-1.5 rounded-2xl hover:bg-slate-800 transition duration-300 ${
                loader ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loader ? "Sending..." : "Send OTP"}
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-5">
          <h1 className="text-xl font-semibold">Enter OTP & New Password</h1>
          <form
            onSubmit={passwordHandle}
            className="flex flex-col items-center w-full gap-4"
          >
            <input
              type="text"
              name="otp"
              placeholder="Enter Your 6 Digit OTP"
              minLength={6}
              value={input.otp}
              onChange={eventHandlerForUpdate}
              required
              className="w-full sm:w-2/3 p-2 rounded-xl"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter New Password"
              minLength={6}
              value={input.password}
              onChange={eventHandlerForUpdate}
              required
              className="w-full sm:w-2/3 p-2 rounded-xl"
            />
            <button
              type="submit"
              disabled={loader}
              className={`bg-slate-600 text-white px-8 py-1.5 rounded-2xl hover:bg-slate-800 transition duration-300 ${
                loader ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loader ? "Sending..." : "Update Password"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
