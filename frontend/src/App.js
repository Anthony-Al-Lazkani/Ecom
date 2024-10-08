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
import ResetPasswordRequest from "./pages/resetpassword/resetPasswordRequest";
import ResetPasswordVerification from "./pages/resetpassword/resetPasswordVerification";

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
              <Route
                path="/resetpasswordrequest"
                element={<ResetPasswordRequest />}
              />
              <Route
                path="/resetpasswordverification"
                element={<ResetPasswordVerification />}
              />
            </Routes>
          </PasswordProvider>
        </EmailProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
