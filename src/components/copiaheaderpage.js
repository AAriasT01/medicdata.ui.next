/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client"; // Marcar este archivo como un Client Component

import { useState } from "react";
import Head from "next/head";

export default function headerpage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado del menú de usuario
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false); // Estado del menú lateral

  return (
    <div>
      <Head>
        <title>Medic-Clinica</title>
        <meta name="description" content="Sistema de gestión médica" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-purple-200 text-gray-700 p-4 flex items-center justify-between relative">
        {/* Icono para abrir/cerrar el menú lateral */}
        <button
          onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
          className="text-gray-700 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Título centrado */}
        <h1 className="text-lg font-bold mx-auto">Medic-Clinica</h1>

        {/* Foto del usuario y menú desplegable */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none"
          >
            <img
              src="/ruta-a-la-imagen-del-usuario.jpg" // Coloca la ruta de la imagen del usuario
              alt="Usuario"
              className="w-10 h-10 rounded-full object-cover"
            />
          </button>

          {/* Menú desplegable a la derecha */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-20">
              <div className="flex items-center p-4 border-b border-gray-200">
                <img
                  src="/ruta-a-la-imagen-del-usuario.jpg" // Coloca la ruta de la imagen del usuario
                  alt="Usuario"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-3">
                  <p className="font-bold text-gray-700">
                    Josue Ariel Mendoza Osorto
                  </p>
                  <p className="text-sm text-gray-500">CMH 12345</p>
                  <p className="text-sm text-gray-500">Cardiología</p>
                </div>
              </div>
              <div className="py-2 " href="http://localhost:3000">
                <a
                  href="http://localhost:3000"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  style="cursor: pointer;"
                >
                  MEDIC-CLINICA
                </a>

                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  CLINICA SAN MIGUEL
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  MEDIZEN
                </a>
              </div>
              <div className="py-2 border-t border-gray-200">
                <a
                  href="#"
                  className="block px-4 py-2 text-red-500 hover:bg-gray-200"
                >
                  Cerrar Sesión
                </a>
              </div>
            </div>
          )}
        </div>
      </header>
      <div className="flex flex-1">
        {/* Menú lateral izquierdo */}
        {isSideMenuOpen && (
          <aside className="bg-gray-100 w-64 p-4 space-y-4 fixed top-16 left-0 h-screen shadow-lg z-10 overflow-y-auto md:relative md:top-auto md:left-auto">
            <div className="space-y-2">
              <a
                href="/expedientes"
                className="flex items-center space-x-2 text-gray-700 hover:bg-gray-200 p-2 rounded"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"
                  />
                </svg>
                <span>Expedientes</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 text-gray-700 hover:bg-gray-200 p-2 rounded"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
                <span>Consultas</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 text-gray-700 hover:bg-gray-200 p-2 rounded"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"
                  />
                </svg>
                <span>Camas</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 text-gray-700 hover:bg-gray-200 p-2 rounded"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"
                  />
                </svg>
                <span>Internos</span>
              </a>
            </div>
          </aside>
        )}

        {/* Contenido principal */}

        <main className="flex-1 h-screen p-6 bg-gray-100 flex items-center justify-center">
          {/* Contenedor principal */}
        </main>
      </div>
    </div>
  );
}
