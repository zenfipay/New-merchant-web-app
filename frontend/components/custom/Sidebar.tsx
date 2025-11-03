"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CustomButton } from "@/components/custom/CustomButton";
import { useSidebarStore } from "@/store/useSidebarStore";

const menuList = [
  {
    section: "Main",
    items: [
      { 
        title: "Dashboard", 
        icon: "/icons/dashboardIcon.svg", 
        activeIcon: "/icons/activeDashboardIcon.svg", 
        href: "/owner" 
      },
      { 
        title: "Payments",  
        icon: "/icons/paymentIcon.svg",   
        activeIcon: "/icons/activePaymentsIcon.svg", 
        href: "/owner/payments" 
      },
      { 
        title: "Accounts",  
        icon: "/icons/accountsIcon.svg",  
        activeIcon: "/icons/activeAccountsIcon.svg",
        href: "/owner/accounts" },
      { 
        title: "Points of sale", 
        icon: "/icons/pointsofsaleIcon.svg", 
        activeIcon: "/icons/activePointsofsaleIcon.svg", 
        href: "/owner/point-of-sale" 
      },
      { 
        title: "Reports",   
        icon: "/icons/reportsIcon.svg",   
        activeIcon: "/icons/activeReportsIcon.svg", 
        href: "/owner/reports"
       },
       { 
        title: "Activity log",   
        icon: "/icons/reportsIcon.svg",   
        activeIcon: "/icons/activeReportsIcon.svg", 
        href: "/activity-log/reports"
       },
    ],
  },
  {
    section: "Other",
    items: [
      { 
        title: "Settings", 
        icon: "/icons/settingsIcon.svg", 
        activeIcon: "/icons/activeSettingsIcon.svg", 
        href: "/settings" 
      },
      { 
        title: "Help & Support", 
        icon: "/icons/helpIcon.svg", 
        activeIcon: "/icons/activeHelpIcon.svg", 
        href: "/help"
      },
      // { title: "Logout", icon: "/images/logoutIcon.svg", activeIcon: "/images/activeLogoutIcon.svg", href: "/logout" },
    ],
  },
];

export default function SideBar() {
  // selectors: choose only what we need to avoid unnecessary re-renders
  const activeItem = useSidebarStore((s) => s.activeItem);
  const setActiveItem = useSidebarStore((s) => s.setActiveItem);

  // sync with current pathname so the UI highlights correctly when user navigates
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    // map pathname to title. Simple strategy: find menu item with matching href
    const flattened = menuList.flatMap((section) => section.items);
    const match = flattened.find((it) => it.href === pathname);
    if (match) {
      setActiveItem(match.title);
    } else {
      // optional: if no exact match, you can match startsWith
      const prefixMatch = flattened.find((it) => pathname.startsWith(it.href));
      if (prefixMatch) setActiveItem(prefixMatch.title);
    }
  }, [pathname, setActiveItem]);

  const mainItems = menuList.find((s) => s.section === "Main")?.items ?? [];
  const otherItems = menuList.find((s) => s.section === "Other")?.items ?? [];

  return (
    <aside className="flex flex-col h-screen bg-white border-r border-[#F5F5F5] justify-between">
      {/* PROFILE HEADER && MAIN MENU */}
      <div className="">
        <div className="flex justify-center items-center py-3 px-4 gap-2 border-b border-[#F6F6F6]">
          <div className="w-6 h-6 bg-[#20195F] rounded-[4.57px] text-center">
            <span className="inline-block text-green-600">S</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="font-inter font-semibold text-[13px] text-[#101010] leading-[100%] tracking-normal">Shoprite mall ikeja</p>
            <span className="inline-block font-inter font-medium text-[11px] text-[#636363] leading-[100%] tracking-[1.5px]">ID: 656445</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CustomButton variant="secondary" size="sm" className="border border-[#CDDCFF] rounded-sm">
                <Image src="/icons/dropdownArr.svg" alt="dropdown trigger" width={8} height={8} />
              </CustomButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[150px]">
              <DropdownMenuItem>Dialog o!</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Shoprite mall kini
                <div>
                  Trial plan
                  <br />
                  Free until OCT 1st 2025
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Shoprite mall island</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>MR Biggs Lagos →</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div>
          <ul className="flex flex-col pt-3 gap-1">
            {mainItems.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  onClick={() => setActiveItem(item.title)}
                  className={`h-8 flex items-center justify-start px-5 py-[5.5px] gap-2.5 font-inter font-medium text-[11px] transition-all duration-300 ease-out hover:bg-[#FAFAFA]
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
      <ul>
        {otherItems.map((item) => (
          <li key={item.title}>
            <Link
              href={item.href}
              onClick={() => setActiveItem(item.title)}
              className={`h-8 flex items-center font-inter font-medium text-[11px] transition-all duration-200
                ${activeItem === item.title ? "bg-[#EEF3FF] text-[#20195F]" : "text-[#636363]"}`}
            >
              <Image src={activeItem === item.title ? item.activeIcon : item.icon} alt={item.title} width={18} height={18} className={activeItem ? "text-brand" : "text-[#636363]"} />
              <span className="">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
