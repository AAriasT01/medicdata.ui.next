/*Trae la información del doctor que inició sesión*/
export async function GetDoctor() {
  const response = await fetch(`http://localhost:8000/doctor`, {
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

/* Trae las clínicas en las que trabaja el doctor*/
export async function GetClinicasDoctor() {
  const response = await fetch(`http://localhost:8000/clinicasdoctor`, {
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
