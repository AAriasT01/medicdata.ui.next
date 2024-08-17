/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-img-element */
"use client"; // Marcar este archivo como un Client Component
import { GetDoctor } from "@/services/doctor";
import { useEffect, useState } from "react";

export default function Headerpages({
  nombreclinica,
  rutaimagen,
  nombredoctor,
  numcolegio,
  especialidad,
  clinicas,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado del menú del usuario
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false); // Estado del menú hamburguesa

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-16 bg-gray-800 text-white z-10">
        <header className="bg-gray-700 text-white p-4 flex items-center justify-between relative">
          {/* Botón de menú hamburguesa para pantallas pequeñas */}
          <button
            onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
            className="block md:hidden text-white focus:outline-none"
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
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
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
                <div className="py-2">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
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
      </div>

      {/* <!-- Menú hamburguesa para pantallas pequeñas --> */}
      {isSideMenuOpen && (
        <div className="fixed top-16 left-0 w-full bg-gray-700 text-white md:hidden z-20">
          <ul className="space-y-2 p-4">
            <li>
              <a
                href="http://localhost:3000/expedientes"
                className="flex items-center p-4 hover:bg-gray-600 cursor-pointer"
              >
                <DocumentIcon className="h-6 w-6 mr-3" />
                <span>Expediente</span>
              </a>
            </li>
            <li>
              <a
                href="url_a_consulta"
                className="flex items-center p-4 hover:bg-gray-600 cursor-pointer"
              >
                <DocumentIcon className="h-6 w-6 mr-3" />
                <span>Consulta</span>
              </a>
            </li>
            <li>
              <a
                href="url_a_cama"
                className="flex items-center p-4 hover:bg-gray-600 cursor-pointer"
              >
                <DocumentIcon className="h-6 w-6 mr-3" />
                <span>Cama</span>
              </a>
            </li>
            <li>
              <a
                href="url_a_internos"
                className="flex items-center p-4 hover:bg-gray-600 cursor-pointer"
              >
                <DocumentIcon className="h-6 w-6 mr-3" />
                <span>Internos</span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
