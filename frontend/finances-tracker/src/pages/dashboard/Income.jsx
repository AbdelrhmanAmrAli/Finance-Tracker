import React, { useEffect, useState } from "react";
import { lazy, Suspense, useMemo } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { API_PATHS } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosInstance";
const IncomeOverview = React.memo(lazy(() => import("../../components/Income/IncomeOverview")));
const Modal = React.memo(lazy(() => import("../../components/Modal")));
const AddIncomeForm = React.memo(lazy(() => import("../../components/Income/AddIncomeForm")));
const TransactionInfoCard = React.memo(lazy(() => import("../../components/Cards/TransactionsInfoCard")));
import { FixedSizeList as List } from "react-window";
import toast from "react-hot-toast";

const Income = () => {
  useUserAuth();

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [fxRate, setFxRate] = useState(null);
  const [fxError, setFxError] = useState(null);

  const fetchIncomeDetails = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(API_PATHS.INCOME.GET_ALL);
      setIncomeData(data || []);
    } catch (err) {
      console.error("Unable to fetch income data:", err);
      toast.error("Error loading income data");
    } finally {
      setLoading(false);
    }
  };

  const fetchFxRate = async (targetCurrency) => {
    try {
      const res = await axiosInstance.get(API_PATHS.CONVERT.GET, {
        params: { base: "USD", target: targetCurrency, amount: 1 },
      });
      setFxRate(res.data.rate);
    } catch (error) {
      console.error("Failed to fetch FX rate:", error);
      setFxError("Could not load FX rate.");
      setFxRate(1);
    }
  };

  const handleAddIncome = async (income) => {
    const { source, amount, date } = income;
    if (!source.trim()) return toast.error("Source is required.");
    if (!amount || Number(amount) <= 0)
      return toast.error("Amount must be > 0");
    if (!date) return toast.error("Date is required.");

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD, { source, amount, date });
      toast.success("Income added successfully");
      setOpenAddIncomeModal(false);
      fetchIncomeDetails();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const handleDeleteIncome = async (id) => {
    try {
      await axiosInstance.delete(`${API_PATHS.INCOME.DELETE}/${id}`);
      toast.success("Income deleted");
      fetchIncomeDetails();
    } catch (err) {
      toast.error(err.response?.data?.message || "Deletion failed");
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  useEffect(() => {
    currency !== "USD"
      ? fetchFxRate(currency)
      : (setFxRate(1), setFxError(null));
  }, [currency]);

  const formatUSD = useMemo(() => (val) => `$${Number(val).toLocaleString()}`, []);
  const formatConverted = useMemo(() => (val) => fxRate ? `${(val * fxRate).toFixed(2)} ${currency}` : "", [fxRate, currency]);

  return (
    <DashboardLayout activeMenu="income">
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
            {["USD", "EUR", "EGP"].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <IncomeOverview
          transactions={incomeData}
          onAddIncome={() => setOpenAddIncomeModal(true)}
        />

        <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
          <h5 className="px-6 py-4 font-semibold text-gray-700">Your Income</h5>
          {incomeData.length === 0 ? (
            <div className="px-6 py-4 text-gray-500">
              No income recorded yet.
            </div>
          ) : (
            <List
              height={400}
              itemCount={incomeData.length}
              itemSize={80}
              width={"100%"}
            >
              {({ index, style }) => {
                const inc = incomeData[index];
                return (
                  <div style={style} key={inc._id}>
                    <TransactionInfoCard
                      title={inc.source}
                      date={inc.date.split("T")[0]}
                      amount={inc.amount}
                      type="income"
                      currency={currency}
                      fxRate={fxRate}
                      onDelete={() => handleDeleteIncome(inc._id)}
                    />
                  </div>
                );
              }}
            </List>
          )}
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;
