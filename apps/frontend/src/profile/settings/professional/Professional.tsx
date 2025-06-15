import { Input } from "@repo/ui/uicomponents/input";
import axios from "axios";
import { useState } from "react";
import { RingLoader } from "react-spinners";
import { toast } from "sonner";

const backendURL = import.meta.env.VITE_BACKEND_URI;

const Professional = () => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({
    currentCompany: "",
    jobTitle: "",
    yearsOfExperience: "",
    location: "",
  });

  const eventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    try {
      setLoader(true);
      const res = await axios.post(
        `${backendURL}/professionalData/`,
        { ...data, yearsOfExperience: Number(data.yearsOfExperience) },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        toast.success(res.data.msg || "Updation successfully");
        setData({
          currentCompany: "",
          jobTitle: "",
          yearsOfExperience: "",
          location: "",
        });
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data.msg || "Something went wrong");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-bl from-teal-200 to-fuchsia-300 rounded-xl shadow-md mt-10">
      <h2 className="text-xl font-base mb-4 text-center">
        Create & Update Professional Data
      </h2>

      <form onSubmit={submitHandler}>
        <div className="space-y-2">
          <h2>Company</h2>
          <div className="flex justify-start items-center gap-4 ">
            <Input
              id="currentCompany"
              name="currentCompany"
              type="text"
              required
              value={data.currentCompany}
              onChange={eventHandler}
              placeholder="Enter Your Current Company"
              className="w-96 p-2 border rounded"
            />
          </div>
        </div>

        <div className="space-y-2">
          <h2>Job Title</h2>
          <div className="flex justify-start items-center gap-4 ">
            <Input
              id="jobTitle"
              name="jobTitle"
              type="text"
              required
              value={data.jobTitle}
              onChange={eventHandler}
              placeholder="Enter Your Job Title"
              className="w-96 p-2 border rounded "
            />
          </div>
        </div>

        <div className="space-y-2">
          <h2>Experience</h2>
          <div className="flex justify-start items-center gap-4 ">
            <Input
              id="yearsOfExperience"
              name="yearsOfExperience"
              type="text"
              required
              value={data.yearsOfExperience}
              onChange={eventHandler}
              placeholder="Enter Your Experience"
              className="w-96 p-2 border rounded "
            />
          </div>
        </div>

        <div className="space-y-2">
          <h2>Location</h2>
          <div className="flex justify-start items-center gap-4 ">
            <Input
              id="location"
              name="location"
              type="text"
              required
              value={data.location}
              onChange={eventHandler}
              placeholder="Eg: Hyderabad, Bangalore, Chennai, USA, UK"
              className="w-96 p-2 border rounded "
            />
          </div>
        </div>

        {loader ? (
          <div className="flex items-center justify-center  w-full h-full mt-5">
            <RingLoader size={30} color="purple" />
          </div>
        ) : (
          <button className="mt-5 w-96 bg-gradient-to-bl from-indigo-500 via-purple-500 to-blue-500 hover:bg-gradient-to-bl hover:from-indigo-600 hover:via-purple-600 hover:to-blue-600 text-white text-lg py-2 rounded hover:bg-blue-700">
            Save Changes
          </button>
        )}
      </form>
    </div>
  );
};

export default Professional;
