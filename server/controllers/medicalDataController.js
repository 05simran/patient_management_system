import MedicalData from "../models/medicalDataModel.js";

export const createMedicalData = async (req, res) => {
    try {
        const { problem, medicines, symptoms } = req.body;

        const formattedMedicines = Array.isArray(medicines) ? medicines : medicines.split(",").map(med => med.trim());
        const formattedSymptoms = Array.isArray(symptoms) ? symptoms : symptoms.split(",").map(sym => sym.trim());

        const medicalData = await MedicalData.create({
            problem,
            medicines: formattedMedicines,
            symptoms: formattedSymptoms
        });
        console.log("Medication data: " + JSON.stringify(medicalData));

        res.status(201).json(medicalData);
    } catch (error) {
        console.error("Error creating medical data:", error);
        res.status(500).json({ message: "Error creating medical data" });
    }
};

export const getMedicalData = async (req, res) => {
    try {
        const medicalData = await MedicalData.find();
        res.status(200).json(medicalData);
    } catch (error) {
        res.status(500).json({ message: "Error fetching medical data" });
    }
};

export const updateMedicalData = async (req, res) => {
    try {
        const medicalData = await MedicalData.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(medicalData);
    } catch (error) {
        res.status(500).json({ message: "Error updating medical data" });
    }
};

export const deleteMedicalData = async (req, res) => {
    try {
        await MedicalData.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Medical data deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting medical data" });
    }
};