import settings from "./settings";

export async function GetPaciente(idPaciente) {
  const response = await fetch(`${settings.domain}/paciente/${idPaciente}`, {
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

export async function GetParentesco() {
  const response = await fetch(`${settings.domain}/parentescos`, {
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

export async function updatePaciente(idPaciente, updateData) {
  try {
    const response = await fetch(`${settings.domain}/paciente/${idPaciente}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idPaciente, ...updateData }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${errorText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to update paciente:", error);
    throw error;
  }
}
