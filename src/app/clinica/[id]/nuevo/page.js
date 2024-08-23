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
import { GetPaciente, GetParentesco } from "@/services/paciente";
import PacienteForm from "@/components/pacienteForm";

export default function Pagina(props) {
  const { idExpediente } = props.params;
  const [parentescos, setParentescos] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [colonias, setColonias] = useState([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState("");
  const [selectedMunicipio, setSelectedMunicipio] = useState("");
  const [selectedColonia, setSelectedColonia] = useState("");
  const [selectedParentesco, setSelectedParentesco] = useState("");
  const [fecha, setFecha] = useState("");
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);
  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0]; // 'YYYY-MM-DD'
  const [isEditMode, setIsEditMode] = useState("NO");
  const [selectedTipoSangre, setSelectedTipoSangre] = useState("");

  // Fetch parentescos
  useEffect(() => {
    const fetchParentescos = async () => {
      try {
        const dataParentesco = await GetParentesco();
        setParentescos(dataParentesco);
      } catch (error) {
        console.error("Error fetching parentescos:", error);
      }
    };

    fetchParentescos();
  }, []);

  // Fetch departamentos
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
          // Reset selected values when department changes
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
          // Reset selected colonia if municipio changes
          setSelectedColonia("");
        } catch (error) {
          console.error("Error fetching colonias:", error);
        }
      }
    };

    fetchColonias();
  }, [selectedMunicipio]);

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

  // Handle select change
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setPaciente((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "idDepartamento") {
      setSelectedDepartamento(value);
    } else if (name === "idMunicipio") {
      setSelectedMunicipio(value);
    } else if (name === "idColonia") {
      setSelectedColonia(value);
    } else if (name === "idParentesco") {
      setSelectedParentesco(value);
    } else if (name === "tiposangre") {
      setSelectedTipoSangre(value);
    }
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
                  Nuevo Expediente
                </h1>
              </div>

              <PacienteForm
                paciente={paciente}
                fecha={fecha}
                setFecha={setFecha}
                departamentos={departamentos}
                municipios={municipios}
                colonias={colonias}
                parentescos={parentescos}
                selectedDepartamento={selectedDepartamento}
                selectedMunicipio={selectedMunicipio}
                selectedColonia={selectedColonia}
                selectedParentesco={selectedParentesco}
                setSelectedDepartamento={setSelectedDepartamento}
                setSelectedMunicipio={setSelectedMunicipio}
                setSelectedColonia={setSelectedColonia}
                handleInputChange={handleInputChange}
                handleRadioChange={handleRadioChange}
                handleSelectChange={handleSelectChange}
                isEditMode={isEditMode}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
