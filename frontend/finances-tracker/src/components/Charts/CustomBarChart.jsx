import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Custom tooltip to display formatted USD and converted values
const CustomTooltip = ({ active, payload, label, fxRate, currency }) => {
  if (!active || !payload || payload.length === 0) return null;

  const usdFormatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  });
  const convFormatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
  });

  return (
    <div className="bg-white shadow rounded p-2">
      <p className="font-semibold text-gray-800">{label}</p>
      {payload.map((item) => {
        const usdValue = item.value;
        const converted = fxRate ? usdValue * fxRate : null;
        return (
          <div key={item.dataKey} className="flex justify-between">
            <span className="capitalize text-gray-600">{item.name}:</span>
            <span style={{ color: item.fill }} className="font-medium">
              {usdFormatter.format(usdValue)}
              {converted != null && ` → ${convFormatter.format(converted)}`}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const CustomBarChart = ({ data, currency, fxRate }) => {
  const tickFormatter = (tick) =>
    new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(tick);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h5 className="text-sm font-semibold mb-2 text-gray-700">
        Income vs Expense
      </h5>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis tickFormatter={tickFormatter} />
          <Tooltip
            content={<CustomTooltip fxRate={fxRate} currency={currency} />}
            wrapperStyle={{ outline: "none" }}
          />
          <Bar dataKey="income" name="Income" fill="#37B24D" />
          <Bar dataKey="expense" name="Expenses" fill="#FA2C37" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
