import { createContext, useState, useContext } from "react"

const PatientContext = createContext()

export const usePatientContext = () => useContext(PatientContext)

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([])
  const [reminders, setReminders] = useState([])

  const getReminderTime = (triageLevel) => {
    switch (triageLevel) {
      case 2: return 900;   // 15 minutes
      case 3: return 1800;  // 30 minutes
      case 4: return 2700;  // 45 minutes
      case 5: return 3600;  // 1 hour
      default: return 900;  // Default to 15 minutes
    }
  }

  const addPatient = (patient) => {
    const newPatient = { ...patient, id: Date.now() }
    setPatients((prevPatients) => [...prevPatients, newPatient])

    // Add a reminder based on the patient's triage level
    addReminder(`Follow up with ${newPatient.name}`, getReminderTime(newPatient.triageLevel))
  }

  const addReminder = (text, time) => {
    setReminders((prevReminders) => [
      ...prevReminders,
      { id: Date.now(), text, time },
    ])
  }

  return (
    <PatientContext.Provider value={{ patients, setPatients, addPatient, reminders, setReminders, addReminder }}>
      {children}
    </PatientContext.Provider>
  )
}

export default PatientProvider
