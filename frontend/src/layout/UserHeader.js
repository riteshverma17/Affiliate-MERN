import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

function UserHeader() {
    const userDetails = useSelector((state) => state.userDetails);
    const userName = userDetails?.name || "Guest";
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 border-b border-gray-700 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center no-underline">
                {/* Left: Dashboard */}
                <Link to="/" className="text-3xl font-bold no-underline text-gray-50 hover:text-cyan-400 transition">
                    Dashboard
                </Link>

                {/* Right: Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setOpen(!open)}
                        className="bg-white/50 px-4 py-2 rounded-full text-base font-medium flex items-center gap-2 hover:bg-white transition"
                    >
                    {userName}
                        <svg
                            className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {open && (
                        <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg z-50">
                            <Link
                                to="/logout"
                                className="block px-4 py-2 text-center font-medium rounded hover:bg-cyan-700 hover:text-white transition no-underline"
                            >
                                Logout
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default UserHeader;
