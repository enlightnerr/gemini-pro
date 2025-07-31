"use client";
import HeroNavbar from "@/components/Navigation/HeroNavbar";
import { useState } from "react";

function Dashboarlayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="h-screen flex flex-col sm:grid sm:grid-cols-[auto_1fr]">
      {/* Sidebar or Mobile Navbar */}
      <div
        className="sm:h-full"
        style={{
          width: collapsed ? "60px" : "240px",
          display: "none",
        }}
      />

      <HeroNavbar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Page Content */}
      <div className="flex-1 bg-blue overflow-auto">{children}</div>
    </div>
  );
}
export default Dashboarlayout;
