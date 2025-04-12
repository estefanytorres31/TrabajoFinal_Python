import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="flex">
      <Navbar />
      <div className="ml-64 flex flex-col min-h-screen w-full">
        {/* Header */}
        <header className="bg-gradient-to-r from-gray-700 to-gray-900 text-white px-6 py-6 shadow flex justify-center items-center">
          <h2 className="text-2xl font-bold tracking-wide uppercase">
            PERU CONTROLS SYSTEM
          </h2>
        </header>


        {/* Contenido principal */}
        <main className="flex-grow p-6 bg-gray-100">
          <Outlet />
        </main>

        {/* Footer (solo si quieres otro aquí, aunque ya hay uno en la barra) */}
        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white text-center py-6 shadow-inner">
          <p className="text-sm md:text-base tracking-wide font-light">
            © 2025 Peru Controls System — Todos los derechos reservados.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
