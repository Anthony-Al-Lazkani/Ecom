import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Pages & Components
import Home from "./pages/homepage/Home";
import Navbar from "./components/navbar/Navbar";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Verification from "./pages/verification/Verification";
import { EmailProvider } from "./context/emailContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <EmailProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verification" element={<Verification />} />
          </Routes>
        </EmailProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
