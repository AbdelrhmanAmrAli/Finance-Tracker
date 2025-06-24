import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Label,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {
  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
          {showTextAnchor && (
            <Label
              position="center"
              content={({ viewBox }) => {
                const { cx, cy } = viewBox;
                return (
                  <text x={cx} y={cy} textAnchor="middle">
                    <tspan x={cx} dy={-10} fill="#666" fontSize="14">
                      {label}
                    </tspan>
                    <tspan
                      x={cx}
                      dy={24}
                      fill="#333"
                      fontSize="24"
                      fontWeight="600"
                    >
                      {totalAmount}
                    </tspan>
                  </text>
                );
              }}
            />
          )}
        </Pie>

        <Tooltip content={<CustomTooltip />} />

        <Legend
          iconType="circle"
          verticalAlign="bottom"
          align="center"
          height={60}
          content={<CustomLegend />}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
