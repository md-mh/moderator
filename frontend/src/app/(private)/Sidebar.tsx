"use client";

import React from "react";
import ScientistX from "@/assets/icons/ScientistX.svg";
import ListView from "@/assets/icons/ListView.svg";
import Door from "@/assets/icons/Door.svg";
import DashboardLayout from "@/assets/icons/DashboardLayout.svg";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(true);

  return (
    <Sidebar {...props} collapsible="icon" className="bg-[#111822] py-5">
      <SidebarHeader className="mt-1">
        <SidebarMenu className="rounded-md">
          <SidebarMenuItem>
            {/* <SidebarMenuButton size="lg" asChild> */}
            <div
              className="flex justify-center items-center align-middle gap-2 cursor-pointer"
              onClick={() => {
                toggleSidebar();
                setIsSidebarOpen(!isSidebarOpen);
              }}
            >
              <div
                className={`w-[179px] h-[94px] ${
                  isSidebarOpen ? "block" : "hidden"
                }`}
              >
                <Image src={ScientistX} alt="ScientistX" />
              </div>
              <div className="w-[40px] h-[80px]">
                <Image src={Door} alt="Door" />
              </div>
            </div>
            {/* </SidebarMenuButton> */}

            {/* <Image src={Door} alt="Door" />
            <Image src={DashboardLayout} alt="DashboardLayout" /> */}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <nav className="flex flex-col gap-2 mt-4">
          <Link
            href="/"
            className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors duration-150 hover:bg-[#232a34] ${
              pathname === "/" ? "bg-[#2A2A2A]" : ""
            }`}
          >
            <Image src={DashboardLayout} alt="DashboardLayout" />
            {isSidebarOpen && (
              <span
                className="text-lg font-normal"
                style={{ color: "#E2B49A" }}
              >
                Dashboard
              </span>
            )}
          </Link>
          <Link
            href="/moderator"
            className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors duration-150 hover:bg-[#232a34] ${
              pathname === "/moderator" ? "bg-[#2A2A2A]" : ""
            }`}
          >
            <Image src={ListView} alt="ListView" />
            {isSidebarOpen && (
              <span
                className="text-lg font-normal"
                style={{ color: "#E2B49A" }}
              >
                Moderator List
              </span>
            )}
          </Link>
        </nav>
      </SidebarContent>
    </Sidebar>
  );
}
