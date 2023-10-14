import PatientData from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient, EntryWithoutId, Entry } from "../types";
import { v1 as uuid } from 'uuid';

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

const addPatient = (entry: NewPatient): Patient => {
  const id: string = uuid();
  const newPatientEntry = {
    id: id,
    ...entry
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (entry: EntryWithoutId, patient: Patient): Entry => {
  const id: string = uuid();
  const newEntry = {
    id: id,
    ...entry
  };
  patient.entries.push(newEntry);
  return newEntry;
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(p => p.id === id);
  return entry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById,
  addEntry
};