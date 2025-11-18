"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Image from "next/image";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import sidebarItems from "./sidebarItems";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function AppSidebar() {
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof document !== "undefined") {
      const userCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("vivoUser="));

      if (userCookie) {
        const userData = userCookie.split("=")[1];
        setLoggedInUser(
          userData ? JSON.parse(decodeURIComponent(userData)) : null
        );
      }
    }
  }, []);

  // useEffect(() => {
  //    if (!loggedInUser) {
  //       router.push("/login");
  //    }
  // }, [loggedInUser, router]);

  const handleLogout = () => {
    if (typeof document !== "undefined") {
      document.cookie = "vivoUser=; Max-Age=0; path=/";
    }
    setLoading(true);
    setLoggedInUser(null);
    setTimeout(() => {
      router.push("/login");
    }, 3000);
  };

  // const [loading, setLoading] = useState(false)
  // const [loggedInUser, setLoggedInUser] = useState(() => {
  //    const userCookie = document.cookie.split('; ').find(row => row.startsWith('vivoUser='));
  //    if (userCookie) {
  //       const userData = userCookie.split('=')[1];
  //       return userData ? JSON.parse(decodeURIComponent(userData)) : null;
  //    }
  //    return null;
  // });
  // const router = useRouter();
  // useEffect(() => {
  //    if (!loggedInUser) {
  //       router.push('/login');
  //    }
  // }, [loggedInUser, router]);

  // const handleLogout = () => {
  //    document.cookie = 'vivoUser=; Max-Age=0; path=/';
  //    setLoading(true);
  //    setLoggedInUser(null);
  //    const router = useRouter();
  //    setTimeout(() => {
  //       router.push('/login');
  //    }, 3000);
  // };

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
            {sidebarItems.map((item, index) => (
              <Collapsible key={index} defaultOpen={true}>
                <SidebarGroup>
                  <div className="text-sm">
                    <CollapsibleTrigger className="flex items-center justify-between gap-2 text-[16px]">
                      <SidebarMenuItem className="flex gap-4">
                        <SidebarMenuButton
                          asChild
                          isActive={
                            item?.url === pathname ||
                            item.children?.some(
                              (child) => child.url === pathname
                            )
                          }
                        >
                           <a href={item.url || "#"} className="text-primary uppercase font-semibold">
                          <span className="flex items-center gap-2">
                            {item.icon}
                            {item.title}
                          </span>
                           </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      {/* <div className=" flex items-center justify-end">
                                   <ChevronDownIcon className="h-4 w-4  transition-transform duration-200 ease-in-out data-[state=open]:rotate-180" />
                               </div> */}
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent>
                    <SidebarMenu className="ml-4">
                      {item.children?.map((child) => (
                        <SidebarMenuItem key={child.title}>
                          <SidebarMenuButton 
                           isActive={child.url === pathname}
                           variant={`${child.url === pathname ? 'primary': 'default'}`}
                          asChild>
                            <a
                              href={child.url}
                              className=""
                            >
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
