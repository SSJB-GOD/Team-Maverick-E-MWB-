import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Chatbot from "./Chatbot/ChatBot";
import AssessmentPage from "./Dashboard/AssessmentPage"; // Import the assessment page
import Header from "./Dashboard/Header";
import MainContent from "./Dashboard/MainContent";
import LoginPage from "./Login/loginPage";
import Signup from "./Signup/SignUp";
import EmergencyApp from "./SOS/EmergencyApp";
import ManageContacts from "./SOS/ManageContacts";
import SuccessPage from "./SOS/SuccessPage";
import TaskManagementApp from "./TaskManagement/TaskManagementApp";
import VideoRecommendationsApp from "./VideoRecommendations/VideoRecommendationsApp";
import NewsApp from "./News/NewsApp";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Header is rendered globally */}
        <Header />
        {/* Chatbox is rendered globally */}
        <Chatbot />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<MainContent />} />
          <Route path="/News" element={<NewsApp />} />
          <Route path="/assessment" element={<AssessmentPage />} />{" "}
          <Route
            path="/locationSender"
            element={<EmergencyApp></EmergencyApp>}
          ></Route>
          <Route path="/manage-contacts" element={<ManageContacts />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route
            path="/videoRecommendatins"
            element={<VideoRecommendationsApp></VideoRecommendationsApp>}
          />
          <Route
            path="/taskManagement"
            element={<TaskManagementApp></TaskManagementApp>}
          ></Route>
          <Route path="/chatbot" element={<Chatbot></Chatbot>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
