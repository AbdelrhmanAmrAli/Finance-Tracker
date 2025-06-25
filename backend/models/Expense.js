// models/Expense.js
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
        min: [0, 'Amount cannot be negative'],
        validate: {
            validator: Number.isFinite,
            message: props => `${props.value} is not a valid number`
        }
    },
    date: {
        type: Date,
        default: () => Date.now(),
        validate: {
            validator: v => v <= Date.now(),
            message: 'Date cannot be in the future'
        }
    }
}, {
    timestamps: true,
});

// Compound index: helps queries like fetch all expenses for a user sorted by date
expenseSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('Expense', expenseSchema);
