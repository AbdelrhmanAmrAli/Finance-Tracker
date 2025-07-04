import React from "react";

const CustomTooltip = ({ active, payload, currency = "USD", fxRate = 1 }) => {
  if (active && payload && payload.length) {
    const usdFormatter = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD",
    });
    const convFormatter = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
    });

    const value = payload[0].value;
    const formattedUSD = usdFormatter.format(value);
    const formattedConv =
      fxRate != null ? convFormatter.format(value * fxRate) : null;

    return (
      <div
        role="tooltip"
        aria-live="polite"
        className="bg-white shadow-md rounded-lg p-2 border border-gray-300 transition-opacity duration-200 opacity-100 z-50"
        style={{ pointerEvents: "none" }}
      >
        <p className="text-xs font-semibold text-gray-800 mb-1">
          {payload[0].name}
        </p>
        <p className="text-sm text-gray-600">
          Amount:{" "}
          <span className="font-medium text-gray-900">
            {formattedConv
              ? `${formattedUSD} → ${formattedConv}`
              : formattedUSD}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
