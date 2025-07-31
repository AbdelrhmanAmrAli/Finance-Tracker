import React, { useState } from "react";
import Input from "../inputs/Input";

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    description: "",
    amount: "",
    date: "",
  });

  const handleChange = (key, value) => {
    setExpense((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onAddExpense(expense);
  };

  return (
    <form className="space-y-4">
      {/* Description */}
      <div>
        <label
          htmlFor="expense-description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Expense Description
        </label>
        <Input
          id="expense-description"
          value={expense.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Groceries, Rent, etc"
          type="text"
        />
      </div>

      {/* Amount */}
      <div>
        <label
          htmlFor="expense-amount"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Amount
        </label>
        <Input
          id="expense-amount"
          value={expense.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
          placeholder="0.00"
          type="number"
          className="
            [appearance:textfield]
            [&::-webkit-inner-spin-button]:appearance-none
            [&::-webkit-outer-spin-button]:appearance-none
          "
        />
      </div>

      {/* Date */}
      <div>
        <label
          htmlFor="expense-date"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Date
        </label>
        <Input
          id="expense-date"
          value={expense.date}
          onChange={(e) => handleChange("date", e.target.value)}
          type="date"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={handleSubmit}
          className="
            bg-red-500 hover:bg-red-600 text-white font-medium
            py-2 px-4 rounded transition-colors
          "
        >
          Add Expense
        </button>
      </div>
    </form>
  );
};

export default AddExpenseForm;
