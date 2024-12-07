import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo1.png";
import GlobalContext from "../Dashboard/GlobalContext/GlobalContext"; // Import the GlobalContext
import Signup from "../Signup/SignUp";
import "./loginpage.css";

const LoginPage = () => {
  const [page, setPage] = useState("login");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { updateState } = useContext(GlobalContext); // Access the updateState function

  const GetQuestions = async () => {
    try {
      const response = await fetch(
        "http://localhost:8082/api/questions/getQuestions"
      );
      if (!response.ok) throw new Error("Invalid Request");
      const questions = await response.json();
      updateState("questions", questions); // Store questions in global context
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    GetQuestions();
  }, []);

  const toggleForm = () => {
    setPage(page === "login" ? "signup" : "login");
  };

  const validateLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    
    const getData = async () => {
      try {
        if (!email || !password) {
          setError("Email and password are required");
          return;
        }
    
        setIsLoading(true);
    
        const response = await fetch("http://localhost:8080/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
    
        // Important: Check response status explicitly
        if(response.ok){
          alert("Login Successful.")
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Login failed');
          
        }
    
        const data = await response.json();
        updateState("userid", data.id);
        localStorage.setItem('userToken', data.token);
        navigate("/dashboard");
    
      } catch (err) {
        console.error('Login Error:', err.message);
        setError(err.message || "An error occurred during login");
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  };

  return page === "login" ? (
    <div className="login-page">
      <div className="header">
        <img className="logo" src={logo} alt="Logo" />
        <span className="site-title">Tranquil Haven</span>
      </div>
      <div className="login-container">
        <h2>Login to Your Account</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={validateLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-container">
              <i className="uil uil-envelope icon"></i>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                defaultValue={""}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <i className="uil uil-lock icon"></i>
              <input
                type="password"
                id="password"
                name="password"
                defaultValue={""}
                placeholder="Enter Your Password"
                required
              />
            </div>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <button type="reset" className="reset-button">
            Forgot Password
          </button>
        </form>
        <p className="register-link">
          Not Yet Registered?{" "}
          <a onClick={toggleForm} href="#signup">
            Register here
          </a>
        </p>
      </div>
    </div>
  ) : (
    <Signup />
  );
};

export default LoginPage;
