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
  currency = "USD",
  fxRate = 1,
}) => {
  const usdFormatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  });
  const convFormatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
  });

  const formatTotal = (val) => usdFormatter.format(val);
  const formatConverted = (val) => convFormatter.format(val * fxRate);

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
          {data.map((entry, i) => (
            <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
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
                      {formatTotal(totalAmount)}
                    </tspan>
                    <tspan x={cx} dy={24} fill="#333" fontSize="16">
                      {formatConverted(totalAmount)}
                    </tspan>
                  </text>
                );
              }}
            />
          )}
        </Pie>

        <Tooltip
          content={<CustomTooltip currency={currency} fxRate={fxRate} />}
          formatter={(value) => {
            const num = Number(value);
            if (!Number.isFinite(num)) return ["$0.00", currency];

            const usd = usdFormatter.format(num);
            const conv = convFormatter.format(num * fxRate);
            return [`${usd} → ${conv}`, currency];
          }}
        />

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
