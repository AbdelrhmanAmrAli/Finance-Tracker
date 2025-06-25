const Income = require('../models/Income');
const Expense = require('../models/Expense');

const getDashboardData = async (req, res) => {
    try {
        const userId = req.user._id;

        // Total income & expenses already present
        const [totalIncomeAgg, totalExpensesAgg] = await Promise.all([
            Income.aggregate([
                { $match: { userId } },
                { $group: { _id: null, total: { $sum: '$amount' } } }
            ]),
            Expense.aggregate([
                { $match: { userId } },
                { $group: { _id: null, total: { $sum: '$amount' } } }
            ])
        ]);
        const totalIncome = totalIncomeAgg[0]?.total || 0;
        const totalExpenses = totalExpensesAgg[0]?.total || 0;
        const balance = totalIncome - totalExpenses;

        // Monthly summary aggregation
        const monthlyIncome = await Income.aggregate([
            { $match: { userId } },
            {
                $group: {
                    _id: {
                        year: { $year: '$date' },
                        month: { $month: '$date' }
                    },
                    amount: { $sum: '$amount' }
                }
            }
        ]);

        const monthlyExpenses = await Expense.aggregate([
            { $match: { userId } },
            {
                $group: {
                    _id: {
                        year: { $year: '$date' },
                        month: { $month: '$date' }
                    },
                    amount: { $sum: '$amount' }
                }
            }
        ]);

        // Merge monthly data
        const months = {};
        monthlyIncome.forEach(item => {
            const key = `${item._id.year}-${item._id.month}`;
            months[key] = months[key] || { year: item._id.year, month: item._id.month, income: 0, expense: 0 };
            months[key].income = item.amount;
        });
        monthlyExpenses.forEach(item => {
            const key = `${item._id.year}-${item._id.month}`;
            months[key] = months[key] || { year: item._id.year, month: item._id.month, income: 0, expense: 0 };
            months[key].expense = item.amount;
        });

        const monthlySummary = Object.values(months)
            .sort((a, b) => a.year === b.year ? a.month - b.month : a.year - b.year)
            .map(m => ({
                month: `${m.year}-${String(m.month).padStart(2, '0')}`,
                income: m.income,
                expense: m.expense
            }));

        // Last transactions
        const incomeRecords = await Income.find({ userId }).sort({ createdAt: -1 }).lean();
        const expenseRecords = await Expense.find({ userId }).sort({ createdAt: -1 }).lean();

        const combined = [
            ...incomeRecords.map(r => ({ ...r, type: 'income' })),
            ...expenseRecords.map(r => ({ ...r, type: 'expense' }))
        ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 100);

        // Final response
        res.status(200).json({
            totalIncome,
            totalExpenses,
            balance,
            monthlySummary,
            lastTransactions: combined
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getDashboardData };
