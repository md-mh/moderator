"use client";

import React from "react";
// import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from "@/components/ui/select";
// import GetCurrentUser from "@/components/share/GetCurrentUser";

const Header = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <>
      {/* <GetCurrentUser /> */}
      <header className="flex sticky top-0 z-50 w-full items-center justify-between px-2 h-20 bg-white">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            hi
          </Button>
        </div>
      </header>
    </>
  );
};

export default Header;
