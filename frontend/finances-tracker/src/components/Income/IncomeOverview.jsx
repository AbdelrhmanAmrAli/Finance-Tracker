import React from "react";
import { LuPlus } from "react-icons/lu";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header with title and CTA button */}
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold text-gray-800">Income Overview</h5>
        <button
          onClick={onAddIncome}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
          aria-label="Add Income"
        >
          <LuPlus className="text-lg" />
          Add Income
        </button>
      </div>

      {/* Placeholder for content */}
      <div className="mt-4">
        {transactions?.length > 0 ? (
          <p className="text-gray-600 text-sm">
            You have {transactions.length} income entries.
          </p>
        ) : (
          <p className="text-gray-500 text-sm">No income recorded yet.</p>
        )}
      </div>
    </div>
  );
};

export default IncomeOverview;
