import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo1.png"; // Ensure the correct path to the logo
import "./Header.css";
const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="header-logo">
        <img src={logo} alt="Tranquil Haven Logo" />
        <span className="header-title" style={{ cursor: "pointer" }}>
          Tranquil Haven
        </span>
      </div>
      <div className="header-menu">
        &nbsp;
        <a href="#dashboard" onClick={() => navigate("/dashboard")}>
          Dashboard
        </a>
        <a href="#news">News</a>
        <a href="#chat-bot" onClick={() => navigate("/chatbot")}>
          Chatbot
        </a>
        <a href="#task-creation" onClick={() => navigate("/taskManagement")}>
          Task Creation
        </a>
        <a href="#emergency" onClick={() => navigate("/locationSender")}>
          Emergency
        </a>
        <a href="#mental-well-being">Mental Well-being</a>
        <a
          href="#recommendations"
          onClick={() => navigate("/videoRecommendatins")}
        >
          Recommendations
        </a>
        <a href="#logout" onClick={() => navigate("/")}>
          Logout
        </a>
      </div>
    </div>
  );
};

export default Header;
