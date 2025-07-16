import React from "react";
import moment from "moment";
import TransactionsInfoCard from "../Cards/TransactionsInfoCard";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";

const RecentTransactions = ({
  transactions,
  refreshDashboard,
  currency,
  fxRate,
}) => {
  const handleDelete = async (id, type) => {
    try {
      const path =
        type === "expense"
          ? `${API_PATHS.EXPENSE.DELETE}/${id}`
          : `${API_PATHS.INCOME.DELETE}/${id}`;

      await axiosInstance.delete(path);
      toast.success(`${type === "expense" ? "Expense" : "Income"} deleted`);
      refreshDashboard();
    } catch (err) {
      toast.error(err.response?.data?.message || "Deletion failed");
    }
  };

  return (
    <div className="card p-4 bg-white rounded-lg shadow">
      <h5 className="text-lg font-semibold text-gray-800 mb-4">
        Recent Transactions
      </h5>
      <div className="space-y-2">
        {transactions.slice(0, 10).map((item) => (
          <TransactionsInfoCard
            key={item._id}
            id={item._id}
            title={item.type === "expense" ? item.description : item.source}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type={item.type}
            currency={currency}
            fxRate={fxRate}
            hideDeleteBtn={false}
            onDelete={() => handleDelete(item._id, item.type)}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
