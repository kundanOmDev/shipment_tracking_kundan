'use client'

import { useEffect, useState } from "react";
import CreateModal from "@/components/CreateModal";
import InsertModal from "@/components/InsertModal";
import DeleteModal from "@/components/DeleteModal";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect (()=>{
        setIsMounted(true)
    },[]);
    if(!isMounted){
        return null;
    }

  return (
    <div>
        <CreateModal/>
        <InsertModal/>
        <DeleteModal selectedShipments={0} />
    </div>
  )
}

export default ModalProvider