import Patient from '../models/patientsModel.js';

// Get all patients
export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single patient by ID
export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new patient
export const createPatient = async (req, res) => {
  console.log("Create Patient Called");
  const patient = new Patient(req.body);
  console.log(patient);
  try {
    const newPatient = await patient.save();
    console.log("New Patient Saved");
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a patient by ID
export const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a patient by ID
export const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
