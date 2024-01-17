import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

export default function Layout() {
  const { token } = useAuth();

  useEffect(() => {}, [token]);
  return (
    <div>
      <Navbar />
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}
