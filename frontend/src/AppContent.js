import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { AnimatePresence } from "framer-motion";

// Pages & Components
import Home from "./pages/homepage/Home";
import Navbar from "./components/navbar/Navbar";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Verification from "./pages/verification/Verification";
import { EmailProvider } from "./context/emailContext";
import { PasswordProvider } from "./context/resetPasswordContext";
import ResetPasswordRequest from "./pages/resetpasswordreq/resetPasswordRequest";
import ResetPasswordVerification from "./pages/resetpasswordverification/resetPasswordVerification";
import ResetPassword from "./pages/resetpassword/resetPassword";
import { AuthProvider } from "./context/authContext";

function AppContent() {
  const location = useLocation()
  return (
    <>
      <Navbar />
      <EmailProvider>
        <PasswordProvider>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/verification" element={<Verification />} />
              <Route path="/resetpassreq" element={<ResetPasswordRequest />} />
              <Route path="/resetpassver" element={<ResetPasswordVerification />} />
              <Route path="/resetpassword" element={<ResetPassword />} />
            </Routes>
          </AnimatePresence>
        </PasswordProvider>
      </EmailProvider>
    </>
  );
}

export default AppContent;
