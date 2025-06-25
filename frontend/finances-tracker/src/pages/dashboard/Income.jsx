import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { API_PATHS } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosInstance";
import IncomeOverview from "../../components/Income/IncomeOverview";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import toast from "react-hot-toast";

const Income = () => {
  useUserAuth();
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  // Currency conversion state
  const [currency, setCurrency] = useState("USD");
  const [fxRate, setFxRate] = useState(null);
  const [fxError, setFxError] = useState(null);

  const fetchIncomeDetails = async () => {
    if (loading) return;
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

  const handleAddIncome = async (income) => {
    const { source, amount, date } = income;
    if (!source.trim()) return toast.error("Source is required.");
    if (!amount || Number(amount) <= 0)
      return toast.error("Amount must be > 0");
    if (!date) return toast.error("Date is required.");

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD, { source, amount, date });
      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchIncomeDetails();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
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

  const formatUSD = (val) => `$${Number(val).toLocaleString()}`;
  const formatConverted = (val) =>
    fxRate != null ? `${(val * fxRate).toFixed(2)} ${currency}` : "";

  return (
    <DashboardLayout activeMenu="income">
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
                block w-full bg-transparent border border-gray-300 rounded-md
                py-2 pl-3 pr-8 text-sm text-gray-700 shadow-sm
                focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                appearance-none cursor-pointer
              "
            >
              {["USD", "EUR"].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
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

        {/* Overview Card */}
        <IncomeOverview
          transactions={incomeData}
          onAddIncome={() => setOpenAddIncomeModal(true)}
          isLoading={loading}
        />

        {/* Income List */}
        <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
          <h5 className="px-6 py-4 font-semibold text-gray-700">Your Income</h5>
          {incomeData.length === 0 ? (
            <div className="px-6 py-4 text-gray-500">
              No income recorded yet.
            </div>
          ) : (
            incomeData.map((inc) => (
              <div
                key={inc._id}
                className="flex justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-800">{inc.source}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {inc.date.split("T")[0]}
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-gray-900 font-medium">
                    {formatUSD(inc.amount)}
                  </p>
                  {fxRate != null && (
                    <p className="text-gray-600 text-sm">
                      → {formatConverted(inc.amount)}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Income Modal */}
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
