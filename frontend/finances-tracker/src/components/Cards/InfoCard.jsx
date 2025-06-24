import React from "react";

const InfoCard = ({ icon, label, value, color }) => (
  <div
    className={`w-full max-w-sm mx-auto ${color} text-white rounded-lg shadow p-5 flex items-center space-x-4`}
  >
    <div className="text-3xl">{icon}</div>
    <div className="flex flex-col">
      <span className="text-sm">{label}</span>
      <span className="text-xl font-semibold">{value}</span>
    </div>
  </div>
);

export default InfoCard;
