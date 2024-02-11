import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDashboard } from "@fortawesome/free-solid-svg-icons";
import { BsArrowLeftShort } from "react-icons/bs";
import { FaLock, FaCog, FaLifeRing, FaDashcube } from "react-icons/fa";
import DefaultProfile from "../assets/ProfilePic.png";
import { NavLink, Outlet, Route, Routes } from "react-router-dom";
import "../styles/UserProfile.css";
import withAuth from "../utils/withAuth";

function UserProfile() {
  const [open, setOpen] = useState(true);
  const Menus = [
    {
      title: "Dashboard",
      icon: <FaDashcube />,
      to: "/profile/",
    },
    { title: "Privacy & Security", icon: <FaLock />, to: "/profile/privacy" },
    { title: "Setting", icon: <FaCog />, to: "/profile/setting" },
  ];

  return (
    <div className="flex w-full flex-row flex-nowrap h-screen ">
      <div
        className={`h-full flex flex-col flex-nowrap items-center bg-gradient-to-b from-light-purple via-dark-purple to-light-purple px-2 pt-8 ${
          open ? "w-3/12" : "w-1/12"
        } duration-300 relative`}>
        <BsArrowLeftShort
          className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />

        <img
          src={DefaultProfile}
          alt="Circular profile"
          className="inline-flex rounded-full px-4 h-20 w-auto mb-5"
        />

        <h1
          className={`inline-flex font-bold text-off-white ${
            open ? "text-xl" : "text-sm"
          } px-10`}>
          {" "}
          {localStorage.getItem("username")}
        </h1>

        <nav className="flex flex-col flex-nowrap  pt-2 px-2 w-full h-full justify-start">
          {Menus.map((menu, index) => (
            <NavLink
              key={index}
              to={menu.to}
              className={`user-nav text-grey-300 text-base flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-white rounded-md ${
                menu.spacing ? "mt-9" : "mt-2"
              } mt-2 `}>
              <span>{menu.icon}</span>
              <span
                className={`text-base font-medium flex-1 ${!open && "hidden"}`}>
                {menu.title}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="w-full h-full">
        <Outlet />
      </div>
    </div>
  );
}
export default withAuth(UserProfile);
