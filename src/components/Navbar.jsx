import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import img from "../assets/graduated.png";
import { IoIosArrowDown } from "react-icons/io";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const menu = menuRef.current;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      menu.style.display = "flex"; 
      gsap.to(menu, { x: 0, duration: 0.5, ease: "power2.inOut" });
    } else {
      gsap.to(menu, {
        x: "100%",
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          menu.style.display = "none"; 
          setDropdownOpen(false); 
          document.body.style.overflow = "auto";
        },
      });
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setDropdownOpen(false); 
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="md:px-4 px-2 flex justify-between items-center">
        <Link to="/" className="w-10 h-10">
          <img src={img} alt="" className="w-full h-full object-cover" />
        </Link>
        <button
          className="text-white focus:outline-none md:hidden text-xl"
          onClick={toggleMenu}
        >
          ☰
        </button>
        <div className="hidden md:flex lg:items-center">
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center px-4 py-2 text-white gap-[8px] cursor-pointer"
              onClick={toggleDropdown}
            >
              <button className="">Services</button>
              <IoIosArrowDown
                className={`transition-transform duration-300 mt-1 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>
            {/* Dropdown menu */}
            <div
              className={`absolute left-0 top-14 bg-gray-900 dark:bg-gray-600 transition-opacity duration-300 ${
                dropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              <Link to="/service1" className="block px-4 py-1 text-white">
                Service 1
              </Link>
              <Link to="/service2" className="block px-4 py-1 text-white">
                Service 2
              </Link>
            </div>
          </div>
          <Link to="/products" className="text-white block px-4 py-2">
            Products
          </Link>
          <Link to="/about" className="text-white block px-4 py-2">
            About
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="mobile-menu fixed top-0 right-0 w-full h-full bg-gray-800 z-50 transform translate-x-full md:hidden flex flex-col items-start px-6 py-4"
      >
        <button className="text-white text-2xl self-end" onClick={toggleMenu}>
          ×
        </button>
        <div className="ml-2 mt-4 flex flex-col gap-[8px]">
          <Link to="/" className="text-white block mt-4 text-2xl" onClick={closeMenu}>
            Home
          </Link>
          <div className="mt-4">
            <div className="flex items-center text-white gap-[8px] cursor-pointer">
              <button className="text-white block text-2xl" onClick={toggleDropdown}>
                Services
              </button>
              <IoIosArrowDown
                className={`transition-transform duration-300 mt-1 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>
            <div className={`pl-4 mt-2 flex flex-col gap-[6px] ${dropdownOpen ? "block" : "hidden"}`}>
              <Link to="/service1" className="block text-white text-xl" onClick={closeMenu}>
                Service 1
              </Link>
              <Link to="/service2" className="block text-white text-xl" onClick={closeMenu}>
                Service 2
              </Link>
            </div>
          </div>
          <Link to="/products" className="text-white block mt-4 text-2xl" onClick={closeMenu}>
            Products
          </Link>
          <Link to="/about" className="text-white block mt-4 text-2xl" onClick={closeMenu}>
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
