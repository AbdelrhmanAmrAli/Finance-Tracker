import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["blue", "#FA2C37", "green"];

const FinanceOverview = ({ balance, totalIncome, totalExpenses }) => {
  const balanceData = [
    { name: "Total Balance", amount: balance },
    { name: "Total Expenses", amount: totalExpenses },
    { name: "Total Income", amount: totalIncome },
  ];

  return (
    <div className="bg-white rounded-lg shadow transition-shadow hover:shadow-lg p-6 w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold text-gray-800">
          Financial Overview
        </h5>
      </div>
      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`$${balance}`}
        colors={COLORS}
        showTextAnchor
      />
      <div className="mt-4 border-t pt-4 text-sm text-gray-600 flex justify-between">
        <span>Total</span>
        <span className="font-medium">${balance}</span>
      </div>
    </div>
  );
};

export default FinanceOverview;
