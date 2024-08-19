/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-img-element */
"use client"; // Marcar este archivo como un Client Component
import { GetDoctor } from "@/services/doctor";
import { GetClinicasDoctor } from "@/services/doctor";
import { useEffect, useState } from "react";
import { DocumentIcon } from "@heroicons/react/outline";

export default function Headerpages() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado del menú del usuario
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false); // Estado del menú hamburguesa

  const [dataDoctor, setData] = useState([]);
  const [dataClinicasDoctor, setData2] = useState([]);

  useEffect(() => {
    GetDoctor()
      .then((dataDoctor) => {
        console.log("Datos recibidos:", dataDoctor); // Agrega este console.log para ver los datos en la consola
        setData(dataDoctor);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

  useEffect(() => {
    GetClinicasDoctor()
      .then((dataClinicasDoctor) => {
        console.log("Datos recibidos2:", dataClinicasDoctor); // Agrega este console.log para ver los datos en la consola
        setData2(dataClinicasDoctor);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

  // Verifica que data tenga al menos un elemento
  const doctor = dataDoctor.length > 0 ? dataDoctor[0] : null;
  const clinicas = dataClinicasDoctor.length > 0 ? dataClinicasDoctor[0] : null;

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
          <h1 className="text-lg font-bold mx-auto">
            {/*doctor ? doctor.NombreCompleto : "Cargando..."*/}
            MEDIC-CLINICA
          </h1>

          {/* Foto del usuario y menú desplegable */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none"
            >
              <img
                src={
                  doctor?.foto ||
                  "https://www.portafolio.co/files/article_new_multimedia/uploads/2024/02/06/65c27d24da9df.jpeg"
                } // Coloca la ruta de la imagen del usuario o un valor predeterminado
                alt="Usuario"
                className="w-10 h-10 rounded-full object-cover"
              />
            </button>

            {/* Menú desplegable a la derecha */}
            {isMenuOpen && doctor && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-20">
                <div className="flex items-center p-4 border-b border-gray-200">
                  <img
                    src={
                      doctor?.foto ||
                      "https://www.portafolio.co/files/article_new_multimedia/uploads/2024/02/06/65c27d24da9df.jpeg"
                    } // Coloca la ruta de la imagen del usuario o un valor predeterminado
                    alt="Usuario"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <p className="font-bold text-gray-700">
                      {doctor.NombreCompleto || "Nombre no disponible"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {doctor.numColegioMedico ||
                        "Número de colegio no disponible"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {doctor.Especialidades || "Especialidad no disponible"}
                    </p>
                  </div>
                </div>
                <div className="py-2">
                  {dataClinicasDoctor.length > 0 ? (
                    dataClinicasDoctor.map((clinica, index) => (
                      <div
                        key={index} // Es importante tener una clave única para cada elemento en una lista
                        className="flex items-center p-2 border-b border-gray-200 hover:bg-gray-100"
                      >
                        <img
                          src={
                            clinica.logo ||
                            "https://estaticos-cdn.prensaiberica.es/clip/69f767a7-595a-4a78-a9f1-a9ca444e7e8f_16-9-discover-aspect-ratio_default_0.webp"
                          } // URL del logo o una imagen por defecto
                          alt={clinica.nombre || "Logo de clínica"}
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <a
                          href="#"
                          className="block text-gray-700 hover:text-gray-900"
                        >
                          {clinica.nombre || "Nombre de la clínica"}
                        </a>
                      </div>
                    ))
                  ) : (
                    <p>No hay clínicas disponibles.</p>
                  )}
                </div>
                <div className="py-2 border-t border-gray-200">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    Configuración
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

      {/* Menú hamburguesa para pantallas pequeñas */}
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
