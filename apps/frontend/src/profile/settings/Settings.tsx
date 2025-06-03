import { Navbar } from "../../body/Navbar/Navbar";
import DeleteAccount from "./deleteAccount/DeleteAccount";
import Education from "./education/Education";
import Professional from "./professional/Professional";
import UpdateSetting from "./socialPresence/UpdateSetting";

const Settings = () => {
  return (
    <div>
      <Navbar />

      <div className="flex flex-col lg:flex-row justify-center items-stretch gap-5 px-4 py-6 space-y-5 lg:space-y-0">
        <div className="flex-1">
          <UpdateSetting />
        </div>
        <div className="flex-1">
          <Education />
        </div>
        <div className="flex-1">
          <Professional />
        </div>
      </div>

      <div>
        <DeleteAccount />
      </div>
    </div>
  );
};

export default Settings;
