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

  return (
    <div>
      <Input
        value={expense.description}
        onChange={({ target }) => handleChange("description", target.value)}
        label="Expense Description"
        placeholder="Freelance, Salary, etc"
        type="text"
      />
      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        type="number"
      />
      <Input
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        type="date"
      />
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onAddExpense(expense)}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
