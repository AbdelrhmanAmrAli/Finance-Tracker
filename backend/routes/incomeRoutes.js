const express = require('express');
const {addIncome, getIncomes, deleteIncome} = require('../controllers/incomeController');
const {protect} = require('../middleware/authMiddleware');
const router = express.Router();
// Route to add income
router.post('/add', protect, addIncome);


// Route to get all incomes
router.get('/get', protect, getIncomes);


// Route to delete income
router.delete('/:id', protect, deleteIncome);

module.exports = router;