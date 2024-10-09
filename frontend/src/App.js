import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <EmailProvider>
          <PasswordProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/verification" element={<Verification />} />
              <Route path="/resetpassreq" element={<ResetPasswordRequest />} />
              <Route
                path="/resetpassver"
                element={<ResetPasswordVerification />}
              />
              <Route path="/resetpassword" element={<ResetPassword />} />
            </Routes>
          </PasswordProvider>
        </EmailProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
