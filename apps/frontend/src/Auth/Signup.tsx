import React, { useState } from "react";
import { Input } from "@repo/ui/uicomponents/input";
import { Label } from "@repo/ui/uicomponents/label";
import { WavyBackground } from "@repo/ui/uicomponents/wavy-background";
import { RingLoader } from "react-spinners";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import {
  Root as RadioGroupRoot,
  Item as RadioGroupItem,
  Indicator as RadioGroupIndicator,
} from "@radix-ui/react-radio-group";
import { Button } from "@repo/ui/uicomponents/navButton";
import { useStore } from "@repo/zustand/store";
import { toast } from "sonner";
import axios from "axios";
const backendURL = import.meta.env.VITE_BACKEND_URI;

const Signup = () => {
  const { loader, setLoader } = useStore();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    username: "",
    password: "",
    type: "user",
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
        `${backendURL}/auth/signup`,
        { ...input },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      if (data.success) {
        toast.success("Account Created Successfully");
        navigate("/login");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data.msg || "Something went wrong");
    } finally {
      setLoader(false);
    }
  };

  return (
    <WavyBackground>
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto  rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-input bg-gradient-to-bl from-teal-200 to-pink-200 dark:bg-black">
        <h2 className="font-bold text-xl sm:text-2xl text-neutral-800 dark:text-neutral-200">
          Welcome to 100xAlumni
        </h2>
        <p className="text-neutral-600 text-sm sm:text-base max-w-sm mt-2 dark:text-neutral-300">
          Signup to 100xAlumni if you want to connect with 100xDevs
        </p>

        <form className="my-8 space-y-3" onSubmit={submitHandler}>
          <LabelInputContainer>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={input.name}
              placeholder="Full Name"
              type="text"
              onChange={eventHandler}
              required
            />
          </LabelInputContainer>

          <LabelInputContainer>
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

          <LabelInputContainer>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              value={input.password}
              placeholder="••••••••"
              onChange={eventHandler}
              type="password"
              required
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <RadioGroupRoot
              className="flex flex-wrap items-center justify-center gap-10"
              value={input.type}
              onValueChange={(value: string) =>
                setInput({ ...input, type: value })
              }
              aria-label="User Type"
            >
              {[
                { id: "user", label: "Guest user" },
                { id: "alumni", label: "Alumni" },
              ].map(({ id, label }) => (
                <div
                  key={id}
                  className="flex items-center space-x-2 font-semibold"
                >
                  <RadioGroupItem
                    className="w-5 h-5 rounded-full border border-gray-400 dark:border-gray-600 flex items-center justify-center data-[state=checked]:border-teal-600 focus:outline-none"
                    value={id}
                    id={id}
                  >
                    <RadioGroupIndicator className="w-2.5 h-2.5 rounded-full bg-teal-600" />
                  </RadioGroupItem>
                  <label
                    htmlFor={id}
                    className="text-sm text-black dark:text-white"
                  >
                    {label}
                  </label>
                </div>
              ))}
            </RadioGroupRoot>
          </LabelInputContainer>

          <button
            type="submit"
            className="hover:bg-teal-300 hover:text-black hover:bg-gradient-to-r hover:from-purple-300 hover:to-pink-300 transition-all duration-300 px-5 bg-gradient-to-bl from-teal-300 to-pink-300 text-black relative group/btn dark:from-zinc-900 dark:to-zinc-900 block w-full rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          >
            Signup &rarr;
            <BottomGradient />
          </button>

          {loader && (
            <div className="fixed top-0 left-0 right-0 bottom-0 z-20 bg-black/30 flex justify-center items-center">
              <RingLoader color="white" size={50} />
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-neutral-700 dark:text-neutral-300">
            <span>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-black font-bold hover:text-pink-700 dark:text-white"
              >
                Login
              </Link>
            </span>
            <Link
              to="#"
              className="text-black font-medium dark:text-neutral-300 hover:text-teal-600"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />

          <div className="flex flex-col sm:flex-row gap-2">
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

const LabelInputContainer = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>
    {children}
  </div>
);

interface SocialButtonProps {
  icon: any;
  label: string;
}

const SocialButton = ({ icon, label }: SocialButtonProps) => (
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

export default Signup;
