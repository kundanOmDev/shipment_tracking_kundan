"use client";
import Header from "@/components/Header";
import SidebarDriver from "@/components/SidebarDriver";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface DriverProps {
  children: React.ReactNode,
}

const Driver: React.FC <DriverProps> = ({
  children
}) => {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);

  // const username = sessionStorage.getItem("userdetail");
  // console.log(username);

  useEffect(() => {
    // Check if the code is running in the browser
    if (typeof window !== 'undefined') {
      const username = sessionStorage.getItem('userdetail');
      if (username ==null) {
        // Handle the data from sessionStorage
        router.push("/login");
      }
    }
    fetchData();
  }, []);

  
  const fetchData = async () => {
    try {
      const requestOptions: RequestInit = {
        method: "POST",
        redirect: "follow",
      };

      const response = await fetch(`/api/count`, requestOptions);
      if (response.ok) {
        const result = await response.json();
        toast.success('Data Fetched successfully');

        setData(result.data);
      } else {
        console.log('Failed to fetch data');
        toast.error('Failed to fetch data');
      }
    } catch (error) {
      console.error("Something went wrong", error);
      toast.error('Something went wrong');

    }
  };
  return (
    <>
      <div className=" bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...">
        <SidebarDriver>
        <div className='backdrop-blur-xl bg-white/30 rounded-lg h-screen w-full  overflow-y-auto'>

          <Header>
            
          </Header>
          <div className="flex container mx-auto px-20">
              <div className="container mx-auto px-10 text-center">
                <div >
                  <div className="w-72 bg-white rounded-lg shadow-md p-6" >
                    <div className="w-16 mx-auto relative -mt-10 mb-3">
                    <div className="rounded-full bg-red-400 px-5 py-5">
                      <p className="text-2xl text-white">{data[1]?.countdata}</p>
                    </div>
                    </div>
                    <span className="w-full  block leading-normal text-gray-800 text-md mb-3">Total No of In Transit</span>
                    <div className="flex items-center justify-between">
                      <a className="text-xs text-gray-400 mr-1 hover:text-gray-800" href="#"></a>
                      <div className="w-1/2">
                        {/* <button type="button" className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">Accept</button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container mx-auto px-10 text-center">
                <div >
                  <div className="w-72 bg-white rounded-lg shadow-md p-6" >
                    <div className="w-16 mx-auto relative -mt-10 mb-3">
                    <div className="rounded-full bg-yellow-400 px-5 py-5">
                      <p className="text-2xl text-white">{data[0]?.countdata}</p>
                    </div>
                    </div>
                    <span className="w-full  block leading-normal text-gray-800 text-md mb-3">Total No of Pending</span>
                    <div className="flex items-center justify-between">
                      <a className="text-xs text-gray-400 mr-1 hover:text-gray-800" href="#"></a>
                      <div className="w-1/2">
                        {/* <button type="button" className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">Accept</button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container mx-auto px-10 text-center">
                <div >
                  <div className="w-72 bg-white rounded-lg shadow-md p-6" >
                    <div className="w-16 mx-auto relative -mt-10 mb-3">
                    <div className="rounded-full bg-green-600 px-5 py-5">
                      <p className="text-2xl text-white">{data[2]?.countdata}</p>
                    </div>
                    </div>
                    <span className="w-full  block leading-normal text-gray-800 text-md mb-3">Total No of Delivered</span>
                    <div className="flex items-center justify-between">
                      <a className="text-xs text-gray-400 mr-1 hover:text-gray-800" href="#"></a>
                      <div className="w-1/2">
                        {/* <button type="button" className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">Accept</button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>

          
                
          </div>
        </SidebarDriver>
      </div>
    </>
  );
};

export default Driver;
