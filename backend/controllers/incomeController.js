const user = require('../models/User');
const Income = require('../models/Income');

//add income source
exports.addIncome = async (req, res) => {
    const userId = req.user.id; // Assuming user ID is available in req.user after authentication
    try {
        const { source, amount, date } = req.body;
        if (!source || !amount || !date) {
            return res.status(400).json({ message: 'Source, amount, and date are required' });
        }
        const income = new Income({
            userId,
            source,
            amount,
            date: new Date(date) // Ensure date is stored as a Date object
        });

        await income.save();
        res.status(200).json({ message: 'Income source added successfully', income });
    } catch (error) {
        res.status(500).json({ message: 'Error adding income source', error });
    }
}

// Get all income sources
exports.getIncomes = async (req, res) => { 
    const userId = req.user.id; // Assuming user ID is available in req.user after authentication
    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 }); // Sort by date descending
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching income sources', error });
    }
}

// Delete an income source
exports.deleteIncome = async (req, res) => { }
