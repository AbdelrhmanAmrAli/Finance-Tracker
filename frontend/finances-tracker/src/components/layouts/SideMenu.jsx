import React, { useContext } from "react";
import { SideMenuData } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "/logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    clearUser();
    navigate("/login", { replace: true });
  };
  return (
    <div className="w-64 h-screen sticky top-[61px] overflow-y-auto bg-white border-r border-accent/30 p-6 z-20">
      <h5 className="text-primary font-bold text-lg mb-6 font-display">
        {user?.fullName || ""}
      </h5>
      {SideMenuData.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] font-medium transition-colors duration-150 ${
            activeMenu == item.label ? "bg-primary text-white shadow" : "text-primary hover:bg-primary/10"
          } py-3 px-6 rounded-xl mb-3`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
