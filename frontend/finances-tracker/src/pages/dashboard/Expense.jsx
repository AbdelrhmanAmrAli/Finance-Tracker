import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { API_PATHS } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosInstance";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import Modal from "../../components/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import TransactionInfoCard from "../../components/Cards/TransactionsInfoCard";
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
      toast.success("Expense added");
      setOpenAddExpenseModal(false);
      fetchExpenseDetails();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await axiosInstance.delete(`${API_PATHS.EXPENSE.DELETE}/${id}`);
      toast.success("Expense deleted");
      fetchExpenseDetails();
    } catch (err) {
      toast.error(err.response?.data?.message || "Deletion failed");
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
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <label
            htmlFor="currency"
            className="block text-sm font-medium text-gray-700"
          >
            Display Currency:
          </label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="border rounded p-2"
          >
            {["USD", "EUR"].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <ExpenseOverview
          transactions={expenseData}
          onAddExpense={() => setOpenAddExpenseModal(true)}
          isLoading={loading}
        />

        <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
          <h5 className="px-6 py-4 font-semibold text-gray-700">
            Your Expenses
          </h5>
          {expenseData.length === 0 ? (
            <div className="px-6 py-4 text-gray-500">No expenses yet.</div>
          ) : (
            expenseData.map((exp) => (
              <TransactionInfoCard
                key={exp._id}
                title={exp.description}
                date={exp.date.split("T")[0]}
                amount={exp.amount}
                type="expense"
                currency={currency}
                fxRate={fxRate}
                onDelete={() => handleDeleteExpense(exp._id)}
              />
            ))
          )}
        </div>

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
