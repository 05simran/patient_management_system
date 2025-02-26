import Medicine from "../models/medicineModel.js";

export const createMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.create(req.body);
        res.status(201).json(medicine);
    } catch (error) {
        res.status(500).json({ message: "Error creating medicine" });
    }
};

export const getMedicines = async (req, res) => {
    try {
        const medicines = await Medicine.find();
        res.status(200).json(medicines);
    } catch (error) {
        res.status(500).json({ message: "Error fetching medicines" });
    }
};

export const updateMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(medicine);
    } catch (error) {
        res.status(500).json({ message: "Error updating medicine" });
    }
};

export const deleteMedicine = async (req, res) => {
    try {
        await Medicine.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Medicine deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting medicine" });
    }
};