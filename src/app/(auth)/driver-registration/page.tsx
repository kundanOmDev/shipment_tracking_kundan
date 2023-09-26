'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const DriverRegistration = () => {
    const router = useRouter();
    const [data, setData] = useState<any>([]);

    useEffect(() => {
      // Check if the code is running in the browser
      if (typeof window !== "undefined") {
        const sessionData = sessionStorage.getItem("userdetail");
        if (sessionData) {
          const parsedData = JSON.parse(sessionStorage.userdetail);
          // Parse the session data as JSON and set it in the state
          setData(parsedData.data);
        }
      }
    }, []);
    console.log(data);
    

  useEffect(()=>{
    if (data !== null){
      router.push('/dashboard');
    }
  },[]);

  const [formData, setFormData] = useState({
    driver_name: '',
    contact_number: '',
    vehicle_number: '',
    license_number : ''
  });
  // console.log(formData);
  
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/driver', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      
      console.log(JSON.stringify(formData));
      

      if (response.ok) {
        console.log('User registered successfully');
        // Clear the form or redirect to a success page
        // router.push('/login');
      } else {
        console.error('Failed to register user');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Driver Registration
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm grid gap-x-4 gap-y-2 grid-cols-1">
            {/* Driver Name */}
            <div>
              <label htmlFor="driver_name" className="sr-only">
                Driver Name
              </label>
              <input
                id="driver_name"
                name="driver_name"
                type="text"
                required
                value={formData.driver_name}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Driver Name"
              />
            </div>
            <div>
              <label htmlFor="contact_number" className="sr-only">
                Contact Number
              </label>
              <input
                id="contact_number"
                name="contact_number"
                type="text"
                required
                value={formData.contact_number}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Contact Number"
              />
            </div>
            <div>
              <label htmlFor="vehicle_number" className="sr-only">
              Vehicle Number
              </label>
              <input
                id="vehicle_number"
                name="vehicle_number"
                type="text"
                required
                value={formData.vehicle_number}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Vehicle Number"
              />
            </div>
            <div>
              <label htmlFor="license_number" className="sr-only">
                License Number
              </label>
              <input
                id="license_number"
                name="license_number"
                type="text"
                required
                value={formData.license_number}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="License Number"
              />
            </div>

            
            
            {/* Other form fields go here */}
          </div>

          <div>
            <button
              onClick={handleSubmit}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DriverRegistration;
