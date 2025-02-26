"use client";

import { useState, useEffect } from "react";
import { Upload, X } from "lucide-react";

// Simulated database access
const getMedicalData = () => {
    // In a real application, this would be an API call
    return [
        {
            id: 1,
            problem: "Hypertension",
            medicines: ["Lisinopril", "Amlodipine"],
            symptoms: ["Headache", "Dizziness", "Shortness of breath"],
        },
        {
            id: 2,
            problem: "Diabetes Type 2",
            medicines: ["Metformin", "Gliclazide"],
            symptoms: ["Increased thirst", "Frequent urination", "Fatigue"],
        },
        {
            id: 3,
            problem: "Asthma",
            medicines: ["Albuterol", "Fluticasone"],
            symptoms: ["Wheezing", "Coughing", "Chest tightness"],
        },
    ];
};

const AddEditPatientForm = ({ patient, onSubmit, onCancel }) => {
    const [patientData, setPatientData] = useState(
        patient || {
            name: "",
            age: "",
            gender: "",
            phone: "",
            problem: "",
            medicines: [],
            symptoms: [],
            otherNotes: "",
            prescriptions: [],
        }
    );
    const [medicalData, setMedicalData] = useState([]);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        setMedicalData(getMedicalData());
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPatientData((prev) => ({ ...prev, [name]: value }));

        if (name === "problem") {
            const selectedProblem = medicalData.find(
                (item) => item.problem === value
            );
            if (selectedProblem) {
                setPatientData((prev) => ({
                    ...prev,
                    medicines: selectedProblem.medicines,
                    symptoms: selectedProblem.symptoms,
                }));
            } else {
                setPatientData((prev) => ({
                    ...prev,
                    medicines: [],
                    symptoms: [],
                }));
            }
        }
    };

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const removeFile = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(patientData).forEach((key) => {
            formData.append(key, JSON.stringify(patientData[key]));
        });
        files.forEach((file) => {
            formData.append("prescriptions", file);
        });
        onSubmit(formData);
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                {patient ? "Edit Patient" : "Add New Patient"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Age fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={patientData.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="age"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Age
                        </label>
                        <input
                            id="age"
                            name="age"
                            type="number"
                            value={patientData.age}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                </div>

                {/* Gender and Phone fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label
                            htmlFor="gender"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Gender
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            value={patientData.gender}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Phone
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={patientData.phone}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                </div>

                {/* Problem field */}
                <div>
                    <label
                        htmlFor="problem"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Problem
                    </label>
                    <select
                        id="problem"
                        name="problem"
                        value={patientData.problem}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    >
                        <option value="">Select problem</option>
                        {medicalData.map((item) => (
                            <option key={item.id} value={item.problem}>
                                {item.problem}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Medicines field */}
                <div>
                    <label
                        htmlFor="medicines"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Medicines
                    </label>
                    <div className="mt-1 p-3 bg-gray-50 border border-gray-300 rounded-md min-h-[60px]">
                        {patientData.medicines.length > 0 ? (
                            patientData.medicines.map((medicine, index) => (
                                <span
                                    key={index}
                                    className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm mr-2 mb-2"
                                >
                                    {medicine}
                                </span>
                            ))
                        ) : (
                            <span className="text-gray-500">
                                No medicines selected
                            </span>
                        )}
                    </div>
                </div>

                {/* Symptoms field */}
                <div>
                    <label
                        htmlFor="symptoms"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Symptoms
                    </label>
                    <div className="mt-1 p-3 bg-gray-50 border border-gray-300 rounded-md min-h-[60px]">
                        {patientData.symptoms.length > 0 ? (
                            patientData.symptoms.map((symptom, index) => (
                                <span
                                    key={index}
                                    className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm mr-2 mb-2"
                                >
                                    {symptom}
                                </span>
                            ))
                        ) : (
                            <span className="text-gray-500">
                                No symptoms selected
                            </span>
                        )}
                    </div>
                </div>

                {/* Other Notes field */}
                <div>
                    <label
                        htmlFor="otherNotes"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Other Notes
                    </label>
                    <textarea
                        id="otherNotes"
                        name="otherNotes"
                        value={patientData.otherNotes}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>

                {/* File upload section */}
                <div>
                    <label
                        htmlFor="prescriptions"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Upload Prescriptions
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                                <label
                                    htmlFor="prescriptions"
                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                >
                                    <span>Upload files</span>
                                    <input
                                        id="prescriptions"
                                        name="prescriptions"
                                        type="file"
                                        multiple
                                        className="sr-only"
                                        onChange={handleFileChange}
                                    />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                                PNG, JPG, PDF up to 10MB each
                            </p>
                        </div>
                    </div>
                </div>

                {/* Display uploaded files */}
                {files.length > 0 && (
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Uploaded Files
                        </h3>
                        <ul className="divide-y divide-gray-200">
                            {files.map((file, index) => (
                                <li
                                    key={index}
                                    className="py-3 flex justify-between items-center"
                                >
                                    <div className="flex items-center">
                                        <span className="ml-2 flex-1 w-0 truncate">
                                            {file.name}
                                        </span>
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                        <button
                                            type="button"
                                            onClick={() => removeFile(index)}
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Form buttons */}
                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        {patient ? "Update Patient" : "Add Patient"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEditPatientForm;
