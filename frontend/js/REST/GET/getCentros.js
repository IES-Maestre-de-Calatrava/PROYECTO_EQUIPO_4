const API = "http://192.168.150.118:8085/centro";

export async function getAllCentros() {
    let response = await fetch(`${API}/find`);

    if (!response.ok) {
        response = await fetch(`${API}/`);
    }

    if (!response.ok) throw new Error(`Error ${response.status}`);

    const centros = await response.json();

    return centros;
}

export async function getCentroById(id) {
    const response = await fetch(`${API}/find/${id}`);
    if (!response.ok) throw new Error(`Error ${response.status}`);

    const centro = await response.json();

    return centro;
}
