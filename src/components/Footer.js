import React from 'react'

const Footer = () => {
  return (
    <div class="bg-stone-800 text-white py-6">
    <div class="max-w-screen-xl mx-auto px-4">
      <div class="flex flex-col sm:flex-row justify-between items-center">
        <div class="mb-4 sm:mb-0">
          <ul class="flex flex-col sm:flex-row sm:space-x-8 text-center sm:text-left">
            <li><a href="#" class="hover:text-blue-500">Privacy Policy</a></li>
            <li><a href="#" class="hover:text-blue-500">Terms of Service</a></li>
            <li><a href="#" class="hover:text-blue-500">About Us</a></li>
            <li><a href="#" class="hover:text-blue-500">Contact</a></li>
          </ul>
        </div>

        <div class="flex space-x-4">
          <a href="#" class="text-white hover:text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
              <path d="M22 12l-10 6V6z"/>
            </svg>
          </a>
          <a href="#" class="text-white hover:text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
              <path d="M22 12l-10 6V6z"/>
            </svg>
          </a>
          <a href="#" class="text-white hover:text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
              <path d="M22 12l-10 6V6z"/>
            </svg>
          </a>
        </div>
      </div>

      <div class="mt-4 text-center text-sm">
        <p>&copy; 2025 Your Company. All rights reserved.</p>
      </div>
    </div>
  </div>
  )
}

export default Footer
