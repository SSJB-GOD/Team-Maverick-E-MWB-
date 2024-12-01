import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import illustration from "../assets/illustration.png";
import "./MainContent.css";
function MainContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleStartAssessment = () => {
    navigate("/assessment"); // Navigate to the assessment route
  };
  // alert(location.state === undefined);

  return (
    <div className="main-content">
      <div className="text-section">
        <h2 className="main-title">Assess Your Personal Growth & Well-being</h2>
        <p className="main-description">
          Take a quick, meaningful survey to assess your well-being and mental
          clarity. With SelfAlign, explore your emotions, behaviors, and
          personal development journey. Start today to unlock insights and
          embrace a path toward inner peace, resilience, and growth.
        </p>
        <button className="start-button" onClick={handleStartAssessment}>
          Start Your Assessment
        </button>
      </div>
      <div className="image-section">
        <img src={illustration} alt="Illustration" className="main-image" />
      </div>
    </div>
  );
}

export default MainContent;
