import card2 from "../../assets/images/card2.png";
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* AuthLayout component for authentication pages, providing a consistent layout with stats and branding */}
      <div className="h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-2xl font-medium text-black">finance tracker</h2>
        {children}
      </div>

      <div className="md:block w-[40vw] bg-blue-50 p-8 relative">
        <StatsInfoCard
          icon={<LuTrendingUpDown />}
          label="track your income and expenses"
          value="230,000"
          color="bg-primary"
        />
        <img src={card2} className="lg:w-[90%] absolute bottom-30 " />
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md ">
      <div
        className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full `}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text-[20px]">{value}</span>
      </div>
    </div>
  );
};
