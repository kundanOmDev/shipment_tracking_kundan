'use client'

import useCreateModal from "@/hooks/useCreateModal";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "./Button";


const CreateModal = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState<any[]>([]);
    const itemsPerPage = 5; // Number of items to display per page

    const {isOpen, onClose}= useCreateModal();
    const onChange = ( open: boolean)=>{
        if(!open){
            onClose();
        }
    }

    useEffect(() => {
        fetchData();
      
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [currentPage]);

    const fetchData = async () => {
        try {
          const requestOptions: RequestInit = {
            method: "POST",
            redirect: "follow",
          };
    
          const response = await fetch(
            `/api/allDataShipment?page=${currentPage}&pageSize=${itemsPerPage}`,
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


    return ( 
        <Modal title='Welcome to Online Tracking system'
        description=''
        isOpen ={ isOpen}
        onChange={onChange}
        >
                <section className="mx-auto w-full max-w-7xl px-4 py-4">
                  <div className="flex flex-col space-y-4  md:flex-row md:items-center md:justify-between md:space-y-0">
                    
                  </div>
                  <div className="mt-6 flex flex-col">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200 text-center">
                            <thead className="bg-gray-50 ">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-4 py-3.5 text-left "
                                >
                                  <span>Customer Name</span>
                                </th>
                                <th scope="col">Destination Address</th>
                                <th scope="col">Status</th>
                                <th scope="col">Role</th>
                                <th scope="col">Estimate Deliver</th>
                                
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                              {visibleData.map((detail) => {
                                return (
                                  <tr key={detail.shipment_id}>
                                    <td className="whitespace-nowrap px-1 py-4">
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
                                              {detail.customer_name
                                                .charAt(0)
                                                .toUpperCase()}
                                            </p>
                                          </button>
                                        </div>
                                        <div className="ml-4">
                                          <div className="text-sm font-medium text-gray-900">
                                            {detail.customer_name}
                                          </div>
                                          <div className="text-sm text-gray-700">
                                            {detail.shipment_id}
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="whitespace-nowrap px-1 py-4">
                                      <div className="text-sm text-gray-900 ">
                                        {detail.destination_address}
                                      </div>
                                      <div className="text-sm text-gray-700">
                                        {/* {detail.customer_name} */}
                                      </div>
                                    </td>
                                    <td className="whitespace-nowrap px-1 py-4">
                                      {detail.shipment_status ==
                                        "In Transit" && (
                                        <span className="inline-flex rounded-full bg-red-300 px-2 text-xs font-semibold leading-5 text-black">
                                          {detail.shipment_status}
                                        </span>
                                      )}
                                      {detail.shipment_status == "Pending" && (
                                        <span className="inline-flex rounded-full bg-yellow-300 px-2 text-xs font-semibold leading-5 text-black">
                                          {detail.shipment_status}
                                        </span>
                                      )}
                                      {detail.shipment_status ==
                                        "Delivered" && (
                                        <span className="inline-flex rounded-full bg-green-300 px-2 text-xs font-semibold leading-5 text-black">
                                          {detail.shipment_status}
                                        </span>
                                      )}
                                    </td>

                                    <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-700">
                                      {detail.assign_driver_id}
                                    </td>
                                    <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-700">
                                      {detail.plan_delivery_date}
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

        </Modal>
     );
}
 
export default CreateModal;