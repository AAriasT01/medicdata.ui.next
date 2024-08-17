export async function GetDoctor(id) {
  const response = await fetch(`http://localhost:3000/expedientes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) throw new HTTPError(response);
  else return response.json();
}
