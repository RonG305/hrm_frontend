import React from "react";
import { ThemeToggle } from "../theme/ThemeToggle";
import { SidebarTrigger } from "../ui/sidebar";

const Navbar = () => {
  return (
    <div className="bg-transparent p-4 flex justify-between items-center">
      <SidebarTrigger />
      <ThemeToggle />
    </div>
  );
};

export default Navbar;
