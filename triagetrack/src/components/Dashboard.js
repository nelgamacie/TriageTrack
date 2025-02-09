"use client"

import { useState, useEffect } from "react"
import { usePatientContext } from "./PatientContext"
import QueueList from "./QueueList";  // ✅ Add this import

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

const RemindersBox = () => {
  const { reminders, setReminders } = usePatientContext()

  useEffect(() => {
    const interval = setInterval(() => {
      setReminders((prevReminders) =>
        prevReminders.map((reminder) =>
          reminder.time > 0 ? { ...reminder, time: reminder.time - 1 } : reminder
        )
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [setReminders])

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
          <QueueList />  {/* ✅ Now properly imported */}
          <RemindersBox />
        </div>
      </main>
    </div>
  )
}

export default Dashboard
