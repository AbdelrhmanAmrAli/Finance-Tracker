import card2 from "../../assets/images/card2.png";
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left (form) */}
      <div className="w-full lg:w-3/5 p-6 sm:p-12 flex flex-col">
        <h2 className="text-2xl sm:text-3xl font-medium text-black mb-6">
          finance tracker
        </h2>
        {children}
      </div>

      {/* Right (info + image) */}
      <div className="w-full lg:w-2/5 bg-blue-50 p-6 sm:p-12 flex flex-col relative items-center">
        <StatsInfoCard
          icon={<LuTrendingUpDown />}
          label="track your income and expenses"
          value="230,000"
          color="bg-primary"
        />
        <img
          src={card2}
          alt="Finance card"
          className="hidden md:block lg:w-11/12 mt-auto"
        />
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-md w-full max-w-sm">
      <div
        className={`w-12 h-12 flex items-center justify-center text-xl text-white ${color} rounded-full`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-xs sm:text-sm text-gray-500 mb-1">{label}</h6>
        <span className="text-lg sm:text-xl font-semibold">{value}</span>
      </div>
    </div>
  );
};
