import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Home/Index";
import { Login } from "./Auth/Login";
import { Signup } from "./Auth/Signup";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
