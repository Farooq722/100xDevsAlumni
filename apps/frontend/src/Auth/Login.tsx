import { Input } from "@repo/ui/uicomponents/input";
import { Label } from "@repo/ui/uicomponents/label";
import { WavyBackground } from "@repo/ui/uicomponents/wavy-background";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { cn } from "../lib/utils";
import { Button } from "@repo/ui/uicomponents/navButton";
import { toast } from "sonner";
import axios from "axios";
import { useStore } from "@repo/zustand/store";
const backendURL = import.meta.env.VITE_BACKEND_URI;

export const Login = () => {
  const navigate = useNavigate();
  const { setUser, loader, setLoader } = useStore();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const eventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    try {
      setLoader(true);
      const { data } = await axios.post(
        `${backendURL}/auth/signin`,
        { ...input },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      if (data.success) {
        setUser(true);
        navigate("/dashboard");
        toast.success("Login Successfully");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.response?.datan ||
          error.response?.data?.msg ||
          "Something Went Wrong",
      );
    } finally {
      setLoader(false);
    }
  };

  return (
    <WavyBackground>
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-input bg-gradient-to-bl from-teal-200 to-pink-200">
        <h2 className="font-bold text-xl sm:text-2xl text-neutral-800">
          Welcome to 100xAlumni
        </h2>
        <p className="text-neutral-600 text-sm sm:text-base max-w-sm mt-2 ">
          Login to 100xAlumni if you want to connect with 100xDevs
        </p>

        <form className="my-8 space-y-5" onSubmit={submitHandler}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="username"
              value={input.username}
              placeholder="email@gmail.com"
              type="email"
              onChange={eventHandler}
              required
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              value={input.password}
              placeholder="••••••••"
              type="password"
              onChange={eventHandler}
              required
            />
          </LabelInputContainer>

          <button className="hover:bg-teal-300 hover:text-black hover:bg-gradient-to-r hover:from-purple-300 hover:to-pink-300 transition-all duration-300 px-5 bg-gradient-to-bl from-teal-300 to-pink-300 text-black relative group/btn block w-full rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] ">
            Login &rarr;
            <BottomGradient />
          </button>

          {loader && (
            <div className="fixed top-0 left-0 right-0 bottom-0 z-20 bg-black/30 flex justify-center items-center">
              <RingLoader color="white" size={50} />
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-neutral-700 text-sm">
              Don't have an account:{"  "}
              <Link
                to="/signup"
                className="text-black font-bold text-md hover:text-pink-700"
              >
                Signup
              </Link>
            </div>
            <div>
              <Link
                to={"/forget-password"}
                className="text-black text-sm font-medium hover:text-teal-600"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />

          <div className="flex flex-col sm:flex-row gap-4">
            <SocialButton icon={<FaGithub />} label="GitHub" />
            <SocialButton icon={<FcGoogle />} label="Google" />
          </div>
        </form>
        <Button path={"/"} />
      </div>
    </WavyBackground>
  );
};

const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);

interface Child {
  children: any;
  className: any;
}

const LabelInputContainer = ({ children, className }: Child) => (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>
    {children}
  </div>
);

interface Elements {
  icon: any;
  label: any;
}

const SocialButton = ({ icon, label }: Elements) => (
  <button
    className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
    type="button"
  >
    {React.cloneElement(icon, {
      className: "h-4 w-4 text-neutral-800 dark:text-neutral-300",
    })}
    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
      {label}
    </span>
    <BottomGradient />
  </button>
);

export default Login;
