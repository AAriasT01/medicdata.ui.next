/*Trae la información de los expedientes de la clinica seleccionada*/
export async function GetExpedientes() {
  const response = await fetch(`http://localhost:8000/expedientes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
  });

  if (!response.ok) {
    throw new Error(`Error en la solicitud: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
