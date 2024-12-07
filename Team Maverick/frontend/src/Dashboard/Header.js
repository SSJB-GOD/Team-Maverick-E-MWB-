import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo1.png"; // Ensure the correct path to the logo
import "./Header.css";

// const Header = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="header">
//       <div className="header-logo">
//         <img src={logo} alt="Tranquil Haven Logo" />
//         <span className="header-title" style={{ cursor: "pointer" }}>
//           Tranquil Haven
//         </span>
//       </div>
//       <div className="header-menu">
//         &nbsp;
//         <a href="#dashboard" onClick={() => navigate("/dashboard")}>
//           Dashboard
//         </a>
//         <a href="#NewsApp" onClick={() => navigate("/NewsApp")}>News</a>
//         {/* <a href="#chat-bot" onClick={() => navigate("/chatbot")}>
//           Chatbot
//         </a> */}
//         <a href="#task-creation" onClick={() => navigate("/taskManagement")}>
//           Task Creation
//         </a>
//         <a href="#emergency" onClick={() => navigate("/locationSender")}>
//           Emergency
//         </a>
//         <a href="#mental-well-being">Mental Well-being</a>
//         <a
//           href="#recommendations"
//           onClick={() => navigate("/videoRecommendatins")}
//         >
//           Recommendations
//         </a>
//         <a href="#logout" onClick={() => navigate("/")}>
//           Logout
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Header;



import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="header-logo">
        <img src={logo} alt="Tranquil Haven Logo" />
        <Link to="/dashboard" className="header-title">
          Tranquil Haven
        </Link>
      </div>
      <div className="header-menu">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/News">News</Link>
        <Link to="/taskManagement">Task Creation</Link>
        <Link to="/locationSender">Emergency</Link>
        <Link to="/mental-wellbeing">Mental Well-being</Link>
        <Link to="/videoRecommendatins">Recommendations</Link>
        <Link to="/" onClick={() => {
          // Add any logout logic here if needed
        }}>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Header;