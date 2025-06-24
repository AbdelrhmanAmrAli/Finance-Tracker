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
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold">Financial Overview</h5>
      </div>
      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`$${balance}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
