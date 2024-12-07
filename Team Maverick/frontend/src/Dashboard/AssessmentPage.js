import React, { useContext, useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AssessmentPage.css";
import GlobalContext from "./GlobalContext/GlobalContext";

const AssessmentPage = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  const [response, setResponse] = useState({});
  const [status, setStatus] = useState("");
  const [score, setScore] = useState(0);
  const [recommendations, setRecommendations] = useState([]);
  const { state } = useContext(GlobalContext);
  const { updateState } = useContext(GlobalContext); // Access the updateState function

  const questions = state.questions;
  const userid = state.userid;

  



  // Store test responses in the backend
  const storeData = async () => {
    try {
      const result = await fetch("http://localhost:8082/api/takeTest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userid,
          QuestionAndAnswer: response,
        }),
      });
  
      if (result.ok) {
        const latestResult = await fetchTestResults(); // Fetch the latest test result
        if (latestResult && latestResult.id) {
          await fetchRecommendations(latestResult.id); // Fetch recommendations based on the latest result
        }
      } else {
        console.error("Failed to store test data");
      }
    } catch (error) {
      console.error("Error storing test data:", error);
    }
  };
  

// Fetch the latest test result from the backend
const fetchTestResults = async () => {
  try {
    const result = await fetch(
      `http://localhost:8082/api/getTestResults?id=${userid}`
    );
    const data = await result.json();

    if (data) {
      setStatus(data.status); // Set the status
      setScore(data.score);   // Set the score
      return data;            // Return the result object for further use
    }
  } catch (error) {
    console.error("Error fetching test results:", error);
  }
};


// Fetch recommendations from the backend
const fetchRecommendations = async (testId) => {
  try {
    const response = await fetch(
      `http://localhost:8082/api/getRecommendations?id=${testId}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch recommendations: ${response.status}`);
    }
    
    const data = await response.json();

    alert("Test score saved successfully!");

    if (data.recommendation && data.recommendation.length > 0) {
      setRecommendations(data.recommendation);
    } else {
      console.error("No recommendations found in the response.");
    }
  } catch (error) {
    console.error("Error fetching recommendations:", error);
  }
};


  const handleOptionClick = (optionScore, questionText, option) => {
    setResponse((prev) => ({
      ...prev,
      [questionText]: option,
    }));

    if (currentQuestionIndex < Object.keys(questions).length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setAssessmentCompleted(true);
      storeData();
    }
  };

  
  const progress =
    ((currentQuestionIndex + 1) / Object.keys(questions).length) * 100;
    if (assessmentCompleted) {
      
      return (
        <div className="assessment-page">
          <h2>Assessment Completed!</h2>
          <p className="score">Your Score: {score}</p>
          <p className="status">Status: {status}</p>
          <div className="recommendations">
            <h3>Recommendations:</h3>
            {recommendations.length > 0 ? (
              <ul>
                {recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            ) : (
              <p>Loading recommendations...</p>
              
            )}

            <p style={{fontSize:"13px", marginTop:"12px", marginBottom:"12px"}}><i>Note: This assessment is not a diagnostic tool. Please consult with qualified mental health professional for proper evaluation. </i></p>
            
          </div>
          
          <button style={{marginTop:"50px"}} onClick={() => navigate("/dashboard")}>{"Back"}</button>
        </div>
        
      );
      
    }
    
    
  return (
    <div className="assessment-page">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      <h2>
        Question {currentQuestionIndex + 1} of {Object.keys(questions).length}
      </h2>
      <div>
        <div>
          <p>
            <b>{questions[currentQuestionIndex.toString()].questionText}</b>
          </p>
          <div className="options">
            {questions[currentQuestionIndex.toString()].choices.map(
              (options, idx) => (
                <div key={idx}>
                  <input
                    type="radio"
                    name={`question${currentQuestionIndex}`}
                    value={options.option}
                    style={{
                      marginLeft: "-500px",
                      marginTop: "15px",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      handleOptionClick(
                        options.score,
                        questions[currentQuestionIndex.toString()].questionText,
                        options.option
                      )
                    }
                  />
                  <label
                    className="input"
                    style={{
                      marginLeft: " 30px",
                      marginTop: "-40px",
                      paddingTop: "20px",
                    }}
                  >
                    {options.option}
                  </label>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      
    </div>
    
  );
};

export default AssessmentPage;
