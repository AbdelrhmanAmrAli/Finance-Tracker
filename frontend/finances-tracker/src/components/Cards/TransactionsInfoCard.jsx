import React from 'react';
import { LuUtensils, LuTrendingUp, LuTrendingDown, LuTrash } from 'react-icons/lu';

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  const getAmountStyles = () =>
    type === 'income' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500';

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 border rounded hover:shadow-sm bg-white">
      {/* Icon Section */}
      <div className="w-12 h-12 flex items-center justify-center text-xl bg-slate-100 rounded">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6" />
        ) : (
          <LuUtensils />
        )}
      </div>

      {/* Info and Actions */}
      <div className="flex-1 flex items-center justify-between">
        {/* Title and Date */}
        <div>
          <p className="text-sm text-gray-700 font-medium">{title}</p>
          <p className="text-xs text-gray-400 mt-1">{date}</p>
        </div>

        {/* Actions and Amount */}
        <div className="flex items-center gap-2">
          {/* Delete Button */}
          {!hideDeleteBtn && (
            <button
              className="text-gray-400 hover:text-red-500"
              onClick={onDelete}
            >
              <LuTrash size={18} />
            </button>
          )}

          {/* Amount Display */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded ${getAmountStyles()}`}
          >
            <h6 className="text-xs font-medium">
              {type === 'income' ? '+' : '-'}${amount}
            </h6>
            {type === 'income' ? <LuTrendingUp size={16} /> : <LuTrendingDown size={16} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
