import React from "react";
import SideMenu from "./SideMenu";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = React.useState(false);

  return (
    <>
      <div className="flex items-center gap-4 bg-white border-b border-gray-200/50 backdrop-blur-sm py-2 px-4 sticky top-0 z-30">
        <button
          className="block lg:hidden text-black p-2"
          onClick={() => setOpenSideMenu((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>

        <h2 className="text-lg font-medium text-black">Finance Tracker</h2>
      </div>

      {/* Off‑canvas menu overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity ${
          openSideMenu
            ? "opacity-100 visible bg-black/50"
            : "opacity-0 invisible"
        } lg:hidden`}
        onClick={() => setOpenSideMenu(false)}
      />

      {/* Mobile off‑canvas sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-white shadow-lg transform transition-transform
    ${openSideMenu ? "translate-x-0" : "-translate-x-full"}
    lg:hidden`} // ensure it's hidden on desktop
      >
        <SideMenu activeMenu={activeMenu} />
      </aside>
    </>
  );
};

export default Navbar;
