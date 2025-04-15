import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiBriefcase, FiAnchor, FiLogOut } from 'react-icons/fi';
import { FaUser } from "react-icons/fa";
import { AiFillSnippets } from "react-icons/ai";
import logo from '../assets/logo.png'; // Adjust the path as necessary


function Navbar() {
  const location = useLocation();

  const navItems = [
    { to: '/', label: 'Sistemas', icon: <FiBriefcase /> },
    // { to: '/embarcacion', label: 'Embarcación', icon: <FiAnchor /> },
    // { to: '/usuarios', label: 'Usuarios', icon: <FaUser /> },
    // { to: '/sistemas', label: 'Sistemas', icon: <FiAnchor /> },
    { to: '/partes', label: 'Partes', icon: <FiAnchor /> },
    { to: '/sistema-partes', label: 'Sistema Partes', icon: <AiFillSnippets />},
  ];

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-[#1f2b33] via-[#2d3b44] to-[#3f4f5a] text-white flex flex-col justify-between fixed top-0 left-0 shadow-lg">

      {/* Logo y título */}
      <div className="p-6 flex flex-col items-center">
        <img
          src={logo}
          alt="Logo Peru Controls"
          className="w-[210px] h-[100px] object-contain mb-4"
        />


        {/* Enlaces de navegación */}
        <nav className="mt-10 w-full flex flex-col gap-2">
          {navItems.map(({ to, label, icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-4 py-4 mx-4 rounded-md text-sm font-medium 
                  tracking-wide transition-all duration-200
                  ${isActive
                    ? 'bg-sky-300 text-gray-900'  // Celeste claro
                    : 'hover:bg-gray-800 hover:text-sky-200'
                  }
                  `}
              >
                <span className="text-lg">{icon}</span>
                {label.toUpperCase()}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Botón de salida */}
      <div className="p-6">
        <Link
          to="/logout"
          className="flex items-center gap-3 px-4 py-2 text-sm font-medium tracking-wide hover:text-red-400 transition-colors"
        >
          <FiLogOut className="text-lg" />
          SALIR
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
