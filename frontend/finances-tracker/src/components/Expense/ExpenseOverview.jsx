import React from "react";
import { LuPlus } from "react-icons/lu";

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  return (
    <div className=" card">
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg">Add Expense</h5>
        </div>
        <button className="add-btn" onClick={onAddExpense}>
          <LuPlus className="text-lg" />
          Add Expense
        </button>
      </div>
      <div className="mt-1"></div>
    </div>
  );
};

export default ExpenseOverview;
