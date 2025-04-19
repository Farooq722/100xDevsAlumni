import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Home/Index";
import { LoginSignup } from "./Auth/LoginSignup";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
