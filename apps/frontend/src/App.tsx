import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Home/Index";
import { Login } from "./Auth/Login";
import { Signup } from "./Auth/Signup";
import { Pricing } from "./Home/Price";
import Dashboard from "./Dashboard/Dashboard";
import AlumniFrom from "./Dashboard/form/AlumniForm";


function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Price" element={<Pricing />} />
          <Route path="/dashboard"element={<Dashboard />} />
          <Route path="/alumniform" element={<AlumniFrom />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
