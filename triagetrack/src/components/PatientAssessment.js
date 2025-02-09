"use client"

import { useState } from "react"
import { usePatientContext } from "./PatientContext"
import { useNavigate } from "react-router-dom"

const AssessmentForm = () => {
  const { addPatient } = usePatientContext()
  const navigate = useNavigate()
  const [patientData, setPatientData] = useState({
    name: "",
    age: "",
    triageLevel: 5,
    waitTime: "To be determined",
    notes: "",
    symptoms: {
      fever: false,
      cough: false,
      shortnessOfBreath: false,
      fatigue: false,
      bodyAches: false,
    },
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setPatientData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSymptomChange = (symptom) => {
    setPatientData((prevData) => ({
      ...prevData,
      symptoms: {
        ...prevData.symptoms,
        [symptom]: !prevData.symptoms[symptom],
      },
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPatient = {
      ...patientData,
      symptoms: Object.entries(patientData.symptoms)
        .filter(([_, value]) => value)
        .map(([key]) => key),
    }
    addPatient(newPatient)
    navigate("/")
  }

  return (
    <form onSubmit={handleSubmit} className="assessment-form">
      <h2>Patient Assessment</h2>
      <div className="form-group">
        <label htmlFor="name">Patient Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={patientData.name}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={patientData.age}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="triageLevel">Triage Level:</label>
        <select
          id="triageLevel"
          name="triageLevel"
          value={patientData.triageLevel}
          onChange={handleInputChange}
          className="form-control"
          required
        >
          <option value={1}>1 - Immediate</option>
          <option value={2}>2 - Very Urgent</option>
          <option value={3}>3 - Urgent</option>
          <option value={4}>4 - Standard</option>
          <option value={5}>5 - Non-Urgent</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="notes">Patient Notes:</label>
        <textarea
          id="notes"
          name="notes"
          value={patientData.notes}
          onChange={handleInputChange}
          className="form-control"
          rows={5}
        />
      </div>
      <div className="form-group">
        <h3>Symptoms</h3>
        {Object.entries(patientData.symptoms).map(([symptom, value]) => (
          <div key={symptom} className="symptom-checkbox">
            <input type="checkbox" id={symptom} checked={value} onChange={() => handleSymptomChange(symptom)} />
            <label htmlFor={symptom}>
              {symptom.charAt(0).toUpperCase() + symptom.slice(1).replace(/([A-Z])/g, " $1")}
            </label>
          </div>
        ))}
      </div>
      <button type="submit" className="btn">
        Submit Assessment
      </button>
    </form>
  )
}

const PatientAssessment = () => {
  return (
    <div className="patient-assessment">
      <main className="container">
        <AssessmentForm />
      </main>
    </div>
  )
}

export default PatientAssessment

