import React, { useState, useEffect } from "react";
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

