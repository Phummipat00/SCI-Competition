import React from "react";
import { useAuthContext } from "../context/AuthContext";
import UserProfile from "./UserProfile";

const NavBar = () => {
  const { user } = useAuthContext();

  const menuItems = [
    { name: "News", url: "/news" },
    { name: "Activities", url: "/activities" },
    { name: "Add Activities", url: "/add-activities" },
    { name: "About Us", url: "/" },
  ];

  return (
    <div className="navbar bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md">
      <div className="navbar-start">
        {/* Mobile dropdown menu */}
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost text-white lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white text-blue-700 rounded-box w-52"
          >
            {menuItems.map((item) => (
              <li key={item.name}>
                <a href={item.url} className="hover:bg-blue-100">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* Brand / Logo */}
        <a href="/" className="btn btn-ghost text-xl text-white font-bold">
          SCI Competition
        </a>
      </div>

      {/* Desktop menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-white">
          {menuItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.url}
                className="hover:bg-blue-600 rounded-md px-3 py-2"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Right side: User / Auth */}
      <div className="navbar-end space-x-2">
        {user ? (
          <UserProfile />
        ) : (
          <>
            <a href="/register" className="btn btn-outline btn-info">
              Register
            </a>
            <a href="/login" className="btn btn-outline btn-accent">
              Login
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;