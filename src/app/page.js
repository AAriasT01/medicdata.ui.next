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

export default function Home() {
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
            <div className="w-full flex-1 bg-white p-4 border rounded-md overflow-x-auto">
              <div className="flex items-center justify-center h-full">
                <p className="text-lg font-bold">
                  BIENVENIDO(A), por favor selecciona una clínica
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
