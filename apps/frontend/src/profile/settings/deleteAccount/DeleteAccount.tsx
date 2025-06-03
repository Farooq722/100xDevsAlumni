import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DeleteAccount = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      toast.success("Logged out");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gradient-to-bl from-teal-200 to-fuchsia-300 rounded-xl shadow-md dark:bg-gray-900 mt-10">
      <div className="font-bold mb-4">
        <h1>Want to Delete your account ?</h1>
      </div>
      <button
        onClick={handleLogout}
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
      >
        Delete Account
      </button>
    </div>
  );
};

export default DeleteAccount;
