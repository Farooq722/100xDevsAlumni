import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Home/Index";
import { Login } from "./Auth/Login";
import { Signup } from "./Auth/Signup";
import { Pricing } from "./Home/Price";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Price" element={<Pricing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
