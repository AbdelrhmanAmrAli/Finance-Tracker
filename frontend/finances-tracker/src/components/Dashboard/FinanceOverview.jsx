import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";
import CustomBarChart from "../Charts/CustomBarChart";

// Modern, accessible palette: blue for balance, red for expenses, green for income
const COLORS = ["#2563eb", "#ef4444", "#22c55e"]; // Tailwind blue-600, red-500, green-500

const FinanceOverview = ({
  balance,
  totalIncome,
  totalExpenses,
  monthlyData,
  currency,
  fxRate,
}) => {
  const balanceData = [
    { name: "Balance", amount: balance },
    { name: "Expenses", amount: totalExpenses },
    { name: "Income", amount: totalIncome },
  ];

  const usdFormatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  });
  const convFormatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
  });

  const formatUSD = (val) => usdFormatter.format(val);
  const formatConverted = (val) =>
    fxRate != null ? convFormatter.format(val * fxRate) : "Loading…";

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 w-full max-w-4xl mx-auto space-y-6">
      <h5 className="text-lg font-semibold text-gray-800">
        Financial Overview
      </h5>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Pie Chart */}
        <div className="flex-1">
          <CustomPieChart
            data={balanceData}
            label="Total Balance"
            totalAmount={balance}
            colors={COLORS}
            showTextAnchor
            currency={currency}
            fxRate={fxRate}
          />
          <div className="mt-4 border-t pt-4 text-sm text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>Balance (USD):</span>
              <span className="font-medium">{formatUSD(balance)}</span>
            </div>
            {fxRate != null && (
              <div className="flex justify-between">
                <span>Balance ({currency}):</span>
                <span className="font-medium">{formatConverted(balance)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="flex-1">
          <CustomBarChart
            data={monthlyData}
            currency={currency}
            fxRate={fxRate}
          />
        </div>
      </div>
    </div>
  );
};

export default FinanceOverview;
