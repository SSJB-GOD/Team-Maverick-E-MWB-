import React ,{ useContext, useEffect }from "react";
import AssessmentPage from "./AssessmentPage"; // Import AssessmentPage component
import "./Dashboard.css"; // Optional CSS for layout adjustments
import Header from "./Header"; // Import Header component
import Sidebar from "./Sidebar"; // Import Sidebar component
import GlobalContext from "./GlobalContext/GlobalContext";






const Dashboard = () => {
 


  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-content">
        <Sidebar />
        <div className="main-content">
          <AssessmentPage />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
