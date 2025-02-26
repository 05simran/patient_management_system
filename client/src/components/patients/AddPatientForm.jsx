import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

// Mock API for medicine recommendations
const getMedicineRecommendations = async (problem) => {
    // In a real application, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay

    const recommendations = {
        headache: ["Aspirin", "Ibuprofen", "Acetaminophen"],
        fever: ["Acetaminophen", "Ibuprofen", "Naproxen"],
        cough: ["Dextromethorphan", "Guaifenesin", "Benzonatate"],
        allergies: ["Cetirizine", "Loratadine", "Fexofenadine"],
        // Add more conditions and recommendations as needed
    };

    const lowercaseProblem = problem.toLowerCase();
    for (const [condition, medicines] of Object.entries(recommendations)) {
        if (lowercaseProblem.includes(condition)) {
            return medicines;
        }
    }

    return ["No specific recommendations"];
};

const AddPatientForm = ({ onSubmit, onCancel }) => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/patients");
                if (!response.ok) {
                    throw new Error("Failed to fetch patients");
                }
                const data = await response.json();
                setPatients(data);
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        };
        fetchPatients();
    }, []);
    const [patientData, setPatientData] = useState({
        name: "",
        age: "",
        gender: "",
        areaOfConcern: "",
        symptoms: "",
        problem: "",
        recommendedMedicine: "",
    });

    const [medicineRecommendations, setMedicineRecommendations] = useState([]);

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (patientData.problem) {
                getMedicineRecommendations(patientData.problem).then(
                    setMedicineRecommendations
                );
            }
        }, 500);

        return () => clearTimeout(debounce);
    }, [patientData.problem]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPatientData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/patients", {
                method: patients ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(patientData),
            });
            if (!response.ok) {
                throw new Error("Failed to save patient");
            }
            const data = await response.json();
            onSubmit(data);
        } catch (error) {
            console.error("Error saving patient:", error);
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Add New Patient</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={patientData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="age">Age</Label>
                            <Input
                                id="age"
                                name="age"
                                type="number"
                                value={patientData.age}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select
                            name="gender"
                            onValueChange={(value) =>
                                setPatientData((prev) => ({
                                    ...prev,
                                    gender: value,
                                }))
                            }
                        >
                            <SelectTrigger className="bg-white text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none">
                                <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent
                                className="bg-white text-black border border-gray-300 rounded-md"
                                style={{ backgroundColor: "pink" }}
                            >
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="areaOfConcern">Area of Concern</Label>
                        <Input
                            id="areaOfConcern"
                            name="areaOfConcern"
                            value={patientData.areaOfConcern}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="symptoms">Symptoms</Label>
                        <Textarea
                            id="symptoms"
                            name="symptoms"
                            value={patientData.symptoms}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="problem">Problem Description</Label>
                        <Textarea
                            id="problem"
                            name="problem"
                            value={patientData.problem}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="recommendedMedicine">
                            Recommended Medicine
                        </Label>
                        <Select
                            name="recommendedMedicine"
                            onValueChange={(value) =>
                                setPatientData((prev) => ({
                                    ...prev,
                                    recommendedMedicine: value,
                                }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select recommended medicine" />
                            </SelectTrigger>
                            <SelectContent>
                                {medicineRecommendations.map(
                                    (medicine, index) => (
                                        <SelectItem
                                            key={index}
                                            value={medicine}
                                        >
                                            {medicine}
                                        </SelectItem>
                                    )
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="submit">Add Patient</Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default AddPatientForm;
