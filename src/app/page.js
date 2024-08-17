/* eslint-disable @next/next/no-img-element */
"use client"; // Marcar este archivo como un Client Component
import { useState } from "react";
import Head from "next/head";
import HeaderPage from "../components/headerpage.js"; // Importa el componente

export default function Home() {
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Aquí se inserta el componente HeaderPage */}
      <HeaderPage />

  

      <footer className="bg-gray-800 text-white p-4 text-center">
        <a
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
           <span className="font-bold">Sistemas Expertos 2024</span>
        </a>
      </footer>
    </div>
  );
}
