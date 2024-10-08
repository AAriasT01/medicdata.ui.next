

<main className="flex-1 h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
  {/* Contenedor principal */}
  <div className="w-full h-full max-w-7xl p-4 bg-white rounded-md shadow-md flex flex-col justify-between">
    <div >Expedientes</div>
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
      <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
        Eliminar
      </button>
      <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
        Editar
      </button>
      <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
        Expediente
      </button>
      <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
        Evaluar
      </button>
    </div>

    {/* Div con la tabla */}
    <div className="w-full flex-1 bg-white p-4 border rounded-md overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nombres</th>
            <th className="py-2 px-4 border-b">Apellidos</th>
            <th className="py-2 px-4 border-b">Número de Citas</th>
            <th className="py-2 px-4 border-b">Fecha Última Consulta</th>
            <th className="py-2 px-4 border-b">Último Diagnóstico / Enfermedad</th>
            <th className="py-2 px-4 border-b">Edad</th>
            <th className="py-2 px-4 border-b">Teléfono</th>
            <th className="py-2 px-4 border-b">Peso</th>
            <th className="py-2 px-4 border-b">Sangre</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b">Santiago</td>
            <td className="py-2 px-4 border-b">Burgos Molina</td>
            <td className="py-2 px-4 border-b">5</td>
            <td className="py-2 px-4 border-b">15/06/2024</td>
            <td className="py-2 px-4 border-b">Diabetes tipo 2</td>
            <td className="py-2 px-4 border-b">29 años</td>
            <td className="py-2 px-4 border-b">99567890</td>
            <td className="py-2 px-4 border-b">55 kg</td>
            <td className="py-2 px-4 border-b">O+</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Ana María</td>
            <td className="py-2 px-4 border-b">Lanza Paz</td>
            <td className="py-2 px-4 border-b">3</td>
            <td className="py-2 px-4 border-b">13/03/2024</td>
            <td className="py-2 px-4 border-b">Asma Bronquial</td>
            <td className="py-2 px-4 border-b">15 años</td>
            <td className="py-2 px-4 border-b">32786752</td>
            <td className="py-2 px-4 border-b">40 kg</td>
            <td className="py-2 px-4 border-b">O+</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Mario Rolando</td>
            <td className="py-2 px-4 border-b">Soto Ponce</td>
            <td className="py-2 px-4 border-b">2</td>
            <td className="py-2 px-4 border-b">28/07/2024</td>
            <td className="py-2 px-4 border-b">Hipertensión Arterial</td>
            <td className="py-2 px-4 border-b">54 años</td>
            <td className="py-2 px-4 border-b">97564223</td>
            <td className="py-2 px-4 border-b">82 kg</td>
            <td className="py-2 px-4 border-b">A+</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Gabriela</td>
            <td className="py-2 px-4 border-b">Perez</td>
            <td className="py-2 px-4 border-b">6</td>
            <td className="py-2 px-4 border-b">23/05/2024</td>
            <td className="py-2 px-4 border-b">Insuficiencia Renal Crónica</td>
            <td className="py-2 px-4 border-b">29 años</td>
            <td className="py-2 px-4 border-b">98768965</td>
            <td className="py-2 px-4 border-b">70 kg</td>
            <td className="py-2 px-4 border-b">O+</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</main>


/*solo hay que ir cambiando lo que esta dentro del main contenedor principal */

