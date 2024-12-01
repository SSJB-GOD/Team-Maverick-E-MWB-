import React from "react";
import "./SuccessPage.css";

function SuccessPage() {
  return (
    <div className="success-container">
      <div className="checkmark-circle">
        <div className="checkmark">✔</div>
      </div>
      <h2>Location Sent Successfully!</h2>
      <p>Your location has been shared for assistance.</p>
    </div>
  );
}

export default SuccessPage;
