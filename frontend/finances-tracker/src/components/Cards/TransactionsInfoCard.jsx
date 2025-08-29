import React from "react";
import { LuCoins, LuTrendingUp, LuTrendingDown, LuTrash } from "react-icons/lu";

const TransactionsInfoCard = ({
  id,
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

  const usdFormatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  });
  const convFormatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
  });

  const formattedUSD = usdFormatter.format(amount);
  const convertedValue = fxRate ? amount * fxRate : null;
  const formattedConv =
    convertedValue != null ? convFormatter.format(convertedValue) : null;
  const displayAmount = formattedConv
    ? `${formattedUSD} → ${formattedConv}`
    : formattedUSD;

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-5 border border-accent/30 rounded-2xl bg-white hover:shadow-card transition-shadow font-display">
      <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-2xl bg-bg-light rounded-xl">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6" />
        ) : (
          <LuCoins />
        )}
      </div>

      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-base font-semibold text-primary">{title}</p>
          <p className="text-xs text-accent mt-1">{date}</p>
        </div>

        <div className="flex items-center gap-2">
          {!hideDeleteBtn && onDelete && (
            <button
              onClick={() => onDelete(id)}
              className="invisible group-hover:visible text-accent hover:text-danger focus:outline-none"
              aria-label="Delete transaction"
            >
              <LuTrash size={18} />
            </button>
          )}

          <div
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl ${amountStyles}`}
          >
            <span className="text-xs font-bold">
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

export default TransactionsInfoCard;
