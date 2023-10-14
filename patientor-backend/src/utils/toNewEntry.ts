import { EntryWithoutId, Diagnosis, HealthCheckRating, Discharge, SickLeave } from "../types";

const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('description' in object && 'date' in object && 'specialist' in object && 
  'diagnosisCodes' in object && 'healthCheckRating' in object) {
    const newEntry: EntryWithoutId = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object),
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      type: 'HealthCheck'
    };
    return newEntry;
  } else if ('description' in object && 'date' in object && 'specialist' in object && 
  'diagnosisCodes' in object && 'discharge' in object) {
    const newEntry: EntryWithoutId = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object),
      discharge: parseDischarge(object.discharge),
      type: 'Hospital'
    };
    return newEntry;
  } else if ('description' in object && 'date' in object && 'specialist' in object && 
  'diagnosisCodes' in object && 'employerName' in object && 'sickLeave' in object) {
    const newEntry: EntryWithoutId = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object),
      employerName: parseEmployerName(object.employerName),
      sickLeave: parseSickLeave(object.sickLeave),
      type: 'OccupationalHealthcare'
    };
    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const parseDescription = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing description');
  }
  return name;
};

const parseEmployerName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing employer name');
  }
  return name;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge: ' + discharge);
  } 
  return discharge;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing sick leave: ' + sickLeave);
  } 
  return sickLeave;
};

const parseSpecialist = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing specialist');
  }
  return name;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }
  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isNumber(rating) || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing health check rating: ' + rating);
  }
  return rating;
};

const isDischarge = (param: unknown): param is Discharge => {
  if (typeof param != "object") {
    throw new Error(`Unexpected type: ${typeof param}`);
  } else if (param == null) {
    throw new Error("Unexpected value: null");
  } else if (!("criteria" in param)) {
    throw new Error("Missing property: criteria");
  } else if (typeof param.criteria != "string") {
    throw new Error(`Unexpected type: ${typeof param.criteria}`);
  } else if (!("date" in param)) {
    throw new Error("Missing property: date");
  } else if (typeof param.date != "string") {
    throw new Error(`Unexpected type: ${typeof param.date}`);
  }
  return true;
};

const isSickLeave = (param: unknown): param is SickLeave => {
  if (typeof param != "object") {
    throw new Error(`Unexpected type: ${typeof param}`);
  } else if (param == null) {
    throw new Error("Unexpected value: null");
  } else if (!("startDate" in param)) {
    throw new Error("Missing property: criteria");
  } else if (typeof param.startDate != "string") {
    throw new Error(`Unexpected type: ${typeof param.startDate}`);
  } else if (!("endDate" in param)) {
    throw new Error("Missing property: date");
  } else if (typeof param.endDate != "string") {
    throw new Error(`Unexpected type: ${typeof param.endDate}`);
  }
  return true;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).map(v => v.toString()).includes(param.toString());
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' || value instanceof Number;
};

export default toNewEntry;