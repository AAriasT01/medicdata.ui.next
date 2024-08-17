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

