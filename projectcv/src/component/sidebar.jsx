import React, { useState } from "react";

export default function Sidebar({ active, setActive }) {
  const [isOpen, setIsOpen] = useState(false);
  const menus = ["Profile", "Projects", "Education", "Organization", "Skills"];

  return (
    <>
      {/* Hamburger button for mobile */}
      <button className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-md bg-teal-600 text-white shadow" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`
    fixed top-0 left-0 h-screen w-48 bg-teal-600 flex flex-col items-center justify-center pb-10
    transform transition-transform duration-300
    ${isOpen ? "translate-x-0" : "-translate-x-full"} 
    md:translate-x-0 md:flex
    z-50
  `}
      >
        {menus.map((item) => (
          <button
            key={item}
            onClick={() => {
              setActive(item);
              setIsOpen(false); // auto close sidebar on mobile
            }}
            className={`w-full my-2 text-white text-lg capitalize transition text-center ${active === item ? "opacity-100 font-semibold" : "opacity-60"}`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-30 z-40 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  );
}
