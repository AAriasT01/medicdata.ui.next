import React, { useState, useEffect } from "react";
import {
  GetDepartamentos,
  GetMunicipios,
  GetColonias,
} from "@/services/direccion";
import { GetPaciente, GetParentesco } from "@/services/paciente";
export default function PacienteForm({
  paciente,
  fecha,
  setFecha,
  selectedDepartamento,
  selectedMunicipio,
  selectedColonia,
  setSelectedColonia, // Agrega esta línea
  setSelectedMunicipio, // Agrega esta línea
  selectedParentesco,
  setSelectedDepartamento,
  selectedTipoSangre,
  handleInputChange,
  handleRadioChange,
  handleSelectChange,
  isEditMode,
}) {
  const [localPaciente, setLocalPaciente] = useState({});
  const [parentescos, setParentescos] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [tiposSangre, setTipoSangre] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [colonias, setColonias] = useState([]);
  const [select, setSelect] = useState([]);

  useEffect(() => {
    if (isEditMode && paciente) {
      setLocalPaciente(paciente);
      setSelectedDepartamento("");
      setSelectedMunicipio("");
      setSelectedColonia("");
      setSelect;
    } else {
      setLocalPaciente({
        dni: "",
        p_nombre: "",
        s_nombre: "",
        p_apellido: "",
        s_apellido: "",
        sexo: "",
        direccionExacta: "",
        contacto_nombre: "",
        contacto_apellido: "",
        contacto_telefono: "",
        idParentesco: "",
        antecedentes: "",
      });
    }
  }, [
    paciente,
    isEditMode,
    setSelectedMunicipio,
    setSelectedColonia,
    setSelectedDepartamento,
  ]);

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

  useEffect(() => {
    const fetchMunicipios = async () => {
      if (selectedDepartamento) {
        try {
          const data = await GetMunicipios(selectedDepartamento);
          setMunicipios(data);
          setSelectedMunicipio(""); // Reset municipio on departamento change
        } catch (error) {
          console.error("Error fetching municipios:", error);
        }
      } else {
        setMunicipios([]);
        setSelectedMunicipio("");
        setSelectedColonia("");
      }
    };

    fetchMunicipios();
  }, [selectedDepartamento]);

  useEffect(() => {
    const fetchColonias = async () => {
      if (selectedMunicipio) {
        try {
          const data = await GetColonias(selectedMunicipio);
          setColonias(data);
          setSelectedColonia(""); // Reset colonia on municipio change
        } catch (error) {
          console.error("Error fetching colonias:", error);
        }
      } else {
        setColonias([]);
        setSelectedColonia("");
      }
    };

    fetchColonias();
  }, [selectedMunicipio]);

  function handleSubmit(action) {
    if (action === "save") {
      if (isEditMode) {
        // Lógica para actualizar paciente
        console.log("Creando nuevo expediente:", localPaciente);
        // Aquí debes implementar la lógica para enviar la solicitud de actualización
      } else {
        // Lógica para crear nuevo paciente
        console.log("Actualizando paciente: ", localPaciente);
        // Aquí debes implementar la lógica para enviar la solicitud de creación
      }
    } else if (action === "cancel") {
      // Lógica para cancelar (e.g., redirigir a otra página o resetear el formulario)
      console.log("Cancelando...");
      // Aquí puedes implementar la lógica para cancelar
    }
  }

  return (
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
              max={new Date().toISOString().split("T")[0]} // Adjusted for today’s date
            />
          </div>
          <div className="w-1/2">
            <select
              id="tiposangre"
              name="tiposangre"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
              value={selectedTipoSangre}
              onChange={handleSelectChange}
            >
              <option value="">Seleccione un grupo sanguíneo</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div className="w-1/2">
            <label
              htmlFor="idDepartamento"
              className="block text-sm font-medium text-gray-700"
            >
              Departamento
            </label>
            <select
              id="idDepartamento"
              name="idDepartamento"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
              value={selectedDepartamento}
              onChange={handleSelectChange}
            >
              <option value="">Seleccione un departamento</option>
              {departamentos.map((d) => (
                <option key={d.idDepartamento} value={d.idDepartamento}>
                  {d.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/2">
            <label
              htmlFor="idMunicipio"
              className="block text-sm font-medium text-gray-700"
            >
              Municipio
            </label>
            <select
              id="idMunicipio"
              name="idMunicipio"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
              value={selectedMunicipio || ""}
              onChange={handleSelectChange}
            >
              <option value="">Seleccione un municipio</option>
              {municipios.map((m) => (
                <option key={m.idMunicipio} value={m.idMunicipio}>
                  {m.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <label
              htmlFor="idColonia"
              className="block text-sm font-medium text-gray-700"
            >
              Colonia
            </label>
            <select
              id="idColonia"
              name="idColonia"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
              value={selectedColonia || ""}
              onChange={handleSelectChange}
            >
              <option value="">Seleccione una colonia</option>
              {colonias.map((c) => (
                <option key={c.idColonia} value={c.idColonia}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>
          <input
            type="text"
            name="direccionExacta"
            placeholder="Dirección Exacta"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
            value={paciente?.direccionExacta || ""}
            onChange={handleInputChange}
          />
          <h2 className="text-xl font-bold mb-2">Contacto de Emergencia</h2>
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
          <select
            name="idParentesco"
            value={selectedParentesco}
            onChange={handleSelectChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
          >
            <option value="">Seleccione un Parentesco</option>
            {parentescos.map((par) => (
              <option key={par.idParentesco} value={par.idParentesco}>
                {par.descripcion}
              </option>
            ))}
          </select>
        </div>
      </div>

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
            onChange={handleInputChange}
          ></textarea>
        </div>

        {/* Div 2.2: Botones */}
        <div className="flex justify-between space-x-4">
          <button className="bg-green-200 text-green-800 px-4 py-2 rounded hover:bg-green-300">
            Subir Expediente
          </button>
          <button
            className="bg-green-200 text-green-800 px-4 py-2 rounded hover:bg-green-300"
            onClick={() => handleSubmit("save")}
          >
            Guardar
          </button>
          <button
            className="bg-green-200 text-green-800 px-4 py-2 rounded hover:bg-green-300"
            onClick={() => handleSubmit("cancel")}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
