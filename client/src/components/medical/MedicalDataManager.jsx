import { useState, useEffect } from "react";

// Simulated database
// const db = {
//     medicalData: [
//         {
//             id: 1,
//             problem: "Hypertension",
//             medicines: ["Lisinopril", "Amlodipine"],
//             symptoms: ["Headache", "Dizziness", "Shortness of breath"],
//         },
//         {
//             id: 2,
//             problem: "Diabetes Type 2",
//             medicines: ["Metformin", "Gliclazide"],
//             symptoms: ["Increased thirst", "Frequent urination", "Fatigue"],
//         },
//         {
//             id: 3,
//             problem: "Asthma",
//             medicines: ["Albuterol", "Fluticasone"],
//             symptoms: ["Wheezing", "Coughing", "Chest tightness"],
//         },
//     ],
// };

const MedicalDataManager = () => {
    const [medicalData, setMedicalData] = useState([]);
    const [newItem, setNewItem] = useState({
        problem: "",
        medicines: "",
        symptoms: "",
    });

    useEffect(() => {
        fetchMedicalData();
    }, []);

    const fetchMedicalData = async () => {
        const response = await fetch("http://localhost:5000/api/medical-data");
        const data = await response.json();
        setMedicalData(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newEntry = {
            problem: newItem.problem,
            medicines: newItem.medicines.split(",").map(med => med.trim()),
            symptoms: newItem.symptoms.split(",").map(sym => sym.trim()),
        };
        await fetch("http://localhost:5000/api/medical-data", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEntry),
        });
        fetchMedicalData();
        setNewItem({ problem: "", medicines: "", symptoms: "" });
    };

    return (
        <div className="space-y-4 p-8">
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Manage Medical Data</h2>
                <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                    <div>
                        <label
                            htmlFor="problem"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Problem
                        </label>
                        <input
                            id="problem"
                            type="text"
                            value={newItem.problem}
                            onChange={(e) =>
                                setNewItem({
                                    ...newItem,
                                    problem: e.target.value,
                                })
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="medicines"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Medicines (comma-separated)
                        </label>
                        <input
                            id="medicines"
                            type="text"
                            value={newItem.medicines}
                            onChange={(e) =>
                                setNewItem({
                                    ...newItem,
                                    medicines: e.target.value,
                                })
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="symptoms"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Symptoms (comma-separated)
                        </label>
                        <input
                            id="symptoms"
                            type="text"
                            value={newItem.symptoms}
                            onChange={(e) =>
                                setNewItem({
                                    ...newItem,
                                    symptoms: e.target.value,
                                })
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Add Medical Data
                    </button>
                </form>

                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Problem
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Medicines
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Symptoms
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {medicalData.map((item) => (
                            <tr key={item.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {item.problem}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {item.medicines.join(", ")}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {item.symptoms.join(", ")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MedicalDataManager;
