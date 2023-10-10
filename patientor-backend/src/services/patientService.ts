import PatientData from '../../data/patients';
import { Patient, NonSensitivePatient } from "../types";

const patients: Patient[] = PatientData;

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default {
  getEntries,
  getNonSensitiveEntries
};