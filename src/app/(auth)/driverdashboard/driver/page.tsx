"use client";
import Header from "@/components/Header";
import SidebarDriver from "@/components/SidebarDriver";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { AiFillCloseCircle } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

function Driver() {
  const [userdata, setDataUser] = useState("");
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Check if the code is running in the browser
    if (typeof window !== "undefined") {
      const sessionData = sessionStorage.getItem("userdetail");
      if (sessionData) {
        const parsedData = JSON.parse(sessionStorage.userdetail);
        // Parse the session data as JSON and set it in the state
        setDataUser(parsedData.data.username);
      }
    }
  }, []);

  console.log(userdata);

  let [selectedShipment, setSelectedShipment] = useState({
    shipment_id: "",
    shipment_status: "", // Update with the actual type
    plan_delivery_date: "",
    actual_delivery_date: "",
    entered_by: "",
  });

  const [formData, setFormData] = useState({
    shipment_id: "",
    shipment_status: "",
    plan_delivery_date: "",
    actual_delivery_date: "",
    entered_by: "",
  });

  const itemsPerPage = 5; // Number of items to display per page

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


  const [isLoading, setIsLoading] = useState(false);

  const onSave = async () => {
    console.log(formData);
    console.log("Data from table:", formData);
    try {
      setIsLoading(true);
      const response = await fetch("/api/shipmentStatusDriver", {
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
        closeModal();
        router.refresh();
        closeModal();
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

  const handlePopInput = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    console.log(formData, "formData");
  };

  const handleChange = (detail: any) => {
    console.log(detail);
    if (detail) {
      setFormData({
        ...formData,
        shipment_id: detail.shipment_id,
        shipment_status: detail.shipment_status,
        plan_delivery_date: detail.plan_delivery_date,
        entered_by: userdata,
      });
    }
    // setSelectedShipment(detail);
    // openModal();
    console.log(selectedShipment, "selectedShipment");
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
    <div className="backdrop-blur-xl bg-white/30 rounded-lg h-full w-full  overflow-y-auto">
      <>
        <div className=" bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...">
          <SidebarDriver>
            <Header>
              <>
                <section className="mx-auto w-full max-w-7xl px-4 py-4">
                  <div className="flex flex-col space-y-4  md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div>
                      <h2 className="text-lg font-semibold">
                        Driver Management
                      </h2>
                      <p className="mt-1 text-sm text-gray-700">
                        This is a list of all employees. You can add new
                        employees, edit or delete existing ones.
                      </p>
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
                                <th scope="col">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                              {visibleData.map((detail) => {
                                return (
                                  <tr key={detail.shipment_id}>
                                    <td className="whitespace-nowrap px-2 py-2">
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
                                            {/* {detail.customer_name} */}
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                      <div className="text-sm text-gray-900 ">
                                        {detail.destination_address}
                                      </div>
                                      <div className="text-sm text-gray-700">
                                        {/* {detail.customer_name} */}
                                      </div>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-4">
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
                                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                      {detail.assign_driver_id}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                      {detail.plan_delivery_date}
                                    </td>
                                    <td>
                                      <div className="flex gap-x-px px-2 py-2 ">
                                        <a
                                          onClick={() => {
                                            openModal();
                                            handleChange(detail);
                                          }}
                                          // href=""
                                          className="inline-flex justify-center w-full rounded-full border border-gray-300 shadow-sm px-1 py-3 bg-sky text-sm font-medium text-gray-700 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                                        >
                                          <FiEdit size={20} />
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
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
                    <div className="relative flex items-center justify-center">
                      {/* Modal content */}
                      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
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
                            Are you sure you want to Update this Shipment?
                          </h3>
                          <div className="bg-white shadow-md rounded-lg p-4 mb-4">
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
                                value={formData.shipment_id}
                                className="mt-1 block w-full p-2 border rounded-md bg-gray-100"
                                // value={deliveryDate}
                                onChange={handlePopInput}
                                disabled
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700">
                                Status
                              </label>
                              <select
                                name="shipment_status" // Add this line
                                className="mt-1 block w-full p-2 border rounded-md bg-gray-100"
                                value={formData.shipment_status}
                                onChange={handlePopInput}
                                required
                              >
                                <option>Select value</option>
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
                                value={formData.plan_delivery_date}
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
                                value={formData.actual_delivery_date}
                                onChange={handlePopInput}
                                required
                              />
                            </div>
                          </div>

                          <button
                            onClick={onSave}
                            data-modal-hide="popup-modal"
                            type="button"
                            className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                          >
                            Update
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
              </>
            </Header>
          </SidebarDriver>
        </div>
      </>
    </div>
  );
}

export default Driver;
