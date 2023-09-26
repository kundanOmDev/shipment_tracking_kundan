"use client";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft } from "react-icons/rx";
import { RxCaretRight } from "react-icons/rx";
import { MdSpaceDashboard } from "react-icons/md";
import { FcShipped } from "react-icons/fc";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { GiSteeringWheel } from "react-icons/gi";
import { TbPackageExport } from "react-icons/tb";
 
import Chat from "./Chat";
import { useState, useEffect } from "react";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}
const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    // Check if the code is running in the browser
    if (typeof window !== "undefined") {
      const sessionData = sessionStorage.getItem("userdetail");
      if (sessionData) {
        const parsedData = JSON.parse(sessionStorage.userdetail);
        // Parse the session data as JSON and set it in the state
        setData(parsedData.data.role);
      }
    }
  }, []);

  return (
    <div
      className={twMerge(`h-fit bg-gradient-to-b from-cyan-200 p-6`, className)}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="shadow-xl rounded-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft className="text-white" size={40} />
          </button>
          <button
            onClick={() => router.forward()}
            className="shadow-xl rounded-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretRight className="text-white" size={40} />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full shadow-xl bg-teal-300 flex items-center justify-center hover:opacity-75 transition p-3">
            <MdSpaceDashboard
              onClick={() => router.push("/dashboard")}
              className="text-black"
              size={30}
            />
          </button>
        </div>

        <h2 className="text-2xl hidden md:flex">
          {data} Dashboard
          </h2>
        {/* <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full shadow-xl bg-teal-300 flex items-center justify-center hover:opacity-75 transition p-3">
            <MdOutlineAdminPanelSettings onClick={() => router.push("/dashboard")} className="text-black" size={30} />
          </button>
        </div> */}
        
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full shadow-xl bg-teal-300 flex items-center justify-center hover:opacity-75 transition p-3">
            <TbPackageExport onClick={() => router.push("/dashboard/shipment")} className="text-black" size={30} />
          </button>
        </div>

        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full shadow-xl bg-teal-300 flex items-center justify-center hover:opacity-75 transition p-3">
            <GiSteeringWheel onClick={() => router.push("/dashboard/driver")} className="text-black" size={30} />
          </button>
        </div>

        <div className="flex justify-between items-center gap-x-2">
          
          <>
          <p className="semibold text-slate-500">Welcome</p>
            <Chat />
          </>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
