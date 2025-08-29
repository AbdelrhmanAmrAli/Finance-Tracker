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
  <form className="space-y-4 font-display">
      <div>
        <label
          htmlFor="income-source"
          className="block text-sm font-semibold text-primary mb-1"
        >
          Income Source
        </label>
        <Input
          id="income-source"
          value={income.source}
          onChange={({ target }) => handleChange("source", target.value)}
          placeholder="Freelance, Salary, etc"
          type="text"
        />
      </div>

      <div>
        <label
          htmlFor="income-amount"
          className="block text-sm font-semibold text-primary mb-1"
        >
          Amount
        </label>
        <Input
          id="income-amount"
          value={income.amount}
          onChange={({ target }) => handleChange("amount", target.value)}
          type="number"
          placeholder="0.00"
          className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
      </div>

      <div>
        <label
          htmlFor="income-date"
          className="block text-sm font-semibold text-primary mb-1"
        >
          Date
        </label>
        <Input
          id="income-date"
          value={income.date}
          onChange={({ target }) => handleChange("date", target.value)}
          type="date"
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-success hover:bg-success/90 text-white font-bold py-2 px-6 rounded-xl transition-colors font-display shadow"
        >
          Add Income
        </button>
      </div>
    </form>
  );
};

export default AddIncomeForm;
