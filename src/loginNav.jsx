import React from 'react'
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
import { useState } from 'react';
import DOMORELOGO from "/public/logo.png";


function LoginNav() {
    const [showMenu, setShowMenu] = useState(false);
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });
  const show = () => {
    if (showMenu) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  };

  const signIn = () => {
    document.title = "DoMore - SignIn"
  }
  const about = () => {
    document.title = "DoMore - About"
  }
  return (
    <div className='sticky top-0'>
      <nav className=" bg-white border-gray-200 dark:bg-gray-900 shadow-[0_10px_15px_-10px_gray]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src={DOMORELOGO}
              className="h-8"
              alt="Domore Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              DoMore
            </span>
          </a>
          {
            <button
              onClick={show}
              data-collapse-toggle="navbar-default"
              type="button"
              className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          }
          {isSmallScreen && showMenu && (
            <div className="absolute mt-40 w-[90vw] md:block md:w-auto" id="navbar-default">
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <NavLink to="/" onClick={signIn}
                    className={({isActive}) => `${isActive ? "bg-blue-700" : "bg-gray-700"} block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500`}
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/About" onClick={about}
                    className={({isActive}) =>`${isActive ? "bg-blue-700" : "bg-gray-700"} block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500`}
                  >
                    About
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
          {!isSmallScreen && (
            <div className="w-full md:block md:w-auto" id="navbar-default">
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <NavLink to="/" onClick={signIn}
                    className={({isActive}) =>`${isActive ? "text-blue-500" : "text-white"} block py-2 px-3 text-blue-500 bg-blue-700 rounded md:bg-transparent hover:text-blue-400 hover:text-bold`}
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/About" onClick={about}
                    className={({isActive}) =>`${isActive ? "text-blue-500" : "text-white"} block py-2 px-3 rounded hover:text-blue-400`}
                  >
                    About
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>



      
    </div>
  )
}

export default LoginNav
