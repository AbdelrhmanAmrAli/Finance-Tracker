// components/Charts/CustomBarChart.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const CustomBarChart = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h5 className="text-sm font-semibold mb-2 text-gray-700">
        Income vs Expense
      </h5>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="income" fill="#4CAF50" />
          <Bar dataKey="expense" fill="#FA2C37" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
