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
 <div className="flex flex-1">
        {/* Menú lateral izquierdo */}
        {isSideMenuOpen && (
          <aside className="bg-gray-100 w-64 p-4 space-y-4 fixed top-16 left-0 h-screen shadow-lg z-10 overflow-y-auto md:relative md:top-auto md:left-auto">
            <div className="space-y-2">
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
  <div>
   <div class="bg-white pl-3"><h1 class="pt-8">Editar Expediente</h1></div> 
    <div className="w-full h-full max-w-6xl bg-white rounded-md shadow-md flex space-x-2 p-4">
    {/* Div 1: Formulario morado */}
    <div className="w-1/2 p-4 bg-purple-100 rounded-md">
      <h2 className="text-xl font-bold mb-4">Datos del Paciente</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Número de Identidad"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
        />
        <input
          type="text"
          placeholder="Primer Nombre"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
        />
        <input
          type="text"
          placeholder="Segundo Nombre"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
        />
        <input
          type="text"
          placeholder="Primer Apellido"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
        />
        <input
          type="text"
          placeholder="Segundo Apellido"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
        />
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input type="radio" name="sexo" value="Mujer" />
            <span>Mujer</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="sexo" value="Hombre" />
            <span>Hombre</span>
          </label>
        </div>
        <div className="flex space-x-2">
          <select className="px-4 py-2 border rounded focus:outline-none focus:border-purple-600">
            <option>Año</option>
          </select>
          <select className="px-4 py-2 border rounded focus:outline-none focus:border-purple-600">
            <option>Mes</option>
          </select>
          <select className="px-4 py-2 border rounded focus:outline-none focus:border-purple-600">
            <option>Día</option>
          </select>
        </div>
        <select className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600">
          <option>O+</option>
        </select>
        <input
          type="text"
          placeholder="Teléfono"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
        />
        <select className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600">
          <option>Atlántida</option>
        </select>
        <select className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600">
          <option>La Ceiba</option>
        </select>
        <select className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600">
          <option>Colonia San José</option>
        </select>
        <input
          type="text"
          placeholder="Dirección Exacta"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
        />
        <h2 className="text-xl font-bold mb-2">Contacto de Emergencia</h2>
        <input
          type="text"
          placeholder="Primer Nombre Responsable"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
        />
        <input
          type="text"
          placeholder="Primer Apellido Responsable"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
        />
        <input
          type="text"
          placeholder="Teléfono del Responsable"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
        />
        <select className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600">
          <option>Madre/Padre</option>
        </select>
      </div>
    </div>

    {/* Div 2: Antecedentes y botones */}
    <div className="w-1/2 flex flex-col justify-between">
      {/* Div 2.1: Antecedentes */}
      <div className="flex-1 p-4 bg-gray-100 rounded-md mb-4">
        <h2 className="text-xl font-bold mb-2">Antecedentes</h2>
        <p className="text-sm text-gray-700 mb-2">
          Enfermedades Base/ Alergias/ Medicación Permanente
        </p>
        <textarea
          placeholder="Describir Enfermedades Base/ Alergias/ Medicación Permanente"
          className="w-full h-40 p-4 border rounded focus:outline-none focus:border-purple-600"
        ></textarea>
      </div>

      {/* Div 2.2: Botones */}
      <div className="flex justify-between space-x-4">
        <button className="bg-green-200 text-green-800 px-4 py-2 rounded hover:bg-green-300">
          Subir Expediente
        </button>
        <button className="bg-green-200 text-green-800 px-4 py-2 rounded hover:bg-green-300">
          Guardar
        </button>
        <button className="bg-green-200 text-green-800 px-4 py-2 rounded hover:bg-green-300">
          Nuevo
        </button>
        <button className="bg-green-200 text-green-800 px-4 py-2 rounded hover:bg-green-300">
          Cancelar
        </button>
      </div>
    </div>
  </div>
  </div>

</main>



      </div>
    </div>
  );
}






