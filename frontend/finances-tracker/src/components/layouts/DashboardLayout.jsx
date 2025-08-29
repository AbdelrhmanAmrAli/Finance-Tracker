import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  return (
    <div className="min-h-screen flex flex-col bg-bg-light font-display">
      <Navbar activeMenu={activeMenu} />
      {user && (
        <div className="flex flex-col lg:flex-row flex-grow">
          <aside className="hidden lg:block lg:w-64">
            <SideMenu activeMenu={activeMenu} />
          </aside>
          <main className="flex-grow p-6 md:p-8 lg:p-10">{children}</main>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
