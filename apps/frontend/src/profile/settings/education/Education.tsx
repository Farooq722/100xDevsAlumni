import { Input } from "@repo/ui/uicomponents/input";
import axios from "axios";
import { useState } from "react";
import { RingLoader } from "react-spinners";
import { toast } from "sonner";

const backendURL = import.meta.env.VITE_BACKEND_URI;

const Education = () => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({
    department: "",
    college: "",
    passingYear: "",
    degree: "",
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
        `${backendURL}/education/`,
        { ...data, passingYear: Number(data.passingYear) },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        toast.success(res.data.msg || "Updation successfully");
        // should update seteducation store here
        setData({
          department: "",
          college: "",
          passingYear: "",
          degree: "",
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
    <div className="max-w-md mx-auto p-6 bg-gradient-to-bl from-teal-200 to-fuchsia-300 rounded-xl shadow-md  mt-10">
      <h2 className="text-xl font-base mb-4 text-center">
        Create & Update Education
      </h2>

      <form onSubmit={submitHandler}>
        <div className="space-y-2">
          <h2>Department</h2>
          <div className="flex justify-start items-center gap-4 ">
            <Input
              id="department"
              name="department"
              type="text"
              required
              value={data.department}
              onChange={eventHandler}
              placeholder="Enter Your Department"
              className="w-96 p-2 border rounded"
            />
          </div>
        </div>

        <div className="space-y-2">
          <h2>College</h2>
          <div className="flex justify-start items-center gap-4 ">
            <Input
              id="college"
              name="college"
              type="text"
              required
              value={data.college}
              onChange={eventHandler}
              placeholder="Enter Your College"
              className="w-96 p-2 border rounded"
            />
          </div>
        </div>

        <div className="space-y-2">
          <h2>Passing Year</h2>
          <div className="flex justify-start items-center gap-4 ">
            <Input
              id="passingYear"
              name="passingYear"
              type="text"
              required
              value={data.passingYear}
              onChange={eventHandler}
              placeholder="Enter Your Passing Year"
              className="w-96 p-2 border rounded"
            />
          </div>
        </div>

        <div className="space-y-2">
          <h2>Degree</h2>
          <div className="flex justify-start items-center gap-4 ">
            <Input
              id="degree"
              name="degree"
              type="text"
              required
              value={data.degree}
              onChange={eventHandler}
              placeholder="Eg: B Tech, BCA"
              className="w-96 p-2 border rounded"
            />
          </div>
        </div>

        {loader ? (
          <div className="flex items-center justify-center w-full h-full mt-5">
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

export default Education;
