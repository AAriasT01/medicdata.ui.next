import settings from "./settings";

/* Verifica si el doctor tiene acceso a la clinica solicitada */
export async function GetAcceso(idMedico, idClinica) {
  const response = await fetch(
    `http://localhost:8000/accesoclinica/${idMedico}/${idClinica}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error en la solicitud: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

/*Trae la información de los expedientes de la clinica seleccionada*/
export async function GetExpedientes(id) {
  const response = await fetch(`${settings.domain}/expedientes/clinica/${id}`, {
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

/* Para mandar a eliminar un expediente */
export async function DeleteExpediente(id) {
  const response = await fetch(`${settings.domain}/expedientes/clinica/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) throw new HTTPError(response);
  else return response.json();
}
