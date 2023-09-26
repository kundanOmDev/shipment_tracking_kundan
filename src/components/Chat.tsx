import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

function Chat() {
  const [data, setData] = useState<any>([]);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Explicitly specify the type

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

    // Add a click event listener to the document to close the dropdown
    document.addEventListener("click", handleDocumentClick);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDocumentClick = (e: MouseEvent) => {
    // Close the dropdown if the click is outside of the button and the dropdown
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node) && // Type assertion
      e.target &&
      e.target instanceof HTMLElement &&
      e.target.id !== "options-menu"
    ) {
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    toast.success("logged out");
    router.push("/login");
  };

  return (
    <div className="z-50 inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        type="button"
        className="inline-flex justify-center w-full rounded-full border border-gray-300 shadow-sm px-4 py-2 bg-sky text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        id="options-menu"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <p className="font-semibold uppercase">{data.username}</p>
      </button>

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
      >
        <div
          className="py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <Link
            href={"#"}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            My Profile
          </Link>
          <Link
            href={"/login"}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
            onClick={handleLogout}
          >
            Logout & Switch User
          </Link>
          <Link
            href={"/"}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
            onClick={handleLogout}
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Chat;
