"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import  {FaHome} from "react-icons/fa";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  // const username = sessionStorage.getItem('userdetail');
  const [isLoading, setIsLoading] = useState(false);

  const [authState, setAuthState] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // Check if the code is running in the browser
    if (typeof window !== "undefined") {
      const sessionData = sessionStorage.getItem("userdetail");
      if (sessionData != null) {
        // Handle the data from sessionStorage
        router.push("/dashboard");
      }
    }
  }, [router]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    const myHeaders: Headers = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw: string = JSON.stringify({
      email: authState.email,
      password: authState.password,
    });
    console.log(raw, "json data");

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3000/api/login", requestOptions)
      .then((response: Response) => response.text())
      .then((result: string) => {
        console.log(result);
        let arr = JSON.parse(result);
        console.log(arr);
        
        if (arr.message == "Login successful") {
          if (arr.data.role === "Admin") {
            toast.success("Logged in As Admin")
            router.push("/dashboard");
            setIsLoading(false);
          } else if (arr.data.role === "Driver") {
            toast.success("Logged in as Driver")
            router.push("/driverdashboard");
            setIsLoading(false);
          }
          // setAuthData(arr)
          sessionStorage.setItem("userdetail", JSON.stringify(arr));
          // console.log(userDetail,"User detail updated");
        } else {
          setIsLoading(false);
          toast.error("something went wrong");
          console.log("something went wrong");
        }
      })
      .catch((error: Error) => toast.error(error.message) 
      );
      
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setAuthState({ ...authState, [name]: value });
  };
  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-2 p-8">
        <div className="card rounded-sm	backdrop-blur-sm bg-white/30">
          <div className="flex items-center justify-center px-4 py-5 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <div className="flex">
                <div >
                <Link  href={"/"} >
                  <FaHome className=" rounded-full p-2  bg-gradient-to-r from-green-200 to-blue-300 hover:from-pink-300 hover:to-yellow-100" size={50} />
                </Link>
                </div>
                <h2 className="px-4 text-3xl font-bold leading-tight text-gray-100 sm:text-4xl">
                  Sign in
                </h2>
              </div>
              <form action="#" method="POST" className="mt-8">
                <div className="space-y-5">
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor=""
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Email Address{" "}
                      </label>

                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300  px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="email"
                        placeholder="Email"
                        id="email"
                        name="email"
                        value={authState.email}
                        onChange={handleChange}>
                      </input>
                    </div>

                    <div className="flex items-center justify-between">
                      <label
                        htmlFor=""
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Password{" "}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300  px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                        value={authState.password}
                        onChange={handleChange}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <button
                      disabled={isLoading}
                      type="button"
                      className="inline-flex w-full items-center justify-center rounded-md bg-indigo-500 shadow-lg shadow-indigo-300/50 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-indigo-800/80"
                      onClick={handleSubmit}
                    >
                      Login
                    </button>
                  </div>
                  <div>
                    <p className="mt-2 text-sm text-gray-600">
                      Don&apos;t have an account?{"    "}
                      <Link
                        href="/register"
                        title=""
                        className="font-semibold text-black transition-all duration-200 hover:underline"
                      >
                        Create account
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className=" ">
          <img
            className="mx-auto h-full w-full rounded-md object-cover"
            src="https://images.unsplash.com/photo-1634979149798-e9a118734e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
            alt="" />
        </div>

      </div></>
  );
}
