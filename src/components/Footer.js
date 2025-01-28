import React from "react";

const Footer = () => {
  return (
    <footer className="w-full  text-white py-8">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Links and Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-700 pb-6">
          <ul className="flex flex-col sm:flex-row sm:space-x-8 text-center sm:text-left">
            <li>
              <a
                href="#"
                className="hover:text-blue-400 transition duration-200"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-blue-400 transition duration-200"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-blue-400 transition duration-200"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-blue-400 transition duration-200"
              >
                Contact
              </a>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path d="M22 12l-10 6V6z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path d="M22 12l-10 6V6z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path d="M22 12l-10 6V6z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>&copy; 2025 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
