import React, { useState, useEffect, useRef } from "react";
import Dashboard from "./components/Dashboard";
import PatientAssessment from "./components/PatientAssessment";
import PatientProvider from "./components/PatientContext";
import remindersIcon from "./remindersIcon.png";
import "./styles.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"


const Header = () => (
  <header className="header">
    <h1>TriageTrack</h1>
    <div className="header-right">
      <nav>
        <Link to="/" className="nav-link">
          Dashboard
        </Link>
        <Link to="/assess" className="nav-link">
          Assess Patient
        </Link>
      </nav>
      <img src={remindersIcon} alt="Reminder" className="reminder-icon" />
    </div>
  </header>
)



const App = () => {

  useEffect(() => {
  
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
    
    // Define the script's onload behavior
    script.onload = () => {
      window.voiceflow.chat.load({
        verify: { projectID: "67a842f7c8eee2e3f86f7239" },
        url: "https://general-runtime.voiceflow.com",
        versionID: "production",
      });
    };
    // Append the script to the document body
    document.body.appendChild(script);
    // Cleanup: Remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <PatientProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/assess" element={<PatientAssessment />} />
        </Routes>
      </Router>
    </PatientProvider>
  )
}

export default App


