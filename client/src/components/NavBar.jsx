import { PiPhoneCallFill } from "react-icons/pi";
import { IoIosMail } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { CONTACT } from "../data/contact";

import { useState } from "react";
const navItems = [
  {
    title: "About Us",
    submenu: [
      { title: "QNH History", href: "/qnh-history" },
      { title: "Mission and Vision", href: "/mission-vision" },
      { title: "Patients Rights", href: "/patients-rights" },
      { title: "Hospital Accreditations", href: "/hospital-accreditations" },
      { title: "Staff Portal", href: "https://www.qnhospital.com/portal/" },
    ],
  },
  {
    title: "Medical Departments",
    href: "#",
    submenu: [
      { title: "Clinics", href: "#" },
      { title: "Centers", href: "#" },
      { title: "Units", href: "#" },
      { title: "Hospital Accreditations", href: "#" },
      { title: "Medical Services", href: "#" },
    ],
  },
  {
    title: "E-Services",
    href: "#",
  },
  {
    title: "Our Doctors",
    href: "#",
    submenu: [
      { title: "Our Doctors", href: "#" },
      { title: "Articles", href: "#" },
    ],
  },
  {
    title: "Media",
    href: "#",
    submenu: [
      { title: "Photo Gallery", href: "#" },
      { title: "Video Gallery", href: "#" },
      { title: "Units", href: "#" },
      { title: "QNH Magazine", href: "#" },
      { title: "Latest Achievement", href: "#" },
    ],
  },
  { title: "Join Us", href: "#" },
  { title: "Offers", href: "#" },
  { title: "Contact Us", href: "#" },
  { title: "Staff Portal", href: "https://www.qnhospital.com/portal/" },
];

export default function NavBar() {
  const [burgerOpen, setBurgerOpen] = useState(false);

  return (
    <div className="md:fixed w-full z-50 ">
      {/* top bar */}
      <div className="hidden md:flex justify-between items-center px-40 h-10 bg-white border-t border-b border-gray-300">
        {/* Left side: contact info */}
        <div className="flex items-center">
          <div className="flex items-center gap-x-1 border-r border-gray-300 pr-3">
            <PiPhoneCallFill className="text-[var(--main-color)] text-xl" />
            <span>CALL:</span>
            <a href={`tel:${CONTACT.phone}`} className="hover:underline">
              {CONTACT.phone}
            </a>
          </div>

          <div className="flex items-center gap-x-1 ml-3">
            <IoIosMail className="text-[var(--main-color)] text-2xl" />
            <span>EMAIL:</span>
            <a href="mailto:info@qnhospital.com" className="hover:underline">
              info@qnhospital.com
            </a>
          </div>
        </div>

        {/* Right side: search */}
        <div className="flex h-full">
          <div className="relative h-full">
            <input
              type="text"
              placeholder="SEARCH"
              className=" px-4 h-full outline-none border border-transparent focus:border-[var(--main-color)] focus:ring-0 transition"
            />

            <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--main-color)] text-lg" />
          </div>
          <div className="flex items-center h-full">
            <div className="border-l border-gray-300 h-full" />
            <span className="px-6">عربي</span>
            <div className="border-l border-gray-300 h-full" />
          </div>
          <div className="flex items-center px-4">
            <span className="mr-4 font-semibold">FOLLOW US ON</span>
            <div className="flex items-center gap-2">
              {/* Facebook */}
              <motion.a
                target="_blank"
                href="https://www.facebook.com/qnhospital/"
                className="w-6 h-6 rounded-full flex items-center justify-center bg-[#1877F2] text-white"
                whileHover={{ y: -4 }} // move up 4px
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaFacebookF size={14} />
              </motion.a>

              {/* Twitter */}
              <motion.a
                target="_blank"
                href="https://x.com/qnhospital"
                className="w-6 h-6 rounded-full flex items-center justify-center bg-[#1DA1F2] text-white"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaTwitter size={14} />
              </motion.a>

              {/* Instagram */}
              <motion.a
                target="_blank"
                href="https://www.instagram.com/qnhospital/"
                className="w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaInstagram size={14} />
              </motion.a>

              {/* YouTube */}
              <motion.a
                target="_blank"
                href="https://www.youtube.com/channel/UC219qqSlBkijpimMR9KYJhQ"
                className="w-6 h-6 rounded-full flex items-center justify-center bg-[#FF0000] text-white"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaYoutube size={14} />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Navbar */}
      <div className="flex flex-col md:flex-row justify-start items-center h-[90px] bg-white px-6 md:px-40  gap-0 shadow-sm">
        {/* Logo */}
        <div className="flex justify-center  shrink-0 items-center mr-12">
          <Link to="/">
            <img
              src="/images/newLogo.jpg"
              alt="Qassim Hospital Logo"
              className="h-16 w-auto md:h-16 object-contain min-h-[50px] cursor-pointer"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="h-full w-full flex items-center">
          <ul className="hidden md:flex items-center h-full gap-6 text-gray-700 font-medium">
            {navItems.map((item, idx) => (
              <DropdownItem key={idx} item={item} />
            ))}
          </ul>
          <div className="block md:hidden py-2 px-2 w-full bg-[#105f6c] mb-4">
            <button
              className="text-3xl font-bold text-white"
              onClick={() => setBurgerOpen(!burgerOpen)}
            >
              <FiMenu className="text-white text-3xl" />
            </button>
          </div>
        </nav>
      </div>
      {/* Mobile side menu */}
      <AnimatePresence>
        {burgerOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-full overflow-y-auto bg-white z-50 flex flex-col"
          >
            <div className="flex justify-end  ">
              <button
                className="text-3xl font-bold text-white bg-[#288b9a] w-12 h-12 flex justify-center items-center "
                onClick={() => setBurgerOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="flex justify-between items-center mt-2  h-10 bg-white border-t border-b border-gray-300">
              {/* Left side: contact info */}
              <div className="flex items-center">
                <div className="flex items-center gap-x-1 border-r border-gray-300 pr-3">
                  <a href={`tel:${CONTACT.phone}`} className="hover:underline">
                    <PiPhoneCallFill className="text-[var(--main-color)] text-xl" />
                  </a>
                </div>

                <div className="flex items-center gap-x-1 ml-3">
                  <a
                    href="mailto:info@qnhospital.com"
                    className="hover:underline"
                  >
                    <IoIosMail className="text-[var(--main-color)] text-2xl" />
                  </a>
                </div>
              </div>

              {/* Right side: search */}
              <div className="flex h-full">
                <div className="relative h-full">
                  <input
                    type="text"
                    placeholder="SEARCH"
                    className=" px-4 h-full outline-none border border-transparent focus:border-[var(--main-color)] focus:ring-0 transition"
                  />

                  <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--main-color)] text-lg" />
                </div>
                <div className="flex items-center h-full">
                  <div className="border-l border-gray-300 h-full" />
                  <span className="px-6">عربي</span>
                </div>
              </div>
            </div>
            <ul className="flex flex-col py-4 pl-0  text-gray-700 font-medium">
              {navItems.map((item, idx) => (
                <MobileDropdown key={idx} item={item} />
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DropdownItem({ item }) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <li
      className="relative flex flex-col items-start"
      onMouseEnter={() => {
        setOpen(true);
        setHover(true);
      }}
      onMouseLeave={() => {
        setOpen(false);
        setHover(false);
      }}
    >
      <Link
        to={item.href || "#"} // ✅ use 'to' for internal routing
        target={item.href?.startsWith("http") ? "_blank" : undefined} // optional: open external links in new tab
        rel={item.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="hover:text-[var(--main-color)] block pb-4  mt-4 transition-colors duration-200 relative"
      >
        {item.title}

        {/* Progress Bar */}
        {item.submenu && (
          <motion.div
            layout
            initial={{ width: 0 }}
            animate={{ width: hover ? "100%" : "0%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute rounded-4xl top-0 left-0 h-[3px] bg-[var(--main-color)]"
          />
        )}
      </Link>

      {/* Dropdown */}
      <AnimatePresence>
        {item.submenu && open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute left-0 top-full w-[265px] flex flex-col bg-[var(--main-color)] shadow-lg min-w-[180px] overflow-hidden rounded-lg z-20"
          >
            {item.submenu.map((sub, subIdx) => (
              <li
                key={subIdx}
                className={`w-full px-5 transition-colors duration-300 ${
                  subIdx !== item.submenu.length - 1
                    ? "border-b border-white/30"
                    : ""
                } hover:bg-[#00c0cd]`}
              >
                {sub.href?.startsWith("http") ? (
                  <a
                    href={sub.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-2 text-white text-sm transition-transform duration-300 transform hover:translate-x-2"
                  >
                    {sub.title}
                  </a>
                ) : (
                  <Link
                    to={sub.href}
                    className="block py-2 text-white text-sm transition-transform duration-300 transform hover:translate-x-2"
                  >
                    {sub.title}
                  </Link>
                )}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}

// Mobile Dropdown
function MobileDropdown({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <li className="flex flex-col">
      <button
        className="flex justify-between items-center w-full py-4 px-2  bg-[#288b9a] text-white border border-b-[#4da4ab] font-medium"
        onClick={() => setOpen(!open)}
      >
        {item.title}
        {item.submenu && (
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="ml-2 text-white text-xl"
          >
            <IoIosArrowDown />
          </motion.span>
        )}
      </button>
      <AnimatePresence>
        {item.submenu && open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex flex-col  overflow-hidden"
          >
            {item.submenu.map((sub, idx) => (
              <li key={idx} className="border-b ...">
                {sub.href?.startsWith("http") ? (
                  <a
                    href={sub.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-2 px-4 text-gray-700 ..."
                  >
                    {sub.title}
                  </a>
                ) : (
                  <Link
                    to={sub.href}
                    className="block py-2 px-4 text-gray-700 ..."
                  >
                    {sub.title}
                  </Link>
                )}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}
