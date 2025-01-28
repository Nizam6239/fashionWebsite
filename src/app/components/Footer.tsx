"use client"
import React from "react";
import Link from "next/link";
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8">
        
        {/* About Us */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">About Merlin Fashion</h2>
          <p className="mb-4">
            Merlin Fashion is your go-to destination for the latest trends and timeless styles. From everyday wear to luxury fashion, we bring you high-quality designs crafted for every occasion.
          </p>
        </div>

        {/* Customer Service */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Customer Service</h2>
          <ul>
            <li>
              <a href="#" className="hover:text-white transition-colors duration-300">FAQs</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors duration-300">Returns & Exchanges</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors duration-300">Shipping & Delivery</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors duration-300">Size Guide</a>
            </li>
          </ul>
        </div>

        {/* Shop */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Shop</h2>
          <ul>
            <li>
              <a href="#" className="hover:text-white transition-colors duration-300">New Arrivals</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors duration-300">Best Sellers</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors duration-300">Sale</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors duration-300">Gift Cards</a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Contact Us</h2>
          <p>123 Fashion Ave, New York, NY</p>
          <p>Email: support@merlinfashion.com</p>
          <p>Phone: (555) 123-4567</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-white transition-colors duration-300">Facebook</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Twitter</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Instagram</a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <p className="text-center text-xs pt-8">
        Design and Developed by <Link href='https://www.linkedin.com/in/nizam-906242226/' className="font-bold text-sm">NIZAM</Link>
      </p>
    </footer>
  );
}

export default Footer;
