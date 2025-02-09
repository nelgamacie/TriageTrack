"use client"

import { useState, useEffect } from "react"
import { usePatientContext } from "./PatientContext"

const getTriageColor = (level) => {
  const colors = {
    1: "var(--color-triage-1)",
    2: "var(--color-triage-2)",
    3: "var(--color-triage-3)",
    4: "var(--color-triage-4)",
    5: "var(--color-triage-5)",
  }
  return colors[level] || "var(--color-triage-5)"
}

const PatientCard = ({ patient, onClick }) => (
  <div className="patient-card" onClick={() => onClick(patient)}>
    <div className="triage-indicator" style={{ backgroundColor: getTriageColor(patient.triageLevel) }}></div>
    <div>
      <h3>{patient.name}</h3>
      <p>Age: {patient.age}</p>
      <p>Triage Level: {patient.triageLevel}</p>
      <p>Wait Time: {patient.waitTime}</p>
    </div>
  </div>
)

const TriageLegend = ({ onFilterChange, currentFilter }) => (
  <div className="triage-legend">
    <div className={`legend-item ${currentFilter === "all" ? "active" : ""}`} onClick={() => onFilterChange("all")}>
      <span>All</span>
    </div>
    {[1, 2, 3, 4, 5].map((level) => (
      <div
        key={level}
        className={`legend-item ${currentFilter === level ? "active" : ""}`}
        onClick={() => onFilterChange(level)}
      >
        <div className="legend-color" style={{ backgroundColor: getTriageColor(level) }}></div>
        <span>Level {level}</span>
      </div>
    ))}
  </div>
)

const PatientDetails = ({ patient, onClose }) => (
  <div className="patient-details">
    <h2>{patient.name}</h2>
    <p>Age: {patient.age}</p>
    <p>Triage Level: {patient.triageLevel}</p>
    <p>Wait Time: {patient.waitTime}</p>
    <h3>Notes</h3>
    <p>{patient.notes}</p>
    <h3>Symptoms</h3>
    <ul>
      {patient.symptoms.map((symptom, index) => (
        <li key={index}>{symptom}</li>
      ))}
    </ul>
    <button className="btn" onClick={onClose}>
      Close
    </button>
  </div>
)

const QueueList = () => {
  const { patients } = usePatientContext()
  const [filter, setFilter] = useState("all")
  const [selectedPatient, setSelectedPatient] = useState(null)

  const filteredPatients =
    filter === "all" ? patients : patients.filter((patient) => patient.triageLevel === Number.parseInt(filter))

  return (
    <div className="queue-list">
      <h2>Current Queue</h2>
      <TriageLegend onFilterChange={setFilter} currentFilter={filter} />
      {filteredPatients.map((patient) => (
        <PatientCard key={patient.id} patient={patient} onClick={setSelectedPatient} />
      ))}
      {selectedPatient && <PatientDetails patient={selectedPatient} onClose={() => setSelectedPatient(null)} />}
    </div>
  )
}

const RemindersBox = () => {
  const [reminders, setReminders] = useState([
    { id: 1, text: "Check on John Doe's pain level", time: 200 },
    { id: 2, text: "Reassess Jane Smith's fever", time: 1800 },
    { id: 3, text: "Follow up on Bob Johnson's test results", time: 3600 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setReminders((prevReminders) =>
        prevReminders.map((reminder) =>
          reminder.time > 0 ? { ...reminder, time: reminder.time - 1 } : reminder
        )
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="reminders-box">
      <h2>Reminders</h2>
      {reminders.map((reminder) => (
        <div key={reminder.id} className={`reminder-item ${reminder.time <= 300 ? "flashing" : ""}`}>
          <p>{reminder.text}</p>
          <p className="reminder-time">{formatTime(reminder.time)}</p>
        </div>
      ))}
    </div>
  )
}

const Dashboard = () => {
  return (
    <div className="dashboard">
      <main className="container">
        <div className="dashboard-content">
          <QueueList />
          <RemindersBox />
        </div>
      </main>
    </div>
  )
}

export default Dashboard
