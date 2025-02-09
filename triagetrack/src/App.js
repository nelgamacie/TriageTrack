import React, { useState, useEffect, useRef } from "react";
import Dashboard from "./components/Dashboard";
import PatientAssessment from "./components/PatientAssessment";
import PatientProvider from "./components/PatientContext";
import remindersIcon from "./remindersIcon.png";
import "./styles.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"


const Header = () => (
  <header className="header">
    <div className="logo-container">
      <img src="/Black and Blue Simple Medical Health Logo.png" alt="TriageTrack Logo" className="logo" />
      <h1>TriageTrack</h1>
    </div>
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
);




const App = () => {
  useEffect(() => {
    // Check if the script is already added to avoid multiple instances
    if (!document.querySelector("script[src='https://cdn.voiceflow.com/widget/bundle.mjs']")) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
      
      script.onload = () => {
        if (window.voiceflow?.chat) {
          window.voiceflow.chat.load({
            verify: { projectID: "67a842f7c8eee2e3f86f7239" },
            url: "https://general-runtime.voiceflow.com",
            versionID: "production",
          });
        }
      };

      document.body.appendChild(script);
    } else {
      // If script already exists, directly load chat
      if (window.voiceflow?.chat) {
        window.voiceflow.chat.load({
          verify: { projectID: "67a842f7c8eee2e3f86f7239" },
          url: "https://general-runtime.voiceflow.com",
          versionID: "production",
        });
      }
    }

    return () => {
      
      if (window.voiceflow?.chat) {
        window.voiceflow.chat.unload();
      }
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


