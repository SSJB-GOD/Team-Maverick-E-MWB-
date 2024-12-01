import React from "react";
import { useNavigate } from "react-router-dom";
import Ppic from "../assets/Ppic.png"; // Ensure the image is located here
import "./signup.css";
const Signup = () => {
  const navigate = useNavigate();
  const handleSignup = (event) => {
    event.preventDefault(); // Prevent page reload

    // Retrieve form values
    const firstName = event.target["first-name"].value;
    const lastName = event.target["last-name"].value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirm_pwd = event.target["confirm-pwd"];
    if (password != confirm_pwd.value) {
      alert("The Password is Mismatched");
      confirm_pwd.style.border = "1px solid red";
      return;
    }
    // Check if user already exists in localStorage
    if ((confirm_pwd.style.border = "1px solid red")) {
      confirm_pwd.style.border = "1px solid black";
    }
    // Create user object
    const userData = { firstName, lastName, email, password };

    // Save to localStorage

    // Notify success
    const StoreUserData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password,
            username: firstName + lastName,
            phoneNumber: null,
          }),
        });

        const data = await response.json();
        console.log(data.user.id);
        if (data.user.id === undefined || data.user.id == null)
          alert("The User Already Exists");
        else {
          alert("Registered Successfull");
          window.location.href = "/";
        }
      } catch (e) {
        console.log(e);
      }
    };
    StoreUserData();

    // Redirect to login page
    // window.location.href = "/"; // Update this URL based on your routing
  };

  return (
    <div className="signup-container">
      <div className="form-container">
        <h2>Create Your Account</h2>
        <form id="signup-form" onSubmit={handleSignup}>
          <label htmlFor="first-name">
            First Name <span className="required">*</span>
          </label>
          <input
            className="input-field"
            type="text"
            id="first-name"
            name="first-name"
            required
          />

          <label htmlFor="last-name">
            Last Name <span className="required">*</span>
          </label>
          <input
            className="input-field"
            type="text"
            id="last-name"
            name="last-name"
            required
          />

          <label htmlFor="email">
            Email <span className="required">*</span>
          </label>
          <input
            className="input-field"
            type="email"
            id="email"
            name="email"
            required
          />

          <label htmlFor="password">
            Password <span className="required">*</span>
          </label>
          <input
            className="input-field"
            type="password"
            id="password"
            name="password"
            required
          />
          <label htmlFor="confirm-pwd">
            Confirm Password <span className="required">*</span>
          </label>
          <input
            className="input-field"
            type="password"
            id="confirm-pwd"
            name="confirm-pwd"
            required
          />

          <button type="submit">Register</button>
        </form>
        <span
          type="submit"
          onClick={() => navigate("/")}
          style={{
            position: "absolute",
            marginTop: "580px",
            marginLeft: "550px",
            color: "green",
            fontSize: "20px",
          }}
        >
          Already Have an Account
        </span>
        <a
          style={{
            position: "absolute",
            marginTop: "580px",
            marginLeft: "890px",
            width: "200px",
            paddingLeft: "-100px",
            textDecoration: "underline",
            color: "blue",
            fontSize: "20px",
            cursor: "pointer",
          }}
          onClick={() => {
            window.location.href = "/";
          }}
        >
          ? Click Here{" "}
        </a>
      </div>
      <div className="image-container">
        <img src={Ppic} alt="Signup" />
      </div>
    </div>
  );
};

export default Signup;
