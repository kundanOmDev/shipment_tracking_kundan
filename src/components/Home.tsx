"use client";

import Link from "next/link";
import Button from "./Button";
import { useRouter } from "next/navigation";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import Image from 'next/image'
import  track  from "../assets/latest_tracking image.png"
import ModalProvider from "@/providers/ModalProvider";
import useCreateModal from "@/hooks/useCreateModal";

interface Homeprops {
  children: React.ReactNode;
}

const Home: React.FC<Homeprops> = ({ children }) => {

  const router = useRouter();
  const [username, setUsername] = useState('');
  const CreateModal = useCreateModal();


  useEffect(() => {
    // Check if the code is running in the browser
    if (typeof window !== 'undefined') {
      const storedUsername = sessionStorage.getItem('userdetail');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, []);
  

  return (
    <><ModalProvider />
    <div className="grid grid-rows-3 grid-flow-col gap-4">
      <div className="row-start-2 row-span-2 ">
        <div className="text-center">
          <Image

            src={track}
            width={900}
            height={900}
            alt="Picture of the author" />
        </div>
      </div>
      <div className="col-span-2 ...">
        <div className="flex float-right ">
          <Link href="/login" className="m-10">
            <Button className="text-white px-20 font-lg drop-shadow-xl shadow-lime-500/50 bg-lime-500 hover:text-gray-200">
              Log in
            </Button>
          </Link>

          <Link href="/register" className="m-10">
            <Button className="text-white px-20 font-lg drop-shadow-xl shadow-cyan-500/50 bg-cyan-800  hover:bg-gray-800">
              Register
            </Button>
          </Link>
        </div>
      </div>
      <div className="row-span-2 col-span-2 ...">
        <div className="text-center">
          <p className="mt-2 px-5 text-gray-200 text-7xl font-bold">Faster and better everything at your doorstep</p>
          <div className="px-5 py-20">
            <form className="flex lg:justify-center">
              <div className="flex w-full  items-center ">
                <input
                  className=" flex h-10 w-full rounded-md border border-white bg-transparent px-3 py-2 text-sm placeholder-gray-200 focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1"
                  type="email"
                  placeholder="Track you Id"
                ></input>
                <button
                onClick={CreateModal.onOpen}
                  type="button"
                  className="mx-10 px-10 rounded-md bg-white py-2 text-sm font-semibold text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
                >
                  Track
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div></>
  );
};

export default Home;
