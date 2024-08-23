/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-img-element */
"use client";
import { GetDoctor, GetClinicasDoctor } from "@/services/doctor";
import { useEffect, useState } from "react";
import { DocumentIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Headerpages() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const router = useRouter();
  const [dataDoctor, setData] = useState([]);
  const [dataClinicasDoctor, setData2] = useState([]);
  const [email, setEmail] = useState(null);
  const [medicoID, setMedicoId] = useState(null);
  const [nombreClinica, setNombreClinica] = useState(null);
  const [loading, setLoading] = useState(true);
  const [idClinica, setIdClinica] = useState(null); // Estado para guardar el idclinica

  const handleClick = (idClinica, nombreClinica) => {
    localStorage.setItem("clinicaId", idClinica);
    console.log("ID clinica seleccionada:", idClinica);
    localStorage.setItem("clinicaNombre", nombreClinica);
  };

  const handleTitleClick = () => {
    localStorage.removeItem("clinicaNombre");
    setNombreClinica(null); // Opcional: restablecer el estado del nombre de la clínica
    router.push("/"); // Redirige a la página principal
  };

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      console.log("Correo electrónico obtenido:", email);
      setEmail(email);
    }
  }, []);

  useEffect(() => {
    const nombreClinica = localStorage.getItem("clinicaNombre");
    if (nombreClinica) {
      console.log("Nombre clinica seleccionada", nombreClinica);
      setNombreClinica(nombreClinica);
    }
  }, []);

  // Obtener el idClinica de localStorage
  useEffect(() => {
    const clinicaId = localStorage.getItem("clinicaId");
    if (clinicaId) {
      console.log("ID clinica seleccionada:", clinicaId);
      setIdClinica(clinicaId);
    }
  }, []);

  useEffect(() => {
    if (email) {
      console.log("Correo enviado al endpoint:", email);
      GetDoctor(email)
        .then((dataDoctor) => {
          console.log("Datos recibidos:", dataDoctor);
          setData(dataDoctor);
        })
        .catch((error) => {
          console.error("Error al obtener datos:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [email]);

  useEffect(() => {
    // Obtener el primer doctor del array de datos
    const doctor = dataDoctor.length > 0 ? dataDoctor[0] : null;

    // Obtener el ID del médico o establecerlo como null si no hay doctor
    const idMedico = doctor ? doctor.idMedico : null;
    console.log("ID del Médico guardado:", idMedico);
    console.log(
      "Id medico en local storage: ",
      localStorage.getItem("idMedico")
    );

    // Verificar si idMedico no es null antes de almacenarlo
    if (idMedico !== null) {
      localStorage.setItem("idMedico", idMedico);
      setMedicoId(idMedico);
    }
  }, [dataDoctor]);

  useEffect(() => {
    if (medicoID) {
      GetClinicasDoctor(medicoID)
        .then((dataClinicasDoctor) => {
          console.log("Datos recibidos2:", dataClinicasDoctor);
          setData2(dataClinicasDoctor);
        })
        .catch((error) => {
          console.error("Error al obtener datos:", error);
        });
    }
  }, [medicoID]);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  // Definir la variable doctor aquí para asegurar que esté disponible en el JSX
  const doctor = dataDoctor.length > 0 ? dataDoctor[0] : null;

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
          <a
            href="/"
            onClick={handleTitleClick}
            className="text-lg font-bold mx-auto no-underline cursor-pointer"
          >
            <h1>{nombreClinica ? nombreClinica : "SISTEMA MEDICDATA"}</h1>
          </a>

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
                }
                alt="Usuario"
                className="w-10 h-10 rounded-full object-cover"
              />
            </button>

            {/* Menú desplegable a la derecha */}
            {!loading && isMenuOpen && doctor && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-20">
                <div className="flex items-center p-4 border-b border-gray-200">
                  <img
                    src={
                      doctor?.foto ||
                      "https://www.portafolio.co/files/article_new_multimedia/uploads/2024/02/06/65c27d24da9df.jpeg"
                    }
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
                  {loading ? (
                    <div className="flex items-center justify-center h-full">
                      <p>Cargando...</p>
                    </div>
                  ) : dataClinicasDoctor.length > 0 ? (
                    dataClinicasDoctor.map((clinica, index) => (
                      <Link
                        key={index}
                        href={`/clinica/${clinica.idClinica}`}
                        passHref
                      >
                        <div
                          className="flex items-center p-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                          onClick={() =>
                            handleClick(clinica.idClinica, clinica.nombre)
                          } // manejador de clic, manda ese id al local storage como la clinica seleccionada
                        >
                          <img
                            src={
                              clinica.logo ||
                              "https://estaticos-cdn.prensaiberica.es/clip/69f767a7-595a-4a78-a9f1-a9ca444e7e8f_16-9-discover-aspect-ratio_default_0.webp"
                            }
                            alt={clinica.nombre || "Logo de clínica"}
                            className="w-12 h-12 rounded-full object-cover mr-4"
                          />
                          <span className="block text-gray-700 hover:text-gray-900">
                            {clinica.nombre || "Nombre de la clínica"}
                          </span>
                        </div>
                      </Link>
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
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-red-500 hover:bg-gray-200 focus:outline-none"
                  >
                    Cerrar Sesión
                  </button>
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
                href={`/clinica/${idClinica}`}
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
