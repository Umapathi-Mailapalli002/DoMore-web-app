import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase.util";
import { useState } from "react";
import DOMORELOGO from "/public/logo.png";

function Header() {
  const [user] = useAuthState(auth);
  const [showProfile, setShowProfile] = useState(false);

  const show = () => {
    if (showProfile) {
      setShowProfile(false);
      document.title = "DoMore - Home";
    } else {
      setShowProfile(true);
      document.title = "DoMore - Profile";
    }
  };

  // signout 
const signOutt = () =>{
  auth.signOut()
  document.title = "DoMore - SignIn"
}

  return (
    <div className="sticky top-0">
      <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-[0_10px_15px_-10px_gray]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={DOMORELOGO} className="h-8" alt="Domore Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              DoMore
            </span>
          </a>
          <div>
            <img
              onClick={show}
              id="avatarButton"
              type="button"
              data-dropdown-toggle="userDropdown"
              data-dropdown-placement="bottom-start"
              className="w-10 h-10 rounded-full cursor-pointer"
              src={user?.photoURL}
              alt="User dropdown"
            />

            {/* Dropdown menu */}
            {showProfile && <div
              id="userDropdown"
              className="z-10 absolute right-5 mt-1 bg-gray-800 text-green-300 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
            >
              <div className="px-4 py-3 text-sm  dark:text-white">
                <div>{user?.displayName}</div>
                <div className="font-medium truncate">{user?.email}</div>
              </div>
              <div className="py-1">
                <a
                  onClick={signOutt}
                  className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-gray-200 hover:text-blue-400"
                >
                  Sign out
                </a>
              </div>
            </div>}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
