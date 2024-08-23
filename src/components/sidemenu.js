/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client"; // Marcar este archivo como un Client Component
import { useState, useEffect } from "react";
import Head from "next/head";
import { DocumentIcon } from "@heroicons/react/outline";

export default function Sidemenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado del menú del usuario
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false); // Estado del menú hamburguesa
  const [idClinica, setIdClinica] = useState(null); // Estado para guardar el idclinica

  // Obtener el idClinica de localStorage
  useEffect(() => {
    const clinicaId = localStorage.getItem("clinicaId");
    if (clinicaId) {
      console.log("ID clinica seleccionada:", clinicaId);
      setIdClinica(clinicaId);
    }
  }, []);

  return (
    <div className="hidden md:block fixed top-16 left-0 w-64 h-screen bg-gray-700 text-white">
      <ul>
        <li>
          <i className="fas fa-file-alt mr-3"></i>
        </li>
        <li>
          <a
            href={`/clinica/${idClinica}`} //
            className="flex items-center p-4 hover:bg-gray-600 cursor-pointer"
          >
            <DocumentIcon className="h-6 w-6 mr-3" />
            <i className="fas fa-file-alt mr-3"></i> Expediente
          </a>
        </li>
        <li>
          <a
            href="url_a_consulta"
            className="flex items-center p-4 hover:bg-gray-600 cursor-pointer"
          >
            <DocumentIcon className="h-6 w-6 mr-3" />
            <i className="fas fa-stethoscope mr-3"></i> Consulta
          </a>
        </li>
        <li>
          <a
            href="url_a_cama"
            className="flex items-center p-4 hover:bg-gray-600 cursor-pointer"
          >
            <DocumentIcon className="h-6 w-6 mr-3" />
            <i className="fas fa-bed mr-3"></i> Cama
          </a>
        </li>
        <li>
          <a
            href="url_a_internos"
            className="flex items-center p-4 hover:bg-gray-600 cursor-pointer"
          >
            <DocumentIcon className="h-6 w-6 mr-3" />
            <i className="fas fa-users mr-3"></i> Internos
          </a>
        </li>
      </ul>
    </div>
  );
}
