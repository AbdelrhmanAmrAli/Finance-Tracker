import React from "react";
import { LuCoins, LuTrendingUp, LuTrendingDown, LuTrash } from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  currency = "USD",
  fxRate = 1,
  hideDeleteBtn,
  onDelete,
}) => {
  const amountStyles =
    type === "income" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500";

  // Formatters for USD and selected currency
  const usdFormatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  });
  const convFormatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
  });

  // Format amount display: show both USD and converted values
  const formattedUSD = usdFormatter.format(amount);
  const convertedValue = fxRate ? amount * fxRate : null;
  const formattedConv =
    convertedValue != null ? convFormatter.format(convertedValue) : null;
  const displayAmount = formattedConv
    ? `${formattedUSD} → ${formattedConv}`
    : formattedUSD;

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-4 border rounded-lg bg-white hover:shadow transition-shadow">
      <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-xl bg-gray-100 rounded">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6" />
        ) : (
          <LuCoins />
        )}
      </div>

      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700">{title}</p>
          <p className="text-xs text-gray-400 mt-1">{date}</p>
        </div>

        <div className="flex items-center gap-2">
          {!hideDeleteBtn && (
            <button
              onClick={onDelete}
              className="invisible group-hover:visible text-gray-400 hover:text-red-500 focus:outline-none"
              aria-label="Delete transaction"
            >
              <LuTrash size={18} />
            </button>
          )}

          <div
            className={`flex items-center gap-1 px-3 py-1.5 rounded ${amountStyles}`}
          >
            <span className="text-xs font-medium">
              {type === "income" ? "+" : "-"}
              {displayAmount}
            </span>
            {type === "income" ? (
              <LuTrendingUp size={16} />
            ) : (
              <LuTrendingDown size={16} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
