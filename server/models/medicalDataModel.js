import mongoose from "mongoose";

const medicalDataSchema = new mongoose.Schema({
    problem: String,
    medicines: [String],
    symptoms: [String],
});

export default mongoose.model("MedicalData", medicalDataSchema);