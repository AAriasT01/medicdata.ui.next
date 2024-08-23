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
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { updatePaciente } from "@/services/paciente";

export default function Pagina(props) {
  const { idExpediente } = props.params;
  const [parentescos, setParentescos] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [colonias, setColonias] = useState([]);
  const [idPaciente, setIdPaciente] = useState([]);
  const [dni, setDni] = useState([]);
  const [pnombre, setPnombre] = useState([]);
  const [snombre, setSnombre] = useState([]);
  const [papellido, setPapellido] = useState([]);
  const [sapellido, setSapellido] = useState([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState("");
  const [selectedMunicipio, setSelectedMunicipio] = useState("");
  const [selectedColonia, setSelectedColonia] = useState("");
  const [direccion, setDireccion] = useState(" ");
  const [antecedentes, setAntecedentes] = useState(" ");
  const [selectedParentesco, setSelectedParentesco] = useState(" ");
  const [selectedTipoSangre, setSelectedTipoSangre] = useState(" ");
  const [fecha, setFecha] = useState("");
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const today = new Date();
  const [idClinica, setIdClinica] = useState(null); // Estado para guardar el idclinica
  const router = useRouter(); // useRouter ahora viene de next/navigation

  const formattedToday = today.toISOString().split("T")[0];

  // Obtener el idClinica de localStorage
  useEffect(() => {
    const clinicaId = localStorage.getItem("clinicaId");
    if (clinicaId) {
      console.log("ID clinica seleccionada:", clinicaId);
      setIdClinica(clinicaId);
    }
  }, []);

  const handleCancel = () => {
    if (idClinica) {
      redirect(`/clinica/${idClinica}`);
    } else {
      console.error("ID de clínica no está disponible");
    }
  };

  // Debug logging
  useEffect(() => {
    console.log("Selected Departamento:", selectedDepartamento);
  }, [selectedDepartamento]);

  useEffect(() => {
    console.log("Selected Municipio:", selectedMunicipio);
  }, [selectedMunicipio]);

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

  // Fetch paciente data when component mounts
  useEffect(() => {
    const fetchPaciente = async () => {
      const idPaciente = idExpediente;
      try {
        const data = await GetPaciente(idPaciente);
        if (data.length > 0) {
          const pacienteData = data[0];
          setPaciente(pacienteData);
          setDni(pacienteData.dni);
          setPnombre(pacienteData.p_nombre);
          setPapellido(pacienteData.p_apellido);
          setSnombre(pacienteData.s_nombre);
          setSapellido(pacienteData.s_apellido);
          setIdPaciente(pacienteData.idPaciente);
          setSelectedDepartamento(pacienteData.idDepartamento || "");
          setSelectedMunicipio(pacienteData.idMunicipio || "");
          setSelectedColonia(pacienteData.idColonia || "");
          setSelectedParentesco(pacienteData.idParentesco || "");
          setSelectedTipoSangre(pacienteData.tipoSangre || "");
          setFecha(pacienteData.fecha || "");
        }
        console.log("informacion del paciente:", data);
      } catch (error) {
        console.error("Error fetching paciente:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchPaciente();
  }, [idExpediente]);

  // Fetch municipios and colonias based on selectedDepartamento and selectedMunicipio
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedDepartamento) {
          const municipiosData = await GetMunicipios(selectedDepartamento);
          setMunicipios(municipiosData);
          if (paciente && paciente.idMunicipio) {
            setSelectedMunicipio(paciente.idMunicipio);
          } else {
            setSelectedMunicipio("");
          }
        } else {
          setMunicipios([]);
          setSelectedMunicipio("");
          setSelectedColonia("");
        }
      } catch (error) {
        console.error("Error fetching municipios:", error);
      }
    };

    fetchData();
  }, [selectedDepartamento]);

  // Ensure that municipios and colonias are updated after paciente is set
  useEffect(() => {
    const loadInitialData = async () => {
      if (paciente && paciente.idDepartamento) {
        try {
          const municipiosData = await GetMunicipios(paciente.idDepartamento);
          setMunicipios(municipiosData);
          setSelectedMunicipio(paciente.idMunicipio || "");

          const coloniasData = await GetColonias(paciente.idMunicipio);
          setColonias(coloniasData);
          setSelectedColonia(paciente.idColonia || "");
        } catch (error) {
          console.error("Error loading initial data:", error);
        }
      }
    };

    // Wait for the selectedDepartamento and selectedMunicipio to be updated
    if (paciente?.idDepartamento) {
      loadInitialData();
    }
  }, [paciente]);

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

  const validateFields = () => {
    const newErrors = {};

    if (!paciente?.dni) newErrors.dni = "El DNI es requerido.";
    if (!paciente?.p_nombre)
      newErrors.p_nombre = "El primer nombre es requerido.";
    if (!paciente?.p_apellido)
      newErrors.p_apellido = "El primer apellido es requerido.";
    if (!paciente?.sexo) newErrors.sexo = "El sexo es requerido.";
    if (!fecha) newErrors.fecha = "La fecha de nacimiento es requerida.";
    if (!selectedDepartamento)
      newErrors.departamento = "El departamento es requerido.";
    if (!selectedMunicipio) newErrors.municipio = "El municipio es requerido.";
    if (!selectedColonia) newErrors.colonia = "La colonia es requerida.";
    if (!selectedColonia) newErrors.colonia = "La colonia es requerida.";
    if (!paciente?.direccionExacta.trim())
      newErrors.direccion = "La dirección es requerida.";
    if (!paciente?.antecedentes?.trim()) {
      newErrors.antecedentes = "Los antecedentes son requeridos";
    }
    return newErrors;
  };
  const handleSave = async () => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Convert selectedParentesco to null if it is NaN
    const idParentesco = isNaN(parseInt(selectedParentesco, 10))
      ? null
      : parseInt(selectedParentesco, 10);

    // Datos que se enviarán a la función updatePaciente
    const updateData = {
      dni: dni,
      p_nombre: pnombre,
      s_nombre: snombre,
      p_apellido: papellido,
      s_apellido: sapellido,
    };

    try {
      console.log("info a guardar: ", {
        idPaciente,
        ...updateData,
      });

      // Llama a la función updatePaciente y pasa los datos
      await updatePaciente(idPaciente, updateData);

      alert("Paciente actualizado exitosamente");

      // Redirige solo después de que la actualización sea exitosa
      router.push(`/clinica/${idClinica}`);
    } catch (error) {
      console.error("Error al actualizar el paciente:", error);
      alert("Hubo un error al actualizar el paciente");
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
                  Editar Expediente
                </h1>
              </div>

              {loading ? (
                <div className="h-screen w-screen flex justify-center items-center ">
                  <p>Cargando datos del paciente...</p>
                </div>
              ) : (
                <div className="h-full bg-slate-50 rounded-md shadow-md flex space-x-2 p-4">
                  <div className="w-1/2 p-4 bg-purple-100 rounded-md">
                    <h2 className="text-xl font-bold mb-4">
                      Datos del Paciente
                    </h2>
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="dni"
                        placeholder="Número de Identidad"
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
                        value={paciente?.dni || ""}
                        onChange={(e) => {
                          handleInputChange(e); // Esto maneja el cambio para cualquier otro estado o función que estés usando
                          setDni(e.target.value); // Esto actualiza el estado específico para dni
                        }}
                      />
                      {errors.dni && (
                        <p className="text-red-500 text-sm">{errors.dni}</p>
                      )}
                      <input
                        type="text"
                        name="p_nombre"
                        placeholder="Primer Nombre"
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
                        value={paciente?.p_nombre || ""}
                        onChange={(e) => {
                          handleInputChange(e); // Esto maneja el cambio para cualquier otro estado o función que estés usando
                          setPnombre(e.target.value); //
                        }}
                      />
                      {errors.p_nombre && (
                        <p className="text-red-500 text-sm">
                          {errors.p_nombre}
                        </p>
                      )}
                      <input
                        type="text"
                        name="s_nombre"
                        placeholder="Segundo Nombre"
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
                        value={paciente?.s_nombre || ""}
                        onChange={(e) => {
                          handleInputChange(e); // Esto maneja el cambio para cualquier otro estado o función que estés usando
                          setSnombre(e.target.value); // Esto actualiza el estado específico para dni
                        }}
                      />
                      <input
                        type="text"
                        name="p_apellido"
                        placeholder="Primer Apellido"
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
                        value={paciente?.p_apellido || ""}
                        onChange={(e) => {
                          handleInputChange(e); // Esto maneja el cambio para cualquier otro estado o función que estés usando
                          setPapellido(e.target.value); // Esto actualiza el estado específico para dni
                        }}
                      />
                      {errors.p_apellido && (
                        <p className="text-red-500 text-sm">
                          {errors.p_apellido}
                        </p>
                      )}
                      <input
                        type="text"
                        name="s_apellido"
                        placeholder="Segundo Apellido"
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
                        value={paciente?.s_apellido || ""}
                        onChange={(e) => {
                          handleInputChange(e); // Esto maneja el cambio para cualquier otro estado o función que estés usando
                          setSapellido(e.target.value); // Esto actualiza el estado específico para dni
                        }}
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
                      {errors.sexo && (
                        <p className="text-red-500 text-sm">{errors.sexo}</p>
                      )}

                      <div className="flex space-x-2">
                        <input
                          type="date"
                          value={fecha}
                          onChange={(e) => setFecha(e.target.value)}
                          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
                          max={new Date().toISOString().split("T")[0]} // Adjusted for today’s date
                        />
                      </div>
                      {errors.fecha && (
                        <p className="text-red-500 text-sm">{errors.fecha}</p>
                      )}
                      <div className="w-1/2">
                        <select
                          id="tiposangre"
                          name="tiposangre"
                          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
                          value={selectedTipoSangre}
                          onChange={handleSelectChange}
                        >
                          <option value="">
                            Seleccione un grupo sanguíneo
                          </option>
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
                            <option
                              key={d.idDepartamento}
                              value={d.idDepartamento}
                            >
                              {d.nombre}
                            </option>
                          ))}
                        </select>
                        {errors.departamento && (
                          <p className="text-red-500 text-sm">
                            {errors.departamento}
                          </p>
                        )}
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
                          value={selectedMunicipio}
                          onChange={handleSelectChange}
                        >
                          <option value="">Seleccione un municipio</option>
                          {municipios.map((m) => (
                            <option key={m.idMunicipio} value={m.idMunicipio}>
                              {m.nombre}
                            </option>
                          ))}
                        </select>
                        {errors.municipio && (
                          <p className="text-red-500 text-sm">
                            {errors.municipio}
                          </p>
                        )}
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
                        {errors.colonia && (
                          <p className="text-red-500 text-sm">
                            {errors.colonia}
                          </p>
                        )}
                      </div>
                      <input
                        type="text"
                        name="direccionExacta"
                        placeholder="Dirección Exacta"
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
                        value={paciente?.direccionExacta || ""}
                        onChange={(e) => {
                          // Update the textarea value in the paciente state
                          handleInputChange(e);

                          // Update the direccion value directly with the content of the textarea
                          setDireccion(e.target.value);
                        }}
                      />
                      {errors.direccion && (
                        <p className="text-red-500 text-sm">
                          {errors.direccion}
                        </p>
                      )}
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
                      <select
                        name="idParentesco"
                        value={selectedParentesco}
                        onChange={handleSelectChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-purple-600"
                      >
                        <option value="">Seleccione un Parentesco</option>
                        {parentescos.map((par) => (
                          <option
                            key={par.idParentesco}
                            value={par.idParentesco}
                          >
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
                        onChange={(e) => {
                          // Update the textarea value in the paciente state
                          handleInputChange(e);

                          // Update the  value directly with the content of the textarea
                          setAntecedentes(e.target.value);
                        }}
                      ></textarea>
                      {errors.antecedentes && (
                        <p className="text-red-500 text-sm">
                          {errors.antecedentes}
                        </p>
                      )}
                    </div>

                    {/* Div 2.2: Botones */}
                    <div className="flex justify-between space-x-4">
                      <button className="bg-green-200 text-green-800 px-4 py-2 rounded hover:bg-green-300">
                        Subir Expediente
                      </button>
                      <button
                        onClick={handleSave}
                        className="bg-green-200 text-green-800 px-4 py-2 rounded hover:bg-green-300"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-green-200 text-green-800 px-4 py-2 rounded hover:bg-green-300"
                      >
                        <a
                          href={`/clinica/${idClinica}`} //
                        >
                          {" "}
                          Cancelar
                        </a>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
