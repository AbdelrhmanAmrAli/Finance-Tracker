const express = require('express');
const {addExpense,getExpenses ,deleteExpense } = require('../controllers/expenseController');
const {protect} = require('../middleware/authMiddleware');
const router = express.Router();
// Route to add expense
router.post('/add', protect, addExpense);


// Route to get all expenses
router.get('/get', protect, getExpenses);


// Route to delete expense
router.delete('/:id', protect, deleteExpense);

module.exports = router;