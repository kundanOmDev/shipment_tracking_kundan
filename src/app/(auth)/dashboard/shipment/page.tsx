"use client";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import useInsertModal from "@/hooks/useInsertModal";
import ModalProvider from "@/providers/ModalProvider";
import { Button } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { FcEditImage } from "react-icons/fc";
import { GiTruck } from "react-icons/gi";
import { AiFillCloseCircle, AiFillDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import router from "next/router";
import { useRouter } from "next/navigation";

// interface ModalProviderProps {
//   selectedShipments: any // Replace 'string' with the actual type of selectedShipment
// }

function Shipment() {
  const router = useRouter();

  const [data, setData] = useState<any[]>([]);
  const [comingData, setComingData] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [userdata, setDataUser] = useState("");

  const [formData, setFormData] = useState({
    shipment_id: "",
    customer_name: "",
    destination_address: "",
    shipment_status: "",
    plan_delivery_date: "",
    actual_delivery_date: "",
    modified_by: "",
  });

  const [formComingData, setFormComingData] = useState({
    shipment_id: "",
    username: "",
    driver_id: "",
  });

  const [selectedShipment, setSelectedShipment] = useState({
    shipment_id: "",
  });

  const itemsPerPage = 5; // Number of items to display per page

  const fetchDataUser = async () => {
    try {
      const requestOptions: RequestInit = {
        method: "POST",
        redirect: "follow",
      };

      const response = await fetch(`/api/userCall`, requestOptions);
      if (response.ok) {
        const Userresult = await response.json();
        toast.success("Data Fetched successfully");

        setComingData(Userresult.data);
      } else {
        console.log("Failed to fetch data");
        toast.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Something went wrong", error);
      toast.error("Something went wrong");
    }
  };
  console.log(comingData);

  useEffect(() => {
    fetchData();
    fetchDataUser();
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

  const insertModal = useInsertModal();
  // const DeleteModal = useDeleteModal();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
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

  const handleChange = (value: any) => {
    setSelectedShipment({ ...selectedShipment, ["shipment_id"]: value });
    openModal();
    console.log(selectedShipment);
  };

  const handlePopInput = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    console.log(formData, "formData");
  };

  const handleEditChange = (detail: any) => {
    console.log(detail, "hggttftf");
    if (detail) {
      setFormData({
        ...formData,
        shipment_id: detail.shipment_id,
        customer_name: detail.customer_name,
        destination_address: detail.destination_address,
        shipment_status: detail.shipment_status,
        plan_delivery_date: detail.plan_delivery_date,
        actual_delivery_date: detail.actual_delivery_date,
        modified_by: userdata,
      });
    }
    // setSelectedShipment(detail);
    // openModal();
    console.log(selectedShipment, "selectedShipment");
  };

  let [selectedDriverId, setSelectedDriverId] = useState("");

  const handleAssignChanges = (e: any) => {
    console.log(e.target.value);

    setSelectedDriverId(e.target.value);
    console.log(selectedDriverId);

    // Find the corresponding driver object based on the selected ID
    const selectedDriver = comingData.find(
      (driver) => driver.driver_id === selectedDriverId
    );

    if (selectedDriver) {
      console.log(formData.shipment_id, "ooooooo");

      // Set the selected driver ID and username in the state
      setFormComingData({
        shipment_id: formData.shipment_id,
        driver_id: selectedDriver.driver_id,
        username: selectedDriver.username,
      });
    } else {
      // Handle the case where no driver is found (optional)
      setFormComingData({
        shipment_id: "",
        driver_id: "",
        username: "",
      });
    }

    console.log(formComingData, "op");
  };

  // Assign Driver modal Handle
  const handleAssignChange = (event: any) => {
    handleEditChange(event);
    console.log(event);

    if (event) {
      setFormComingData({
        ...formComingData,
        username: event.username,
        driver_id: event.driver,
        shipment_id: event.shipment_id,
      });
    }
    console.log(formComingData);
  };

  // Assign update
  const onAssign = async () => {
    // delete formComingData.username;

    console.log(formComingData);
    console.log("Data from table:", formComingData);
    try {
      setIsLoading(true);
      const response = await fetch("/api/assignshipment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formComingData),
      });
      console.log(JSON.stringify(formComingData));
      // toast.success("Data Updated successfully");

      if (response.ok) {
        console.log("Updated successfully");

        // toast.success("Deleted successfully");
        // deleteModal.onClose();
        // Clear the form or redirect to a success page
        closeModalAssign();
        router.refresh();
      } else {
        toast.error("Failed Query");
        console.log("Failed Query");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Edit Update
  const onSave = async () => {
    console.log(formData);
    console.log("Data from table:", formData);
    try {
      setIsLoading(true);
      const response = await fetch("/api/editShipmentAdmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(JSON.stringify(formData));
      // toast.success("Data Updated successfully");

      if (response.ok) {
        console.log("Updated successfully");

        // toast.success("Deleted successfully");
        // deleteModal.onClose();
        // Clear the form or redirect to a success page
        closeModalEdit();
        router.refresh();
      } else {
        toast.error("Failed Query");
        console.log("Failed Query");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
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

  // Edit Modal
  // Modal Open and close
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  // Function to open the modal
  const openModalEdit = () => {
    setIsOpenEdit(true);
  };
  // Function to close the modal
  const closeModalEdit = () => {
    setIsOpenEdit(false);
  };

  // For ASsigning Driver
  // Modal Open and close
  const [isOpenAssign, setIsOpenAssign] = useState(false);
  // Function to open the modal
  const openModalAssign = () => {
    setIsOpenAssign(true);
  };
  // Function to close the modal
  const closeModalAssign = () => {
    setIsOpenAssign(false);
  };
  return (
    <>
      <div className="backdrop-blur-3xl bg-white/60 rounded-lg h-full w-full  overflow-y-auto overflow-hidden">
        <div className=" bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...">
          <ModalProvider />
          <Sidebar>
            <Header>
              <>
                <section className="mx-auto w-full max-w-7xl px-4 py-4">
                  <div className="flex flex-col space-y-4  md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div>
                      <h2 className="text-lg font-semibold">
                        Shipment Management
                      </h2>
                      <p className="mt-1 text-sm text-gray-700">
                        This is a list of all Shipments. You can add new
                        shipments, edit or delete existing ones.
                      </p>
                    </div>
                    <div>
                      <Button
                        onClick={insertModal.onOpen}
                        type="button"
                        className="rounded-md bg-amber-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        Add new Shipment
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
                                <th scope="col">Assign Driver</th>
                                <th scope="col">Action</th>
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
                                    <td className=" py-1 text-sm text-gray-700">
                                      <a
                                        onClick={() => {
                                          openModalAssign();
                                          handleAssignChange(detail);
                                        }}
                                        className="inline-flex justify-center w-full rounded-full border border-gray-300 shadow-sm px-1 py-1 bg-sky text-sm font-medium text-gray-700 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                                      >
                                        <GiTruck size={40} />
                                      </a>
                                    </td>
                                    <td>
                                      <div className="flex gap-x-px">
                                        <a
                                          onClick={() => {
                                            openModalEdit();
                                            handleEditChange(detail);
                                          }}
                                          className="inline-flex justify-center w-full rounded-full border border-gray-300 shadow-sm px-2 py-4 bg-sky text-sm font-medium text-gray-700 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                                        >
                                          <FcEditImage size={15} />
                                        </a>

                                        <a
                                          onClick={() =>
                                            handleChange(detail.shipment_id)
                                          }
                                          // disabled={isLoading}
                                          className="inline-flex justify-center w-full rounded-full border border-gray-300 shadow-sm px-1 py-4 bg-sky text-sm font-medium text-gray-700 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                                        >
                                          <AiFillDelete size={15} />
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

                {/* Edit Modal */}
                {isOpenEdit && (
                  <div
                    id="popup-modal"
                    tabIndex={-1}
                    className="fixed grid justify-items-center top-2 left-5 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-25"
                  >
                    {/* Modal content */}
                    <div className="relative flex items-center justify-center">
                      {/* Modal content */}
                      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button
                          type="button"
                          className="absolute inset-0 top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={closeModalEdit}
                        >
                          <AiFillCloseCircle />
                          <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-6 text-center">
                          <h3 className="mb-1 text-lg font-normal text-gray-500 dark:text-gray-400 px-6">
                            Are you sure you want to Update this Shipment?
                          </h3>
                          <div className="bg-white shadow-md rounded-lg p-4 mb-0">
                            <h2 className="text-xl font-semibold mb-2">
                              Shipment Status Update{" "}
                            </h2>
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700">
                                Shipment ID
                              </label>
                              <input
                                type="text"
                                name="shipment_id"
                                value={formData.shipment_id || ""}
                                className="mt-1 block w-full p-2 border rounded-md bg-gray-100"
                                onChange={handlePopInput}
                                disabled
                              />
                            </div>

                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700">
                                Customer Name
                              </label>
                              <input
                                name="customer_name" // Add this line
                                type="text"
                                className="mt-1 block w-full p-2 border rounded-md bg-gray-100"
                                value={formData.customer_name || ""}
                                onChange={handlePopInput}
                                required
                              />
                            </div>

                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700">
                                Destination Address
                              </label>
                              <input
                                name="destination_address" // Add this line
                                type="text"
                                className="mt-1 block w-full p-2 border rounded-md bg-gray-100"
                                value={formData.destination_address || ""}
                                onChange={handlePopInput}
                                required
                              />
                            </div>

                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700">
                                Shipment Status
                              </label>
                              <select
                                name="shipment_status" // Add this line
                                className="mt-1 block w-full p-2 border rounded-md bg-gray-100"
                                value={formData.shipment_status || ""}
                                onChange={handlePopInput}
                                required
                              >
                                <option>Select value</option>
                                <option value="In Transit">In Transit</option>
                                <option value="Pending">Pending</option>
                                <option value="Delivered">Delivered</option>
                              </select>
                            </div>

                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700">
                                Plan Delivery Date
                              </label>
                              <input
                                name="plan_delivery_date" // Add this line
                                type="date"
                                className="mt-1 block w-full p-2 border rounded-md bg-gray-100"
                                value={formData.plan_delivery_date || ""}
                                onChange={handlePopInput}
                                required
                              />
                            </div>

                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700">
                                Actual Delivery Date
                              </label>
                              <input
                                name="actual_delivery_date" // Add this line
                                type="date"
                                className="mt-1 block w-full p-2 border rounded-md bg-gray-100"
                                value={formData.actual_delivery_date || ""}
                                onChange={handlePopInput}
                                required
                              />
                            </div>
                          </div>

                          <button
                            disabled={isLoading}
                            onClick={onSave}
                            data-modal-hide="popup-modal"
                            type="button"
                            className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                          >
                            Update
                          </button>
                          <button
                            onClick={closeModalEdit}
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

                {isOpenAssign && (
                  <div
                    id="popup-modal"
                    tabIndex={-1}
                    className="fixed grid justify-items-center top-0 left-5 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)]  bg-black bg-opacity-25"
                  >
                    {/* Modal content */}
                    <div className="relative flex items-center justify-center">
                      {/* Modal content */}
                      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button
                          type="button"
                          className="absolute inset-0 top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={closeModalAssign}
                        >
                          <AiFillCloseCircle />
                          <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-6 text-center mx-20">
                          <h3 className="mb-1 text-lg font-normal text-gray-500 dark:text-gray-400 px-6">
                            Are you sure you want to Update this Shipment?
                          </h3>

                          <div className="bg-white shadow-md rounded-lg p-4 mb-0">
                            <h2 className="text-xl font-semibold mb-2">
                              Shipment Status Update{" "}
                            </h2>
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700">
                                Driver ID
                              </label>
                              <select
                                name="driver_id"
                                className="mt-1 block w-full p-2 border rounded-md bg-gray-100"
                                value={formComingData.driver_id || ""}
                                onChange={handleAssignChanges}
                                required
                              >
                                <option>Select value</option>
                                {comingData.map((event) => (
                                  <option
                                    key={event.userid}
                                    value={event.driver_id || ""}
                                  >
                                    {event.driver_id}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700">
                                Driver Name
                              </label>
                              <input
                                name="username" // Add this line
                                type="text"
                                className="mt-1 block w-full p-2 border rounded-md bg-gray-100"
                                value={formComingData.username || ""}
                                onChange={handlePopInput}
                                required
                              />
                            </div>
                          </div>

                          <button
                            disabled={isLoading}
                            onClick={onAssign}
                            data-modal-hide="popup-modal"
                            type="button"
                            className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                          >
                            Update
                          </button>
                          <button
                            onClick={closeModalAssign}
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
              </>
            </Header>
          </Sidebar>
        </div>
      </div>
    </>
  );
}

export default Shipment;
