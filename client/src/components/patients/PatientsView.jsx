"use client";

import { useState } from "react";
import {
    UserPlus,
    Search,
    Filter,
    Edit,
    Trash2,
    Eye,
    Printer,
} from "lucide-react";
import AddEditPatientForm from "./AddEditPatientForm";
import ViewPatientModal from "./ViewPatientModal";
import InvoiceGenerator from "../invoices/InvoiceGenerator";

const PatientsView = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddEditForm, setShowAddEditForm] = useState(false);
    const [editingPatient, setEditingPatient] = useState(null);
    const [viewingPatient, setViewingPatient] = useState(null);
    const [deletingPatient, setDeletingPatient] = useState(null);
    const [patients, setPatients] = useState([
        {
            id: 1,
            name: "Sarah Johnson",
            age: 45,
            gender: "Female",
            phone: "+1 234-567-8900",
            email: "sarah.j@example.com",
            problem: "Hypertension",
            medicines: ["Lisinopril", "Amlodipine"],
            symptoms: ["Headaches", "Dizziness", "Shortness of breath"],
            lastVisit: "2023-05-15",
            status: "Active",
            otherNotes: "Patient is responding well to current medication.",
        },
        {
            id: 2,
            name: "Michael Chen",
            age: 32,
            gender: "Male",
            phone: "+1 234-567-8901",
            email: "m.chen@example.com",
            problem: "Diabetes Type 2",
            medicines: ["Metformin"],
            symptoms: ["Increased thirst", "Frequent urination"],
            lastVisit: "2023-05-14",
            status: "Scheduled",
            otherNotes: "Patient needs to schedule a follow-up appointment.",
        },
        {
            id: 3,
            name: "Emily Davis",
            age: 28,
            gender: "Female",
            phone: "+1 234-567-8902",
            email: "e.davis@example.com",
            problem: "Pregnancy",
            medicines: ["Prenatal vitamins"],
            symptoms: ["Morning sickness", "Fatigue"],
            lastVisit: "2023-05-10",
            status: "Active",
            otherNotes: "Patient is progressing well with her pregnancy.",
        },
    ]);

    const [showInvoice, setShowInvoice] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "active":
                return "bg-green-100 text-green-800";
            case "scheduled":
                return "bg-blue-100 text-blue-800";
            case "inactive":
                return "bg-gray-100 text-gray-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const handleAddEditPatient = (patientData) => {
        if (editingPatient) {
            setPatients((prev) =>
                prev.map((p) =>
                    p.id === editingPatient.id
                        ? { ...p, ...patientData, id: p.id }
                        : p
                )
            );
        } else {
            setPatients((prev) => [
                ...prev,
                {
                    ...patientData,
                    id: prev.length + 1,
                    status: "Active",
                    lastVisit: new Date().toISOString().split("T")[0],
                },
            ]);
        }
        setShowAddEditForm(false);
        setEditingPatient(null);
    };

    const handleDeletePatient = () => {
        setPatients((prev) => prev.filter((p) => p.id !== deletingPatient.id));
        setDeletingPatient(null);
    };

    return (
        <div className="space-y-4 p-8">
            {showAddEditForm ? (
                <AddEditPatientForm
                    patient={editingPatient}
                    onSubmit={handleAddEditPatient}
                    onCancel={() => {
                        setShowAddEditForm(false);
                        setEditingPatient(null);
                    }}
                />
            ) : showInvoice ? (
                <InvoiceGenerator
                    patient={selectedPatient}
                    onSubmit={(invoiceData) => {
                        // Handle invoice submission
                        console.log("Invoice submitted:", invoiceData);
                        setShowInvoice(false);
                    }}
                    onClose={() => setShowInvoice(false)}
                />
            ) : (
                <div className="bg-white shadow rounded-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Patients List</h2>
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
                            onClick={() => setShowAddEditForm(true)}
                        >
                            <UserPlus className="h-5 w-5 mr-2" />
                            Add New Patient
                        </button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search patients..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-md"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center">
                            <Filter className="h-5 w-5 mr-2" />
                            Filter
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="py-2 px-4 text-left">
                                        Name
                                    </th>
                                    <th className="py-2 px-4 text-left">Age</th>
                                    <th className="py-2 px-4 text-left">
                                        Gender
                                    </th>
                                    <th className="py-2 px-4 text-left hidden md:table-cell">
                                        Phone
                                    </th>
                                    <th className="py-2 px-4 text-left hidden lg:table-cell">
                                        Problem
                                    </th>
                                    <th className="py-2 px-4 text-left">
                                        Status
                                    </th>
                                    <th className="py-2 px-4 text-left">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {patients.map((patient) => (
                                    <tr key={patient.id} className="border-b">
                                        <td className="py-2 px-4">
                                            <div>
                                                <div className="font-medium">
                                                    {patient.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {patient.email}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4">
                                            {patient.age}
                                        </td>
                                        <td className="py-2 px-4">
                                            {patient.gender}
                                        </td>
                                        <td className="py-2 px-4 hidden md:table-cell">
                                            {patient.phone}
                                        </td>
                                        <td className="py-2 px-4 hidden lg:table-cell">
                                            {patient.problem}
                                        </td>
                                        <td className="py-2 px-4">
                                            <span
                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                                                    patient.status
                                                )}`}
                                            >
                                                {patient.status}
                                            </span>
                                        </td>
                                        <td className="py-2 px-4">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() =>
                                                        setViewingPatient(
                                                            patient
                                                        )
                                                    }
                                                    className="text-blue-500 hover:text-blue-700"
                                                >
                                                    <Eye className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setEditingPatient(
                                                            patient
                                                        );
                                                        setShowAddEditForm(
                                                            true
                                                        );
                                                    }}
                                                    className="text-yellow-500 hover:text-yellow-700"
                                                >
                                                    <Edit className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedPatient(
                                                            patient
                                                        );
                                                        setShowInvoice(true);
                                                    }}
                                                    className="text-green-500 hover:text-green-700"
                                                >
                                                    <Printer className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        setDeletingPatient(
                                                            patient
                                                        )
                                                    }
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {viewingPatient && (
                <ViewPatientModal
                    patient={viewingPatient}
                    isOpen={!!viewingPatient}
                    onClose={() => setViewingPatient(null)}
                />
            )}

            {deletingPatient && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg max-w-sm w-full">
                        <h2 className="text-lg font-bold mb-4">
                            Confirm Deletion
                        </h2>
                        <p className="mb-4">
                            Are you sure you want to delete{" "}
                            {deletingPatient.name}s record? This action cannot
                            be undone.
                        </p>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setDeletingPatient(null)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeletePatient}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PatientsView;
