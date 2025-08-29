import React from "react";

const InfoCard = ({ icon, label, value, color }) => (
  <div
    className={`w-full max-w-sm mx-auto ${color ? color : 'bg-primary'} text-white rounded-2xl shadow-card p-6 flex items-center space-x-4 font-display`}
  >
    <div className="text-3xl opacity-80">{icon}</div>
    <div className="flex flex-col">
      <span className="text-sm text-accent font-medium">{label}</span>
      <span className="text-2xl font-bold tracking-tight mt-1">{value}</span>
    </div>
  </div>
);

export default InfoCard;
