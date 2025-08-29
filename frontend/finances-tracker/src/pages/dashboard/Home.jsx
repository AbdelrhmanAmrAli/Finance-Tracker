import React, { useEffect, useState } from "react";
import { lazy, Suspense, useMemo } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
const InfoCard = React.memo(lazy(() => import("../../components/Cards/InfoCard")));
const RecentTransactions = React.memo(lazy(() => import("../../components/Dashboard/RecentTransactions")));
const FinanceOverview = React.memo(lazy(() => import("../../components/Dashboard/FinanceOverview")));
import { LuWalletMinimal, LuHandCoins } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Home = () => {
  useUserAuth();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState("USD");
  const [fxRate, setFxRate] = useState(1);
  const [fxError, setFxError] = useState(null);

  const usdFormatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  });
  const convFormatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
  });

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      setDashboardData(data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
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

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    currency !== "USD"
      ? fetchFxRate(currency)
      : (setFxRate(1), setFxError(null));
  }, [currency]);

  const formatValue = useMemo(() => {
    return (value) => fxRate ? convFormatter.format(value * fxRate) : usdFormatter.format(value);
  }, [fxRate, currency]);

  return (
    <DashboardLayout activeMenu="Dashboard">
  <div className="my-5 mx-auto p-4 max-w-7xl space-y-8 bg-bg-light text-gray-900 font-display">
        {loading ? (
          <SkeletonTheme baseColor="#e2e8f0" highlightColor="#f0f4f8">
            {/* Skeleton loaders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} height={120} />
              ))}
            </div>
            <div className="mt-6"><Skeleton width={150} height={25} /></div>
            <div className="mt-6"><Skeleton height={300} /></div>
            <div className="mt-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} height={60} style={{ marginBottom: "10px" }} />
              ))}
            </div>
          </SkeletonTheme>
        ) : (
          <>
            <Suspense fallback={<Skeleton height={120} count={3} />}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <InfoCard
                  icon={<IoMdCard />}
                  label="Total Balance"
                  value={formatValue(dashboardData.balance)}
                  color="bg-blue-600 text-white"
                />
                <InfoCard
                  icon={<LuWalletMinimal />}
                  label="Total Income"
                  value={formatValue(dashboardData.totalIncome)}
                  color="bg-green-500 text-white"
                />
                <InfoCard
                  icon={<LuHandCoins />}
                  label="Total Expenses"
                  value={formatValue(dashboardData.totalExpenses)}
                  color="bg-red-500 text-white"
                />
              </div>
            </Suspense>

            <div className="space-y-2">
              <label htmlFor="currency" className="block font-semibold text-primary">
                Display Currency:
              </label>
              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="border border-accent rounded-xl p-2 font-display focus:border-primary focus:ring-2 focus:ring-primary"
              >
                {["USD", "EUR", "EGP","GBP"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {fxError && <p className="text-danger font-semibold mt-1">{fxError}</p>}
            </div>

            <Suspense fallback={<Skeleton height={300} />}>
              <FinanceOverview
                balance={dashboardData.balance}
                totalIncome={dashboardData.totalIncome}
                totalExpenses={dashboardData.totalExpenses}
                monthlyData={dashboardData.monthlySummary}
                currency={currency}
                fxRate={fxRate}
              />
            </Suspense>

            <Suspense fallback={<Skeleton height={60} count={5} />}>
              <RecentTransactions
                transactions={dashboardData.lastTransactions}
                refreshDashboard={fetchDashboardData}
                currency={currency}
                fxRate={fxRate}
              />
            </Suspense>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Home;
