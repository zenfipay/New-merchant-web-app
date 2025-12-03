"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { filterMenuByRole } from "@/lib/data"; // Keep this import

import { useSidebarStore } from "@/store/useSidebarStore";
import BusinessSelection from "./ActiveBusinessSelection";
import { useUser } from "@/context/UserContext";

export default function Sidebar() {

  const activeItem = useSidebarStore((s) => s.activeItem);
  const setActiveItem = useSidebarStore((s) => s.setActiveItem);

  const pathname = usePathname();

  const { user } = useUser(); // Change this line
  
  // Add this line - filter menu based on user role
  const filteredMenuList = filterMenuByRole(user.role);

  useEffect(() => {
    if (!pathname) return;

    const flattened = filteredMenuList.flatMap((section) => section.items); // Change menuList to filteredMenuList
    const match = flattened.find((it) => it.href === pathname);
    if (match) {
      setActiveItem(match.title);
    } else {
      const prefixMatch = flattened.find((it) => it.href && pathname.startsWith(it.href));
      if (prefixMatch) setActiveItem(prefixMatch.title);
    }
  }, [pathname, setActiveItem, filteredMenuList]); // Add filteredMenuList to dependencies

  const mainItems = filteredMenuList.find((s) => s.section === "Main")?.items ?? []; // Change menuList to filteredMenuList
  const otherItems = filteredMenuList.find((s) => s.section === "Other")?.items ?? []; // Change menuList to filteredMenuList

  return (
    <div className="flex flex-col h-screen bg-white border-r border-[#F5F5F5] justify-between">
      {/* PROFILE HEADER && MAIN MENU */}
      <div className="">
        <BusinessSelection />

        {/* MENU */}
        <div>
          <ul className="flex flex-col pt-3 gap-1">
            {mainItems.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  onClick={() => setActiveItem(item.title)}
                  className={`h-8 flex items-center justify-start px-5 py-[5.5px] gap-2.5 text-[11px] transition-all duration-300 ease-out hover:bg-[#FAFAFA]
                    ${activeItem === item.title ? "bg-[#EEF3FF] text-[#20195F]" : "text-[#636363]"}`}
                >
                  <Image
                    src={activeItem === item.title ? item.activeIcon : item.icon}
                    alt={item.title}
                    width={18}
                    height={18}
                    className={activeItem ? "text-brand" : "text-[#636363]"}
                  />
                  <span className="text-[13px]">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* OTHER MENU */}
      <div className="">
        <ul className="flex flex-col pt-3 gap-1">
          {otherItems.map((item) => (
            <li key={item.title}>
              <Link
                href={item.href}
                onClick={() => setActiveItem(item.title)}
                className={`h-8 flex items-center justify-start px-5 py-[5.5px] gap-2.5 text-[11px] transition-all duration-300 ease-out hover:bg-[#FAFAFA]
                  ${activeItem === item.title ? "bg-[#EEF3FF] text-[#20195F]" : "text-[#636363]"}`}
              >
                <Image src={activeItem === item.title ? item.activeIcon : item.icon} alt={item.title} width={18} height={18} className={activeItem ? "text-brand" : "text-[#636363]"} />
                <span className="text-[13px]">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-col pt-3 gap-1">
          <Link 
            href="/"
            className="h-8 flex items-center justify-start px-5 py-[5.5px] gap-2.5 text-[11px] transition-all duration-300 ease-out hover:bg-[#FFF0F1] hover:text-[#E41D24] cursor-pointer"
          >
            <Image src='/icons/activeLogoutIcon.svg' alt="Logout icon" width={18} height={18} className="" />
            <span className="text-[13px] text-[#E41D24]">Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
}