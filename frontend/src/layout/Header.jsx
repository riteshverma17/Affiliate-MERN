import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 border-b border-gray-700 shadow-sm">
      <div className="container mx-auto px-3 py-3 flex justify-between items-center">
        {/* Brand Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-cyan-300 hover:text-white transition no-underline"
        >
          Affiliate++
        </Link>

        {/* Navigation Links */}
        <ul className="flex my-auto space-x-6 text-xl font-medium">
          <li>
            <Link
              to="/"
              className="text-gray-100 hover:text-cyan-400 transition no-underline"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="text-gray-100 hover:text-cyan-400 transition no-underline"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="text-gray-100 hover:text-cyan-400 transition no-underline"
            >
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
