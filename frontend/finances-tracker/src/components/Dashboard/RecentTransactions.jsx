import React from "react";
import moment from "moment";
import TransactionsInfoCard from "../Cards/TransactionsInfoCard";

const RecentTransactions = ({ transactions }) => {
  return (
    <div className="card p-4 bg-white rounded-lg shadow">
      <h5 className="text-lg font-semibold text-gray-800 mb-4">
        Recent Transactions
      </h5>
      <div className="space-y-2">
        {transactions?.slice(0, 10).map((item) => (
          <TransactionsInfoCard
            key={item._id}
            title={item.type === "expense" ? item.description : item.source}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
