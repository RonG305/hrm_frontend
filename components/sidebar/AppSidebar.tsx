"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import sidebarItems from "./sidebarItems";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { decodeToken } from "@/lib/utils";

export function AppSidebar() {
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const router = useRouter();

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    const decodedUser = token ? decodeToken(token) : null
    console.log('Decoded User in Sidebar:', decodedUser);

    const userRoles = decodedUser?.roles || []

    const hasAccess = (allowedRoles?: string[]) => {
        if (!allowedRoles || allowedRoles.length === 0) {
            return true;
        }

        if (userRoles.includes('admin')) {
            return true;
        }
        return allowedRoles.some(role => userRoles.includes(role));
    };

  const pathname = usePathname();

  return (
    <Sidebar className="thin-scrollbar" collapsible="icon">
      <SidebarContent className=" thin-scrollbar">
        <SidebarGroup>
          {/* <SidebarGroupLabel> */}
          <div className="flex items-center gap-x-4">
            <Image
              src={"/hr_logo.jpg"}
              alt="HR logo"
              width={60}
              height={60}
              className="rounded-full "
            />
            <div className="text-sm text-gray-950">
              <h2 className="font-bold text-lg">HRM Portal</h2>
              <p className="text-xs">
                Welcome, {loggedInUser ? loggedInUser.name : "Guest"}
              </p>
            </div>
          </div>
          {/* </SidebarGroupLabel> */}

          <div className="border-b border-gray-300 my-3"></div>
          <SidebarGroupContent className="font-medium">
            {sidebarItems.filter(item => hasAccess(item.allowedRoles)).map((item, index) => (
              <Collapsible key={index} defaultOpen={true}>
                <SidebarGroup>
                  <div className="text-sm">
                    <CollapsibleTrigger className="flex items-center justify-between gap-2 text-[16px]">
                      <SidebarMenuItem className="flex gap-4">
                        <SidebarMenuButton
                          asChild
                          // isActive={
                          //   item?.url === pathname ||
                          //   item.children?.some(
                          //     (child) => child.url === pathname
                          //   )
                          // }
                        >
                          <a
                            href={item.url || "#"}
                            className="text-primary uppercase font-semibold"
                          >
                            <span className="flex items-center gap-2">
                              {item.icon}
                              {item.title}
                            </span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent>
                    <SidebarMenu className="ml-4">
                      {item.children?.filter(child => hasAccess(child.allowedRoles)).map((child) => (
                        <SidebarMenuItem key={child.title}>
                          <SidebarMenuButton
                            isActive={child.url === pathname}
                            asChild
                          >
                            <a href={child.url} className="">
                              <span className="flex items-center gap-2">
                                {child.icon}
                                {child.title}
                              </span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
