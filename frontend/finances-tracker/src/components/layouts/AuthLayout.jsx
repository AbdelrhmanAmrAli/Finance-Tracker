import { LuTrendingUpDown } from "react-icons/lu";
import authLayoutPic from "../../assets/authLayoutPic.png";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left (form) */}
      <div className="w-full lg:w-3/5 p-6 sm:p-12 flex flex-col justify-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Finance Tracker
        </h2>
        {children}
      </div>

      {/* Right (info + image) */}
      <div className="w-full lg:w-2/5 bg-blue-50 p-6 sm:p-12 flex flex-col items-center">
        <StatsInfoCard
          icon={<LuTrendingUpDown size={24} />}
          label="Track your income & expenses"
          value="230,000"
          color="bg-blue-500"
        />
        <div className="hidden md:block mt-auto w-full max-w-sm">
          <img
            src={authLayoutPic}
            alt="Financial overview"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => (
  <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-md w-full max-w-sm mb-6">
    <div
      className={`w-12 h-12 flex items-center justify-center text-xl text-white ${color} rounded-full`}
    >
      {icon}
    </div>
    <div>
      <h6 className="text-sm text-gray-600 mb-1">{label}</h6>
      <span className="text-lg font-semibold text-gray-900">{value}</span>
    </div>
  </div>
);
