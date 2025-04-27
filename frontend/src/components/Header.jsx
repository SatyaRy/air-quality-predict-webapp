import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Helper function
  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-lg z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-600">AirQuality</div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`text-gray-700 font-medium px-3 py-2 rounded-lg transition-colors duration-300 ${
                isActive("/")
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`text-gray-700 font-medium px-3 py-2 rounded-lg transition-colors duration-300 ${
                isActive("/dashboard")
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/performance"
              className={`text-gray-700 font-medium px-3 py-2 rounded-lg transition-colors duration-300 ${
                isActive("/performance")
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              Performance
            </Link>
            <Link
              to="/about"
              className={`text-gray-700 font-medium px-3 py-2 rounded-lg transition-colors duration-300 ${
                isActive("/about")
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              About
            </Link>
          </nav>

          {/* Hamburger Button for Mobile */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-blue-600 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="h-8 w-8 fill-current" viewBox="0 0 24 24">
              {open ? (
                <path
                  fillRule="evenodd"
                  d="M18.364 5.636a9 9 0 11-12.728 0 9 9 0 0112.728 0zM12 10a2 2 0 100 4 2 2 0 000-4z"
                  clipRule="evenodd"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"
                  clipRule="evenodd"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav
          className={`md:hidden bg-white shadow-lg absolute top-16 left-0 w-full transition-all duration-300 ease-in-out ${
            open ? "opacity-100 max-h-96" : "opacity-0 max-h-0"
          } overflow-hidden`}
        >
          <ul className="flex flex-col space-y-4 p-6">
            <li>
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className={`block px-4 py-2 rounded-lg text-lg font-medium ${
                  isActive("/")
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className={`block px-4 py-2 rounded-lg text-lg font-medium ${
                  isActive("/dashboard")
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/performance"
                onClick={() => setOpen(false)}
                className={`block px-4 py-2 rounded-lg text-lg font-medium ${
                  isActive("/performance")
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                Performance
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => setOpen(false)}
                className={`block px-4 py-2 rounded-lg text-lg font-medium ${
                  isActive("/about")
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
