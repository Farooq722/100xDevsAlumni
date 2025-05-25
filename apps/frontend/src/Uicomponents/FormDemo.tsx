import React from "react";
import { Label } from "@repo/ui/uicomponents/label";
import { Input } from "@repo/ui/uicomponents/input";
import { cn } from "../lib/utils";
import { motion } from "motion/react";
// import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useStore } from "@repo/zustand/store";

export function FormDemo() {
  const { loader, setLoader } = useStore();
  const navigate = useNavigate();

  const submitHandler = async (e: any) => {
    e.prevenDefault();
    try {
      setLoader(true);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <motion.div
      className="border-4 rounded-3xl mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-60 my-10 bg-gradient-to-bl from-teal-200 to-pink-200 mt-28"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="shadow-input my-10 mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl rounded-none bg-gradient-to-bl from-teal-400 to-pink-400 p-4 md:rounded-2xl md:p-8 dark:bg-black"
        initial={{ opacity: 0.2, y: 60 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Contact us
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
          Contact us if you encounter any issue 🚀
        </p>

        <form className="my-8" onSubmit={submitHandler}>
          <div className="mb-8 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label htmlFor="firstname">First Name</Label>
              <Input id="firstname" placeholder="First Name" type="text" />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last Name</Label>
              <Input id="lastname" placeholder="Last Name" type="text" />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="100x@gmail.com" type="email" />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="number">Phone Number</Label>
            <Input id="number" placeholder="9999999999" type="number" />
          </LabelInputContainer>
          <button className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-bl from-teal-100 to-pink-100 hover:bg-gradient-to-bl hover:from-teal-200 hover:to-pink-200 font-medium text-black shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]">
            Contact Us &rarr;
            <BottomGradient />
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
