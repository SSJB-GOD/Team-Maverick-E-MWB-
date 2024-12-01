import React from "react";
import { useNavigate } from "react-router-dom";
import "./SuccessPage.css";

function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="sos_container">
      <div className="success-container">
        <div className="checkmark-circle">
          <div className="checkmark">✔</div>
        </div>
        <h2>Location Sent Successfully!</h2>
        <p>Your location has been shared for assistance.</p>
        <button
          onClick={() => navigate("/LocationSender")}
          className="back-home-button"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default SuccessPage;
