import React, { useState } from "react";
import Input from "../inputs/Input";

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
  });

  const handleChange = (key, value) => {
    setIncome((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => onAddIncome(income);

  return (
    <form className="space-y-4">
      <div>
        <label
          htmlFor="income-source"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Income Source
        </label>
        <Input
          id="income-source"
          value={income.source}
          onChange={({ target }) => handleChange("source", target.value)}
          placeholder="Freelance, Salary, etc"
          type="text"
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
        />
      </div>

      <div>
        <label
          htmlFor="income-amount"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Amount
        </label>
        <Input
          id="income-amount"
          value={income.amount}
          onChange={({ target }) => handleChange("amount", target.value)}
          type="number"
          placeholder="0.00"
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2
                     [appearance:textfield]
                     [&::-webkit-inner-spin-button]:appearance-none
                     [&::-webkit-outer-spin-button]:appearance-none"
        />
      </div>

      <div>
        <label
          htmlFor="income-date"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Date
        </label>
        <Input
          id="income-date"
          value={income.date}
          onChange={({ target }) => handleChange("date", target.value)}
          type="date"
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Add Income
        </button>
      </div>
    </form>
  );
};

export default AddIncomeForm;
