import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AssessmentPage.css";
import GlobalContext from "./GlobalContext/GlobalContext";


const AssessmentPage = ({}) => {
  // var question = {};
  //calling The getQuestions() fot Getting All The Questions

  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  const [response, setResponse] = useState({});
  const { state } = useContext(GlobalContext);

  const questions = state.questions;
  const userid = state.userid;

  //Giving The Score to The Server
  const storeData = async () => {
    await fetch("http://localhost:8082/api/takeTest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: userid,
        QuestionAndAnswer: response,
      }),
    });
  };
  const handleOptionClick = (optionScore, questionText, option) => {
    setResponse((prev) => ({
      ...prev,
      [questionText]: option,
    }));

    setScore((prevScore) => prevScore + optionScore);
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
    // Calculate the overall score out of 10
    const totalScore = (score / (Object.keys(questions).length * 15)) * 100;

    // Display a message based on the score
    let feedback = "";
    if (totalScore >= 80) {
      feedback =
        "Great job! You have a positive outlook and strong resilience.";
    } else if (totalScore >= 50) {
      feedback =
        "You're doing well, but there may be areas where you could benefit from additional support or self-care.";
    } else {
      feedback =
        "Consider reaching out for support or exploring ways to enhance your well-being.";
    }

    return (
      <div className="assessment-page">
        <h2>Assessment Completed!</h2>
        {
          <p className="score">
            Your Score:{" "}
            {(totalScore.toFixed(2) / 100) * Object.keys(questions).length * 10}
          </p>
        }
        <p className="feedback">{feedback}</p>
        <button onClick={() => navigate("/dashboard")}>{"Back"}</button>
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
        {
          <div>
            <p><b>{questions[currentQuestionIndex.toString()].questionText}</b></p>
            <div className="options">
              {questions[currentQuestionIndex.toString()].choices.map(
                (options, idx) => (
                  <div key={idx}>
                    <input
                      type="radio"
                      name={
                        `question` +
                        questions[currentQuestionIndex.toString().questionText]
                      }
                      defaultValue={options.score}
                      style={{
                        marginLeft: "-500px",
                        marginTop: "15px",
                        cursor: "pointer",
                      }}
                      checked={false}
                      onClick={(e) =>
                        handleOptionClick(
                          options.score,
                          questions[currentQuestionIndex.toString()]
                            .questionText,
                          e.target.value
                        )
                      }
                    ></input>
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
        }
      </div>
    </div>
  );
};

export default AssessmentPage;
