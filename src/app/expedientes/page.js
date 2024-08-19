/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-img-element */
"use client"; // Marcar este archivo como un Client Component
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { DocumentIcon } from "@heroicons/react/outline";
import Headerpages from "@/components/headerpagescopy";
import Sidemenu from "@/components/sidemenu";
import { GetExpedientes } from "@/services/expedientes";

export default function Pagina() {
  const [expedientes, setExpedientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpedientes = async () => {
      try {
        const data = await GetExpedientes();
        setExpedientes(data);
      } catch (error) {
        console.error("Error fetching expedientes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpedientes();
  }, []);

  return (
    <div>
      {/* Barra de menú superior (1) - Posición fija */}
      <div className="fixed top-0 left-0 w-full h-16 bg-gray-800 text-white z-10">
        <Headerpages />
      </div>

      {/* Contenedor principal (2) para el menú vertical (3) y el contenido de los videos (4) */}
      <div className="flex pt-16">
        {/* Menú vertical (3) - Oculto en pantallas pequeñas, visible en medianas y grandes */}
        <Sidemenu />

        {/* Contenido */}
        <div className="flex-grow h-auto bg-slate-50 p-4 md:ml-64">
          <main className="flex-1 h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
            {/* Contenedor principal */}
            <div className="w-full h-full p-4 bg-white rounded-md shadow-md flex flex-col justify-between">
              <div>Expedientes</div>
              {/* Div superior con botón y barra de búsqueda */}
              <div className="w-full flex justify-between items-center mb-4">
                <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                  Nuevo Expediente
                </button>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="pl-10 pr-4 py-2 border rounded w-80 focus:outline-none focus:border-purple-600"
                  />
                  <svg
                    className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                    />
                  </svg>
                </div>
              </div>

              {/* Div con botones de acción */}
              <div className="w-full flex justify-start space-x-4 mb-4">
                <Link
                  href="/eliminar"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Eliminar
                </Link>
                <Link
                  href="/editarPaciente"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Editar
                </Link>
                <Link
                  href="/expediente"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Expediente
                </Link>
                <Link
                  href="/evaluar"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Evaluar
                </Link>
              </div>

              {/* Div con la tabla */}
              <div className="w-full flex-1 bg-white p-4 border rounded-md overflow-x-auto">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <p>Cargando...</p>
                  </div>
                ) : expedientes.length > 0 ? (
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b">Nombres</th>
                        <th className="py-2 px-4 border-b">Apellidos</th>
                        <th className="py-2 px-4 border-b">Número de Citas</th>
                        <th className="py-2 px-4 border-b">
                          Fecha Última Consulta
                        </th>
                        <th className="py-2 px-4 border-b">
                          Último Diagnóstico / Enfermedad
                        </th>
                        <th className="py-2 px-4 border-b">Edad</th>
                        <th className="py-2 px-4 border-b">Teléfono</th>
                        <th className="py-2 px-4 border-b">Peso lb</th>
                        <th className="py-2 px-4 border-b">Sangre</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expedientes.map((expediente, index) => (
                        <tr key={index}>
                          <td className="py-2 px-4 border-b">
                            {expediente.Nombres || "N/A"}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {expediente.Apellidos || "N/A"}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {expediente.ConsultasTotales || "N/A"}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {expediente.UltimaCita || "N/A"}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {expediente.Diagnostico || "N/A"}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {expediente.Edad || "N/A"}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {expediente.Telefono || "N/A"}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {expediente.Peso || "N/A"}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {expediente.TipoSangre || "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p>No hay expedientes disponibles.</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
