"use client";

import Home from "@/components/Home";
import { useSession } from "next-auth/react";

export default function Head() {
  const { data } = useSession();
  console.log(data);

  return (
  <Home>
    
  </Home>
  )
}
