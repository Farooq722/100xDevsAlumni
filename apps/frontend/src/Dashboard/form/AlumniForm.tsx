import { Label } from "@repo/ui/uicomponents/label";
import { Input } from "@repo/ui/uicomponents/input";
import { Loader2 } from "lucide-react";
import { Navbar } from "../../body/Navbar/Navbar";
import { cn } from "../../lib/utils";
import { Button } from "@mui/material";
const backendURL = import.meta.env.VITE_BACKEND_URI;
import { useStore } from "@repo/zustand";
import axios from "axios";

const AlumniForm = () => {
  const { loader, setLoader } = useStore();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }

    try {
      setLoader(true);
      const { data } = await axios.post(`${backendURL}`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-0">
      <Navbar />
      <form
        className="max-w-4xl mx-auto mt-10 p-4 sm:p-6 lg:p-8 bg-gradient-to-bl from-teal-100 to-pink-200 shadow-md rounded-lg"
        onSubmit={submitHandler}
      >
        <h1 className="text-center text-3xl sm:text-4xl italic font-mono underline mb-8">
          Alumni Details
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <LabelInputContainer>
            <Label htmlFor="bio" className="mt-2">
              Bio
            </Label>
            <Input
              id="bio"
              name="bio"
              type="text"
              placeholder="Bio"
              className="mt-2"
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="skills" className="mt-2">
              Skills
            </Label>
            <Input
              id="skills"
              name="skills"
              type="text"
              placeholder="skills"
              className="mt-2"
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="present_company" className="mt-2">
              Present Company
            </Label>
            <Input
              id="present_company"
              name="present_company"
              type="text"
              placeholder="present_company"
              className="mt-2"
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="current_role" className="mt-2">
              Current Role
            </Label>
            <Input
              id="current_role"
              name="current_role"
              type="text"
              placeholder="current_role"
              className="mt-2"
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="graduation_year" className="mt-2">
              Graduate Year
            </Label>
            <Input
              id="graduation_year"
              name="graduation_year"
              type="text"
              placeholder="graduation_year"
              className="mt-2"
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="degree" className="mt-2">
              Degree
            </Label>
            <Input
              id="degree"
              name="degree"
              placeholder="degree: B Tech / M Tech ..."
              className="mt-2"
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="experience" className="mt-2">
              Experience
            </Label>
            <Input
              id="experience"
              name="experience"
              placeholder="experience..."
              className="mt-2"
            />
          </LabelInputContainer>

          {["Twitter", "Linkedin", "Github", "PersonalbBlog", "Portfolio"].map(
            (platform) => (
              <LabelInputContainer key={platform}>
                <Label htmlFor={platform.toLowerCase()} className="mt-2">
                  {platform}
                </Label>
                <Input
                  id={platform.toLowerCase()}
                  name={platform.toLowerCase()}
                  placeholder={platform}
                  className="mt-2"
                />
              </LabelInputContainer>
            ),
          )}

          {["Country", "State"].map((item, index) => (
            <LabelInputContainer key={index}>
              <Label htmlFor={item.toLowerCase()} className="mt-2">
                {item}
              </Label>
              <Input
                id={item.toLowerCase()}
                name={item.toLowerCase()}
                placeholder={item}
                className="mt-2"
              />
            </LabelInputContainer>
          ))}

          <LabelInputContainer>
            <Label htmlFor="profilePhoto" className="mt-2">
              Profile
            </Label>
            <Input
              id="profilePhoto"
              name="profilePhoto"
              type="file"
              accept="image/*"
              className="mt-2"
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="resume" className="mt-2">
              Resume
            </Label>
            <Input
              id="resume"
              name="resume"
              type="file"
              accept="application/pdf"
              className="mt-2"
            />
          </LabelInputContainer>
        </div>

        <div className="flex justify-center mt-8">
          {loader ? (
            <Button className="w-full sm:w-auto">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
            </Button>
          ) : (
            <button className="w-full sm:w-auto lg:w-32 p-2 rounded-xl text-black font-medium bg-gradient-to-bl from-teal-300 to-pink-300 hover:bg-gradient-to-bl hover:from-teal-500 hover:to-pink-500 hover:bg-gray-700 hover:text-white">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

// const BottomGradient = () => (
//   <>
//     <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
//     <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
//   </>
// );

const LabelInputContainer = ({ children, className }: any) => (
  <div className={cn("flex flex-col w-full", className)}>{children}</div>
);

// const SocialButton = ({ icon, label }: any) => (
//   <button
//     className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
//     type="button"
//   >
//     {React.cloneElement(icon, {
//       className: "h-4 w-4 text-neutral-800 dark:text-neutral-300",
//     })}
//     <span className="text-neutral-700 dark:text-neutral-300 text-sm">
//       {label}
//     </span>
//     <BottomGradient />
//   </button>
// );

export default AlumniForm;
