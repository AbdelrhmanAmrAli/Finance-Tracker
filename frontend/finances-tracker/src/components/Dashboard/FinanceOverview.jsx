import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";
import CustomBarChart from "../Charts/CustomBarChart";

const COLORS = ["blue", "#FA2C37", "green"];

const FinanceOverview = ({ balance, totalIncome, totalExpenses, monthlyData }) => {
  const balanceData = [
    { name: "Total Balance", amount: balance },
    { name: "Total Expenses", amount: totalExpenses },
    { name: "Total Income", amount: totalIncome },
  ];

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 w-full max-w-4xl mx-auto space-y-6">
      <h5 className="text-lg font-semibold text-gray-800">
        Financial Overview
      </h5>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
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

        <div className="flex-1">
          <CustomBarChart data={monthlyData} />
        </div>
      </div>
    </div>
  );
};

export default FinanceOverview;
