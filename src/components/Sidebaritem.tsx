'use client'
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

interface SidebarItemProps {
    icon: IconType,
    label: string,
    active?: boolean,
    href: string,
}

const Sideitems: React.FC <SidebarItemProps> = ({
    icon: Icon,
    label,
    active,
    href
}) => {
  return (
    <Link href={href} className={twMerge(`flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-white py-1`,active && "text-black")}>
        <Icon size={40}/>
        <p className="truncate w-full">
            {label}
        </p>
    </Link>
  )
}

export default Sideitems