"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import Headerpages from "@/components/headerpagescopy";
import Sidemenu from "@/components/sidemenu";
import {
  GetDepartamentos,
  GetMunicipios,
  GetColonias,
} from "@/services/direccion";
import { GetPaciente } from "@/services/paciente";

export default function Pagina() {
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [colonias, setColonias] = useState([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState("");
  const [selectedMunicipio, setSelectedMunicipio] = useState("");
  const [selectedColonia, setSelectedColonia] = useState("");
  const [fecha, setFecha] = useState("");
  const [paciente, setPaciente] = useState(null);

  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0]; // 'YYYY-MM-DD'

  // Fetch departamentos on component mount
  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const data = await GetDepartamentos();
        setDepartamentos(data);
      } catch (error) {
        console.error("Error fetching departamentos:", error);
      }
    };

    fetchDepartamentos();
  }, []);

  // Fetch municipios when selectedDepartamento changes
  useEffect(() => {
    const fetchMunicipios = async () => {
      if (selectedDepartamento) {
        try {
          const data = await GetMunicipios(selectedDepartamento);
          setMunicipios(data);
          // Reset municipio and colonia if departamento changes
          setSelectedMunicipio("");
          setSelectedColonia("");
        } catch (error) {
          console.error("Error fetching municipios:", error);
        }
      }
    };

    fetchMunicipios();
  }, [selectedDepartamento]);

  // Fetch colonias when selectedMunicipio changes
  useEffect(() => {
    const fetchColonias = async () => {
      if (selectedMunicipio) {
        try {
          const data = await GetColonias(selectedMunicipio);
          setColonias(data);
        } catch (error) {
          console.error("Error fetching colonias:", error);
        }
      }
    };

    fetchColonias();
  }, [selectedMunicipio]);

  // Fetch paciente data when component mounts or idPaciente changes
  useEffect(() => {
    const fetchPaciente = async () => {
      const idPaciente = 1; // Replace with the actual ID when available
      try {
        const data = await GetPaciente(idPaciente);
        if (data.length > 0) {
          const pacienteData = data[0];
          setPaciente(pacienteData);
          setSelectedDepartamento(pacienteData.idDepartamento);
          setSelectedMunicipio(pacienteData.idMunicipio);
          setSelectedColonia(pacienteData.idColonia);
          setFecha(pacienteData.fecha || ""); // Adjust if necessary
        }
      } catch (error) {
        console.error("Error fetching paciente:", error);
      }
    };

    fetchPaciente();
  }, []);

  // Update municipio and colonia selections when paciente data is updated
  useEffect(() => {
    if (paciente) {
      setSelectedDepartamento(paciente.idDepartamento);
    }
  }, [paciente]);

  useEffect(() => {
    if (paciente && selectedDepartamento) {
      setSelectedMunicipio(paciente.idMunicipio);
    }
  }, [paciente, selectedDepartamento]);

  useEffect(() => {
    if (paciente && selectedMunicipio) {
      setSelectedColonia(paciente.idColonia);
    }
  }, [paciente, selectedMunicipio]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaciente((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle radio button change
  const handleRadioChange = (e) => {
    const { value } = e.target;
    setPaciente((prevState) => ({
      ...prevState,
      sexo: value,
    }));
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-16 bg-gray-800 text-white z-10">
        <Headerpages />
      </div>
      <div className="flex pt-16">
        <Sidemenu />
        <div className="flex-grow h-auto bg-slate-50 p-4 md:ml-64">
          <main className="flex-grow h-full p-3 bg-slate-50 flex items-center justify-center">
            <div className="w-full bg-slate-50 p-1">
              <div className="bg-slate-50 pl-3 flex justify-center items-center">
                <h1 className="pt-8 text-xl font-bold mb-4">
                  Editar Expediente
                </h1>
              </div>
              <div className="h-full bg-slate-50 rounded-md shadow-md flex space-x-2 p-4">
                <div className="w-1/2 p-4 bg-purple-100 rounded-md">
                  <h2 className="text-xl font-bold mb-4">Datos del Paciente</h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="dni"
                      placeholder="Número de Identidad"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
                      value={paciente?.dni || ""}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="p_nombre"
                      placeholder="Primer Nombre"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
                      value={paciente?.p_nombre || ""}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="s_nombre"
                      placeholder="Segundo Nombre"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
                      value={paciente?.s_nombre || ""}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="p_apellido"
                      placeholder="Primer Apellido"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
                      value={paciente?.p_apellido || ""}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="s_apellido"
                      placeholder="Segundo Apellido"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
                      value={paciente?.s_apellido || ""}
                      onChange={handleInputChange}
                    />
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="sexo"
                          value="F"
                          checked={paciente?.sexo === "F"}
                          onChange={handleRadioChange}
                        />
                        <span>Mujer</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="sexo"
                          value="M"
                          checked={paciente?.sexo === "M"}
                          onChange={handleRadioChange}
                        />
                        <span>Hombre</span>
                      </label>
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
                        max={formattedToday}
                      />
                    </div>
                    <select
                      value={selectedDepartamento}
                      onChange={(e) => setSelectedDepartamento(e.target.value)}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
                    >
                      <option value="">Seleccione un Departamento</option>
                      {departamentos.map((dep) => (
                        <option
                          key={dep.idDepartamento}
                          value={dep.idDepartamento}
                        >
                          {dep.nombre}
                        </option>
                      ))}
                    </select>
                    <select
                      value={selectedMunicipio}
                      onChange={(e) => setSelectedMunicipio(e.target.value)}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
                    >
                      <option value="">Seleccione un Municipio</option>
                      {municipios.map((mun) => (
                        <option key={mun.idMunicipio} value={mun.idMunicipio}>
                          {mun.nombre}
                        </option>
                      ))}
                    </select>
                    <select
                      value={selectedColonia}
                      onChange={(e) => setSelectedColonia(e.target.value)}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
                    >
                      <option value="">Seleccione una Colonia</option>
                      {colonias.map((col) => (
                        <option key={col.idColonia} value={col.idColonia}>
                          {col.nombre}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      name="direccionExacta"
                      placeholder="Dirección Exacta"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
                      value={paciente?.direccionExacta || ""}
                      onChange={handleInputChange}
                    />
                    <h2 className="text-xl font-bold mb-2">
                      Contacto de Emergencia
                    </h2>
                    <input
                      type="text"
                      name="contacto_nombre"
                      placeholder="Primer Nombre Responsable"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
                      value={paciente?.contacto_nombre || ""}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="contacto_apellido"
                      placeholder="Primer Apellido Responsable"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
                      value={paciente?.contacto_apellido || ""}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="contacto_telefono"
                      placeholder="Teléfono del Responsable"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
                      value={paciente?.contacto_telefono || ""}
                      onChange={handleInputChange}
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
                      name="antecedentes"
                      placeholder="Describir Enfermedades Base/ Alergias/ Medicación Permanente"
                      className="w-full h-40 p-4 border rounded focus:outline-none focus:border-purple-600"
                      value={paciente?.antecedentes || ""}
                      onChange={handleInputChange} // Agrega esta línea
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
    </div>
  );
}
