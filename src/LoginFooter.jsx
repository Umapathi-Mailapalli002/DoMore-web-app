import React from 'react'
import { NavLink } from 'react-router-dom'

function LoginFooter() {
  return (
    <div>
       {/* footer of login page */}

       <footer className="fixed bottom-0 bg-white rounded-lg shadow p-4  dark:bg-gray-800">
          <div className="w-[100vw] p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2024{" "}
              <a href="" className="hover:underline">
                DoMore™
              </a>
              . All Rights Reserved.
            </span>
            <ul class="flex flex-wrap items-center mt-3 lg:mr-6 md:mr-6 sm:mr-6 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li>
                <NavLink to="/About" className={({isActive}) =>`${isActive ? "underline" : ""} hover:underline me-4 md:me-6`}>
                  About
                </NavLink>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </footer>
    </div>
  )
}

export default LoginFooter
