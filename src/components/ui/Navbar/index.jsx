import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logoutUser } from "../../../store/actions/userAction";
import Profile from "./Profile";

const Navbar = () => {
  const { isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logoutUser());
    navigate("/login");
  };
  return (
    <header className=" text-gray-600 body-font border-b bg-gray-50 shadow-md shadow-gray-200 sticky top-0 z-20">
      <div className="min-h-[70px] container flex px-5 py-2 md:flex-row items-center justify-between">
        {/* Logo */}
        <div className="">
          <Link to="/">
            <h1 className="text-lg font-bold text-teal-500">Super<span className="text-rose-500">Blog</span></h1>
          </Link>
        </div>
        <nav className=" md:ml-auto flex flex-wrap items-center text-base justify-center">
          {!isAuth ? (
            <>
              <Link className="mr-5 bg-rose-50 rounded-md px-4 py-2 text-rose-500 font-semibold hover:bg-rose-500 hover:text-white" to={"/login"}>
                Login
              </Link>
              <Link className="mr-5 text-rose-500 font-semibold px-4 py-2 border border-rose-200 hover:bg-rose-50 rounded-md" to="/signup">
                Sign Up
              </Link>
            </>
          ) : null}
        </nav>
        {isAuth && (
          <Profile handleLogOut={handleLogOut}/>
        )}
      </div>
    </header>
  );
};

export default Navbar;
