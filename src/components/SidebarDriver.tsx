"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { FcShipped } from "react-icons/fc";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { GiSteeringWheel } from "react-icons/gi";
import { TbPackageExport } from "react-icons/tb";
import SidebarItem from "./Sidebaritem";
import Box from "./Box";
import Link from "next/link";
import Header from "./Header";

interface DriverSidebarProps {
  children: React.ReactNode;
}

const DriverSidebar: React.FC<DriverSidebarProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: MdSpaceDashboard,
        label: "Driver Dashboard",
        active: pathname !== "/driverdashboard",
        href: "/driverdashboard",
      },

    //   {
    //     icon: MdOutlineAdminPanelSettings,
    //     label: "Admin",
    //     active: pathname !== "/dashboard/admin",
    //     href: "/dashboard/admin",
    //   },
    //   {
    //     icon: TbPackageExport,
    //     label: "Shipment",
    //     active: pathname !== "/dashboard/shipment",
    //     href: "/dashboard/shipment",
    //   },
      {
        icon: GiSteeringWheel,
        label: "Driver View",
        active: pathname !== "/driverdashboard/driver",
        href: "/driverdashboard/driver",
      },
    ],
    [pathname]
  );
  return (
    <div className="flex h-full ">
      <div className="hidden md:flex flex-col gap-y-2 h-full w-[300px] p-2">
       
        <Box className="backdrop-blur-xl bg-white/30 shadow-xl">
          <div className="inline-flex items-center gap-x-2 p-5">
          {/* <Link href="/dashboard"> */}
        
            <FcShipped
              onClick={() => router.push("/driverdashboard")}
              size={50}
              className="hover:rotate-45 cursor-pointer"
            />
            <p onClick={() => router.push("/driverdashboard")} className="text-2xl italic hover:not-italic font-extrabold cursor-pointer">
              Shipment Tracker
            </p>
        {/* </Link> */}
          </div>
        </Box>
        <Box className="backdrop-blur-xl bg-white/30 overflow-y-auto h-screen shadow-xl">
          <div className=" flex flex-col gap-y-5 px-5 py-6 text-xl">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}
      </main>
    </div>
  );
};

export default DriverSidebar;
