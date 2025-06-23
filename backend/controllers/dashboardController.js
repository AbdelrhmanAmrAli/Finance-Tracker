const Income = require('../models/Income');
const Expense = require('../models/Expense');
// const { Types } = require("mongoose");

const getDashboardData = async (req, res) => {
    try {
        const userId = req.user._id;
        // const userObjectId = new Types.ObjectId(String(userId));

        // Fetch total income
        const totalIncome = await Income.aggregate([
            { $match: { userId } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        // Fetch total expenses
        const totalExpenses = await Expense.aggregate([
            { $match: { userId } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        // Calculate balance 
        const balance = (totalIncome[0]?.total || 0) - (totalExpenses[0]?.total || 0);

        // Fetch last 100 transactions
        const incomeRecords = await Income.find({ userId }).sort({ createdAt: -1 }).lean();
        const expenseRecords = await Expense.find({ userId }).sort({ createdAt: -1 }).lean();

        const combined = [
            ...incomeRecords.map(record => ({ ...record, type: 'income' })),
            ...expenseRecords.map(record => ({ ...record, type: 'expense' }))
        ];

        combined.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const lastTransactions = combined.slice(0, 100);


        //final response
        res.status(200).json({
            totalIncome: totalIncome[0]?.total || 0,
            totalExpenses: totalExpenses[0]?.total || 0,
            balance,
            lastTransactions
        });

    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getDashboardData
};
