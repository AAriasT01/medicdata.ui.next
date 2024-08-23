import settings from "./settings";

export async function GetDepartamentos() {
  const response = await fetch(`${settings.domain}/departamentos`, {
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

/*************************************************************************************************************/
/*************************************************************************************************************/
/*************************************************************************************************************/

export async function GetMunicipios(idDepartamento) {
  const response = await fetch(
    `${settings.domain}/municipios/${idDepartamento}`,
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

/*************************************************************************************************************/
/*************************************************************************************************************/
/*************************************************************************************************************/

export async function GetColonias(idMunicipio) {
  const response = await fetch(`${settings.domain}/colonias/${idMunicipio}`, {
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
