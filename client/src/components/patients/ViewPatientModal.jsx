const ViewPatientModal = ({ patient, isOpen, onClose }) => {
    if (!patient || !isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Patient Details</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold">Name</h4>
                        <p>{patient.name}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Age</h4>
                        <p>{patient.age}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Gender</h4>
                        <p>{patient.gender}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Email</h4>
                        <p>{patient.email}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Phone</h4>
                        <p>{patient.phone}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Problem</h4>
                        <p>{patient.problem}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Medicine</h4>
                        <p>{patient.medicine}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Symptoms</h4>
                        <p>{patient.symptoms}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Other Notes</h4>
                        <p>{patient.otherNotes}</p>
                    </div>
                </div>
                <div className="mt-6">
                    <button
                        onClick={onClose}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewPatientModal;
