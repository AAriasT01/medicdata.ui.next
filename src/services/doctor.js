import settings from "./settings";
/* Trae la información del doctor que inició sesión */
export async function GetDoctor(correo) {
  const encodedCorreo = encodeURIComponent(correo);
  const response = await fetch(`${settings.domain}/doctor/${encodedCorreo}`, {
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

/* Trae las clínicas en las que trabaja el doctor */
export async function GetClinicasDoctor(id) {
  // Verifica si el id es null o undefined
  if (!id) {
    // Retorna null o un valor que indique que no se hará nada
    return [];
  }

  try {
    const response = await fetch(`${settings.domain}/clinicasdoctor/${id}`, {
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
  } catch (error) {
    console.error("Error al obtener las clínicas del doctor:", error);
    return null; // O puedes manejar el error de otra manera
  }
}
