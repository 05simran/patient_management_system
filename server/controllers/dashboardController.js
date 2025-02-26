import Patient from "../models/patientsModel.js";
import Invoice from "../models/invoiceModel.js";
import MedicalData from "../models/medicalDataModel.js";

export const getDashboardData = async (req, res) => {
    try {
        // Count today's patient visits
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const patientsVisitedToday = await Patient.countDocuments({
            lastVisit: { $gte: today }
        });

        // Sum total revenue collected today
        const invoicesToday = await Invoice.aggregate([
            { $match: { date: { $gte: today.toISOString() } } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        const amountCollectedToday = invoicesToday.length > 0 ? invoicesToday[0].total : 0;

        // Count patients this month
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const patientsThisMonth = await Patient.countDocuments({ lastVisit: { $gte: firstDayOfMonth } });

        // Count active treatments (patients with ongoing treatment)
        const activeTreatments = await Patient.countDocuments({ status: "active" });

        // Get common medical problems
        const problemCounts = await MedicalData.aggregate([
            { $group: { _id: "$problem", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 } // Top 5 most common problems
        ]);

        const stats = [
            {
                title: "Patients Visited Today",
                value: patientsVisitedToday,
                icon: "Users",
                trend: "+20% from yesterday", // Placeholder, can be dynamically calculated
            },
            {
                title: "Amount Collected Today",
                value: `${amountCollectedToday.toFixed(2)}`,
                icon: "DollarSign",
                trend: "+15% from yesterday",
            },
            {
                title: "Patients This Month",
                value: patientsThisMonth,
                icon: "CalendarDays",
                trend: "+8.1% from last month",
            },
            {
                title: "Active Treatments",
                value: activeTreatments,
                icon: "Activity",
                trend: "+2.5% from last week",
            },
        ];

        const commonProblems = problemCounts.map((item) => ({
            problem: item._id,
            count: item.count,
            trend: Math.floor(Math.random() * 10) + 1, // Random trend % for now
        }));

        res.json({ stats, commonProblems });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ message: "Error fetching dashboard data" });
    }
};
