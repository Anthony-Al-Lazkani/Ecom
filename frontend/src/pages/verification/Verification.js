import "./Verification.css";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const Verification = () => {
  return (
    <div className="verificationContainer">
      <div className="verificationBox">
        <div className="verificationTitle">
          <h3>OTP Verification</h3>
        </div>

        <div className="verificationInput">
          <form>
            <input type="text" placeholder="OTP" maxLength={6} />
            <button>Verify Email</button>
          </form>
        </div>

        <div className="backButton">
          <Link to="/signup">
            <FaArrowLeft />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Verification;
