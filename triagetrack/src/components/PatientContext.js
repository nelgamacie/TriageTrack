"use client"

import { createContext, useState, useContext } from "react"

const PatientContext = createContext()

export const usePatientContext = () => useContext(PatientContext)

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([])

  const addPatient = (patient) => {
    setPatients((prevPatients) => [...prevPatients, { ...patient, id: Date.now() }])
  }

  return <PatientContext.Provider value={{ patients, addPatient }}>{children}</PatientContext.Provider>
}

export default PatientProvider

