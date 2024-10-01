import React from "react";
import courseIcon from "../assets/courseIcon.png";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className=" w-full m-auto    px-6  bg-white py-2 shadow-xl rounded-md lg:w-[70vw]   ">
      <nav className=" flex flex-row justify-between ">
        <div className=" flex justify-center items-center ">
          <img src={courseIcon} alt="icon" height={20} width={40} />
        </div>
        <div className=" flex flex-row ">
          <ul className=" flex flex-row ">
            <li>
              <NavLink to="/register">
                <button className=" h-10 bg-black text-white w-28 rounded-lg m-2 font-medium cursor-pointer  ">
                  Register
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/login">
                <button className=" h-10 text-black border-2  w-28 rounded-lg m-2 font-medium cursor-pointer hover:bg-black hover:text-white    ">
                  SignIn
                </button>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
