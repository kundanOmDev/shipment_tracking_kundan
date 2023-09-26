"use client";
import Header from "@/components/Header";
import Home from "@/components/Home";
import Sidebar from "@/components/Sidebar";
import useCreateModal from "@/hooks/useCreateModal";
import useInsertModal from "@/hooks/useInsertModal";
import ModalProvider from "@/providers/ModalProvider";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillCloseCircle, AiFillDelete } from "react-icons/ai";
import { FcEditImage } from "react-icons/fc";

function Driver() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedShipment, setSelectedShipment] = useState({
    role: "",
  });

  const itemsPerPage = 5; // Number of items to display per page

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const requestOptions: RequestInit = {
        method: "POST",
        redirect: "follow",
      };

      const response = await fetch(
        `/api/allDataDriver?page=${currentPage}&pageSize=${itemsPerPage}`,
        requestOptions
      );
      if (response.ok) {
        const result = await response.json();
        toast.success("Data Fetched successfully");

        setData(result.data);
      } else {
        console.log("Failed to fetch data");
        toast.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Something went wrong", error);
      toast.error("Something went wrong");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const visibleData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  console.log(visibleData);

  const insertModal = useInsertModal();
  const CreateModal = useCreateModal();

  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    console.log(selectedShipment);
    console.log("Data from table:", selectedShipment);
    try {
      setIsLoading(true);
      const response = await fetch("/api/deleteshipment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedShipment),
      });
      console.log(JSON.stringify(selectedShipment));
      toast.success("Data deleted successfully");

      if (response.ok) {
        console.log("Deleted successfully");

        toast.success("Deleted successfully");
        // deleteModal.onClose();
        // Clear the form or redirect to a success page
        router.refresh();
        closeModal();
      } else {
        toast.error("Failed Query");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async () => {
    console.log(selectedShipment);
    console.log("Data from table:", selectedShipment);
    try {
      setIsLoading(true);
      const response = await fetch("/api/allDataDriver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedShipment),
      });
      console.log(JSON.stringify(selectedShipment));
      toast.success("Data Saved successfully");

      if (response.ok) {
        console.log("Deleted successfully");

        toast.success("Deleted successfully");
        // deleteModal.onClose();
        // Clear the form or redirect to a success page
        router.refresh();
        closeModal();
      } else {
        toast.error("Failed Query");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const handleChange = (value: any) => {
    setSelectedShipment({ ...selectedShipment, ["role"]: value });
    openModal();
    console.log(selectedShipment);
  };

  // Modal Open and close
  const [isOpen, setIsOpen] = useState(false);
  // Function to open the modal
  const openModal = () => {
    setIsOpen(true);
  };
  // Function to close the modal
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
    <div className="backdrop-blur-xl bg-white/30 rounded-lg h-full w-full  overflow-y-auto">
      <div className=" bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...">
        <ModalProvider />
        <Sidebar>
            <Header>
              
            
            <section className="mx-auto w-full max-w-7xl px-4 py-4">
              <div className="flex flex-col space-y-4  md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                  <h2 className="text-lg font-semibold">Driver Management</h2>
                  <p className="mt-1 text-sm text-gray-700">
                    This is a list of all Drivers. You can add new employees,
                    edit or delete existing ones.
                  </p>
                </div>
                <div>
                  <Button
                    onClick={()=> router.push('/dashboard/shipment')}
                    
                    type="button"
                    className="rounded-md bg-blue-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Assign Driver
                  </Button>
                </div>
              </div>
              <div className="mt-6 flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200 text-center">
                        <thead className="bg-gray-50 ">
                          <tr>
                            <th scope="col" className="px-4 py-3.5 ">
                              <span>Driver Name </span>
                            </th>
                            <th scope="col">Driver ID</th>

                            <th scope="col">Contact Number</th>

                            <th scope="col">Vehicle Number</th>

                            <th scope="col">License Number</th>

                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {visibleData.map((detail) => {
                            return (
                              <tr key={detail.driver_id}>
                                {/* <td className="whitespace-nowrap px-4 py-4">
                                  <div className="flex items-center">
                                    <div className="h-10 w-10 flex-shrink-0">
                                      <button
                                        type="button"
                                        className="inline-flex justify-center w-full rounded-full border border-gray-300 shadow-sm px-4 py-2 bg-sky text-sm font-medium text-gray-700 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                                        id="options-menu"
                                        aria-haspopup="true"
                                        aria-expanded="true"
                                      >
                                        <p className="font-semibold ">
                                          {detail.driver_id
                                            .charAt(0)
                                            .toUpperCase()
                                            }
                                        </p>
                                      </button>
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">
                                        {detail.driver_id}
                                      </div>
                                      <div className="text-sm text-gray-700">
                                        {detail.driver_name}
                                      </div>
                                    </div>
                                  </div>
                                </td> */}

                                <td className="whitespace-nowrap px-12 py-4">
                                  <div className="text-sm text-gray-900 ">
                                    {detail.username}
                                  </div>
                                  <div className="text-sm text-gray-700">
                                    {/* {detail.username} */}
                                  </div>
                                </td>

                                <td className="whitespace-nowrap px-12 py-4">
                                  <div className="text-sm text-gray-900 ">
                                    {detail.driver_id}
                                  </div>
                                  <div className="text-sm text-gray-700">
                                    {/* {detail.username} */}
                                  </div>
                                </td>
                                
                                <td className="whitespace-nowrap px-12 py-4">
                                  <div className="text-sm text-gray-900 ">
                                    {detail.contact_number}
                                  </div>
                                  <div className="text-sm text-gray-700">
                                    {/* {detail.customer_name} */}
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4">
                                  <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                    {detail.vehicle_number}
                                  </span>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                  {detail.license_number}
                                </td>
                                {/* <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                    {detail.plan_delivery_date}
                                  </td> */}
                                <td>
                                  <div className="flex px-4 py-3.5 gap-x-px">
                                    <a
                                      // href=""
                                      className="inline-flex justify-center w-full rounded-full border border-gray-300 shadow-sm px-2 py-4 bg-sky text-sm font-medium text-gray-700 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                                    >
                                      <FcEditImage size={20} />
                                    </a>

                                    <a
                                      // onClick={openModal}
                                      // onClick={DeleteModal.onOpen}
                                      // name="shipment_id"
                                      // value={detail.shipment_id}
                                      // onChange={}
                                      onClick={() =>
                                        handleChange(detail.role)
                                      }
                                      className="inline-flex justify-center w-full rounded-full border border-gray-300 shadow-sm px-1 py-4 bg-sky text-sm font-medium text-gray-700 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                                    >
                                      <AiFillDelete size={20} />
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}

                          {/* ))} */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {/* Pagination controls */}
              <div className="flex items-center justify-center pt-6">
                <a
                  href="#"
                  className={`mx-1 ${
                    currentPage === 1 ? "cursor-not-allowed" : ""
                  } text-sm font-semibold text-gray-900`}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <span className="hidden md:block">&larr; Previous</span>
                  <span className="block md:hidden">&larr;</span>
                </a>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105 ${
                      currentPage === index + 1 ? "bg-gray-300" : ""
                    }`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </a>
                ))}
                <a
                  href="#"
                  className={`mx-2 text-sm font-semibold text-gray-900 ${
                    currentPage === totalPages ? "cursor-not-allowed" : ""
                  }`}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <span className="hidden lg:block">Next &rarr;</span>
                  <span className="block lg:hidden">&rarr;</span>
                </a>
              </div>
            </section>
            {/* Modal */}
            {isOpen && (
                  <div
                    id="popup-modal"
                    tabIndex={-1}
                    className="fixed grid justify-items-center top-2 left-5 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-25"
                  >
                    {/* Modal content */}
                    <div className=" flex items-center justify-center">
                      {/* Modal content */}
                      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 mb-12">
                        <button
                          type="button"
                          className="absolute inset-0 top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={closeModal}
                        >
                          <AiFillCloseCircle />
                          <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-6 text-center">
                          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 px-6">
                            Are you sure you want to delete this Shipment?
                          </h3>

                          <button
                            onClick={onSubmit}
                            data-modal-hide="popup-modal"
                            type="button"
                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                          >
                            Yes
                          </button>
                          <button
                            onClick={closeModal}
                            type="button"
                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                          >
                            No, cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* close */}
            </Header>
        </Sidebar>
      </div>
    </div>
    </>
  );
}

export default Driver;
