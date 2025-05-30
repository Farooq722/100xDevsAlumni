import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { Loader } from "./Home/Loader";
import Home from "./Home/Index";
import ForgetPassword from "./Auth/ForgetPassoword";
import { DeviceCheckLayout } from "./body/DeviceCheckLayout";

// Lazy-loaded components
const Login = React.lazy(() => import("./Auth/Login"));
const Signup = React.lazy(() => import("./Auth/Signup"));
const Dashboard = React.lazy(() => import("./Dashboard/Dashboard"));
const AlumniForm = React.lazy(() => import("./Dashboard/form/AlumniForm"));
const Pricing = React.lazy(() => import("./Home/Price"));
const ProfileHome = React.lazy(() => import("./profile/ProfileHome"));
const UpdateSetting = React.lazy(
  () => import("./profile/socialPresence/UpdateSetting"),
);
const DetailsPage = React.lazy(() => import("./Dashboard/details/DetailsPage"));

function App() {
  return (
    <div>
      <DeviceCheckLayout>
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
            <Route
              path="/price"
              element={
                <Suspense fallback={<Loader />}>
                  <Pricing />
                </Suspense>
              }
            />
            <Route
              path="/profile"
              element={
                <Suspense fallback={<Loader />}>
                  <ProfileHome />
                </Suspense>
              }
            />

            <Route
              path="/setting"
              element={
                <Suspense fallback={<Loader />}>
                  <UpdateSetting />
                </Suspense>
              }
            />

            <Route
              path="/alumnidetails"
              element={
                <Suspense fallback={<Loader />}>
                  <DetailsPage />
                </Suspense>
              }
            />

            <Route path="/forget-password" element={<ForgetPassword />} />
          </Routes>
        </BrowserRouter>
      </DeviceCheckLayout>
    </div>
  );
}

export default App;
