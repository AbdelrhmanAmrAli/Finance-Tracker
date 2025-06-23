const user = require('../models/User');
const Expense=require('../models/Expense');

//Add an Expense
exports.addExpense = async (req, res) => {
    const userId = req.user.id; // Assuming user ID is available in req.user after authentication
    try {
        const { description, amount, date } = req.body;
        if (!description || !amount || !date) {
            return res.status(400).json({ message: 'Description, amount, and date are required' });
        }
        const expenseItem = new Expense({
            userId,
            description,
            amount,
            date: new Date(date) // Ensure date is stored as a Date object
        });

        await expenseItem.save();
        res.status(200).json({ message: 'Expense added successfully', expenseItem });
    } catch (error) {
        res.status(500).json({ message: 'Error adding expense', error });
    }
}

//get expenses
exports.getExpenses = async (req, res) => {
    const userId = req.user.id; // Assuming user ID is available in req.user after authentication
    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 }); // Sort by date descending
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching expenses', error });
    }
}

// Delete an expense
exports.deleteExpense = async (req, res) => {
    const userId = req.user.id; // Assuming user ID is available in req.user after authentication
    const expenseId = req.params.id; // Get expense ID from request parameters

    try {
        const expenseItem = await Expense.findOneAndDelete({ _id: expenseId, userId });
        if (!expenseItem) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting expense', error });
    }
}

