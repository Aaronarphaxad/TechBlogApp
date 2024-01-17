import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

export default function Navbar() {
  const { token, isAdmin, logout } = useAuth();

  useEffect(() => {}, [token]);
  return (
    <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
      <div className="mb-2 sm:mb-0">
        <span
          href="/"
          className="text-2xl no-underline text-grey-darkest hover:text-blue-dark"
        >
          <Link to="/">TechSphere Blog</Link>
        </span>
      </div>
      <div>
        <span
          href="admin"
          className="text-md no-underline text-grey-darkest hover:text-blue-700 ml-2"
        >
          <Link to="/portfolio">Portfolio</Link>
        </span>
        {token && (
          <>
            {" "}
            <a
              href="profile"
              className="text-md no-underline text-grey-darkest hover:text-blue-700 mx-2"
            >
              <Link to="/profile">Profile</Link>
            </a>
            {isAdmin && <Link to="/admin">Admin</Link>}
          </>
        )}

        {token ? (
          <>
            <button
              onClick={() => logout()}
              type="button"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 ml-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 ml-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <Link to="/sign-in">Sign In</Link>
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
