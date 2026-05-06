const API = "http://localhost:8085/centro";

export async function getAllCentros(){
    const response = await fetch(`${API}/`);
    const centros = await response.json();

    return centros;
}

export async function getCentroById(id){
    const response = await fetch(`${API}/${id}`);
    const centro = await response.json();

    return centro;
}