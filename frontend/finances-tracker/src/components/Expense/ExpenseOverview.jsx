import React from "react";
import { LuPlus } from "react-icons/lu";

const ExpenseOverview = ({ transactions = [], onAddExpense, isLoading }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold text-gray-800">
          Expenses Overview
        </h5>
        <button
          onClick={onAddExpense}
          className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors"
          aria-label="Add Expense"
        >
          <LuPlus className="text-lg" />
          Add Expense
        </button>
      </div>
      <div className="mt-2">
        {isLoading ? (
          <p className="text-gray-500">Loading expenses…</p>
        ) : transactions.length > 0 ? (
          <p className="text-gray-600 text-sm">
            You have {transactions.length} expense entries.
          </p>
        ) : (
          <p className="text-gray-500 text-sm">No expenses recorded yet.</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseOverview;
