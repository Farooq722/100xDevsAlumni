import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Pricing } from "./Home/Price";
import { Toaster } from "sonner";
import { Loader } from "./Home/Loader";
import Home from "./Home/Index";

// Lazy-loaded components
// const Home = React.lazy(() => import("./Home/Index"));
const Login = React.lazy(() => import("./Auth/Login"));
const Signup = React.lazy(() => import("./Auth/Signup"));
const Dashboard = React.lazy(() => import("./Dashboard/Dashboard"));
const AlumniForm = React.lazy(() => import("./Dashboard/form/AlumniForm"));

function App() {
  return (
    <div>
      <BrowserRouter>
        <Toaster richColors />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <Suspense fallback={<Loader />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/signup"
            element={
              <Suspense fallback={<Loader />}>
                <Signup />
              </Suspense>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<Loader />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="/alumniform"
            element={
              <Suspense fallback={<Loader />}>
                <AlumniForm />
              </Suspense>
            }
          />
          <Route path="/price" element={<Pricing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
