import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserDetails() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name || !phoneNumber) {
        alert("Please enter your name and phone number.");
        return;
    }

    // Validate phone number
    if (!/^\d{10}$/.test(phoneNumber)) {
        alert("Invalid phone number: Please enter a 10-digit number.");
        return;
    }

    // Store user details in local storage
    localStorage.setItem("userName", name);
    localStorage.setItem("userPhoneNumber", phoneNumber);

    // Redirect to the location fetching page
    navigate("/location");
};

  return (
    <div className="container">
      <h2>Enter Your Details</h2>
      <input
        type="text"
        placeholder="Enter Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Your Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={handleSubmit}>Continue</button>
    </div>
  );
}

export default UserDetails;
