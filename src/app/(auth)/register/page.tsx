/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@radix-ui/themes";
import { FaHome } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Register() {
  const router = useRouter();
  const username = sessionStorage.getItem("userdetail");

  useEffect(() => {
    if (username !== null) {
      router.push("/dashboard");
    }
  }, []);

  const [errorMessages, setErrorMessages] = useState({
    username: "",
    email: "",
    password: "",
    contact_number: "",
    license_number: "",
    vehicle_number: "",
  });
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    status: "N",
    role: "Driver",
    contact_number: "",
    vehicle_number: "",
    license_number: "",
  });
  // console.log(formData);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!formData.username) {
      setErrorMessages({ ...errorMessages, username: "Username is required" });
    }

    if (!formData.email) {
      setErrorMessages({ ...errorMessages, email: "Email is required" });
    } else {
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailPattern.test(formData.email)) {
        setErrorMessages({ ...errorMessages, email: "Invalid email address" });
      }
    }

    if (!formData.password) {
      setErrorMessages({ ...errorMessages, password: "Password is required" });
    }

    // Add similar checks for other fields (contact_number, license_number, vehicle_number)

    // Check if any error messages exist
    const hasErrors = Object.values(errorMessages).some(
      (message) => message !== ""
    );

    if (hasErrors) {
      return;
    }

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log(JSON.stringify(formData));

      if (response.ok) {
        toast.success("User registered successfully");
        console.log("User registered successfully");
        // Clear the form or redirect to a success page
        router.push("/login");
      } else {
        toast.error("User registration failed");
        console.error("Failed to register user");
      }
    } catch (error) {
      toast.error("Error registering User");
      console.error("Error registering user:", error);
    }
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessages({ ...errorMessages, [name]: "" });
  };

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 p-5">
        <div className="card rounded-sm	backdrop-blur-sm bg-white/30">
          <div className="flex items-center justify-center px-1 py-10 sm:px-6 sm:py-5 lg:px-2 lg:py-6">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <div className="flex">
                <div>
                  <Link href={"/"}>
                    <FaHome
                      className=" rounded-full p-2 bg-gradient-to-r from-green-200 to-blue-300 hover:from-pink-300 hover:to-yellow-100"
                      size={50}
                    />
                  </Link>
                </div>

                <h2 className="px-10 text-3xl font-bold leading-tight text-gray-100 sm:text-4xl">
                  Registration
                </h2>
              </div>
              
              <form action="#" method="POST">
                <div className="space-y-5 text-left">
                  <div className="mt-2">
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      User Name
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300  px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="username"
                      id="username"
                      placeholder="username"
                      name="username"
                      value={formData.username}
                      required
                      onChange={handleChange}
                    ></input>
                    {errorMessages.username && (
                      <p className="text-red-500">{errorMessages.username}</p>
                    )}
                  </div>
                  <div className="mt-2">
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Email address{" "}
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300  px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      id="email"
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    ></input>
                    {errorMessages.email && (
                      <p className="text-red-500">{errorMessages.email}</p>
                    )}
                  </div>
                  <div className="mt-2">
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Password{" "}
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300  px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      id="password"
                      placeholder="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    ></input>
                    {errorMessages.password && (
                      <p className="text-red-500">{errorMessages.password}</p>
                    )}
                  </div>
                  <div className="mt-2">
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Contact{" "}
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300  px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="contact_number"
                      id="contact_number"
                      placeholder="Contact Number"
                      name="contact_number"
                      value={formData.contact_number}
                      onChange={handleChange}
                      required
                    ></input>
                  </div>

                  <div className="mt-2">
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      License{" "}
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300  px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="license_number"
                      id="license_number"
                      placeholder="License Number"
                      name="license_number"
                      value={formData.license_number}
                      onChange={handleChange}
                      required
                    ></input>
                  </div>

                  <div className="mt-2">
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Vehicle{" "}
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300  px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="vehicle_number"
                      id="vehicle_number"
                      placeholder="Vehicle Number"
                      name="vehicle_number"
                      value={formData.vehicle_number}
                      onChange={handleChange}
                      required
                    ></input>
                  </div>

                  <div>
                    <Button
                      type="button"
                      className="inline-flex w-full items-center justify-center rounded-md bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 px-3.5 py-2.5 font-semibold leading-7 text-white "
                      onClick={handleSubmit}
                    >
                      Register
                    </Button>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                Already have an account?{"    "}
                <Link
                  href="/login"
                  title=""
                  className="font-semibold text-black transition-all duration-200 hover:underline"
                >
                  Login
                </Link>
              </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="h-full w-full">
          <img
            className="mx-auto h-full w-full rounded-md object-cover"
            src="https://images.unsplash.com/photo-1485988412941-77a35537dae4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1796&q=80"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
