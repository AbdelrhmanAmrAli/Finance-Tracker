import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { API_PATHS } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosInstance";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import Modal from "../../components/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import toast from "react-hot-toast";

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  const [currency, setCurrency] = useState("USD");
  const [fxRate, setFxRate] = useState(null);
  const [fxError, setFxError] = useState(null);
  

  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL);
      setExpenseData(data || []);
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
      toast.error("Error loading expenses");
    } finally {
      setLoading(false);
    }
  };

  const fetchFxRate = async (targetCurrency) => {
    // setFxError(null);
    try {
      const res = await axiosInstance.get(API_PATHS.CONVERT.GET, {
        params: { pair: `USD${targetCurrency}`, amount: 1 },
      });
      setFxRate(res.data.rate);
    } catch (error) {
      console.error("Failed to fetch FX rate:", error);
      setFxError("Could not load FX rate.");
      setFxRate(1);
    }
  };

  const handleAddExpense = async (expense) => {
    const { description, amount, date } = expense;
    if (!description.trim()) return toast.error("Description is required");
    if (!amount || Number(amount) <= 0)
      return toast.error("Amount must be > 0");
    if (!date) return toast.error("Date is required");

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD, {
        description,
        amount,
        date,
      });
      setOpenAddExpenseModal(false);
      toast.success("Expense added");
      fetchExpenseDetails();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  useEffect(() => {
    currency !== "USD"
      ? fetchFxRate(currency)
      : (setFxRate(1), setFxError(null));
  }, [currency]);

  const formatUSD = (val) => `$${Number(val).toLocaleString()}`;
  const formatConverted = (val) =>
    fxRate ? `${(val * fxRate).toFixed(2)} ${currency}` : "";

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="max-w-4xl mx-auto my-6 px-4 space-y-6">
        {/* Currency Selector */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <label
            htmlFor="currency"
            className="block text-sm font-medium text-gray-700"
          >
            Display Currency:
          </label>
          <div className="relative w-full sm:w-48">
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="
                appearance-none block w-full bg-transparent border border-gray-300 rounded-md
                py-2 pl-3 pr-8 text-sm text-gray-700 shadow-sm
                focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                cursor-pointer
              "
            >
              {["USD", "EUR"].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {/* Dropdown Arrow */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="pointer-events-none absolute inset-y-0 right-2 h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 9l3.75 3.75L15.75 9"
              />
            </svg>
          </div>
        </div>

        {/* Add Expense Overview */}
        <ExpenseOverview
          transactions={expenseData}
          onAddExpense={() => setOpenAddExpenseModal(true)}
          isLoading={loading}
        />

        {/* Expense List */}
        <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
          <h5 className="px-6 py-4 font-semibold text-gray-700">
            Your Expenses
          </h5>
          {expenseData.length === 0 ? (
            <div className="px-6 py-4 text-gray-500">No expenses yet.</div>
          ) : (
            expenseData.map((exp) => (
              <div
                key={exp._id}
                className="flex justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-800">{exp.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {exp.date.split("T")[0]}
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-gray-900 font-medium">
                    {formatUSD(exp.amount)}
                  </p>
                  {fxRate != null && (
                    <p className="text-gray-600 text-sm">
                      → {formatConverted(exp.amount)}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Expense Modal */}
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
