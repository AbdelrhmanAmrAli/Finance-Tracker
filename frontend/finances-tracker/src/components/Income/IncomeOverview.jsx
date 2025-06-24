import React from "react";
import { LuPlus } from "react-icons/lu";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  return (
    <div className=" card">
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-1g">Add Income</h5>
        </div>
        <button className="add-btn" onClick={onAddIncome}>
          <LuPlus className="text-lg" />
          Add Income
        </button>
      </div>
      <div className="mt-1"></div>
    </div>
  );
};

export default IncomeOverview;
