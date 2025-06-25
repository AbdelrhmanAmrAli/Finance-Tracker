import React from "react";

const CustomLegend = ({ payload }) => (
  <div
    className="flex flex-wrap justify-center gap-4 mt-4 px-2"
    role="group"
    aria-label="Chart legend"
  >
    {payload.map((entry, index) => (
      <div key={index} className="flex items-center space-x-2">
        <div
          className="w-3 h-3 rounded-full flex-shrink-0"
          style={{ backgroundColor: entry.color }}
          aria-hidden="true"
        />
        <span
          className="text-xs text-gray-700 font-medium"
          aria-label={`Legend: ${entry.value}`}
        >
          {entry.value}
        </span>
      </div>
    ))}
  </div>
);

export default CustomLegend;
