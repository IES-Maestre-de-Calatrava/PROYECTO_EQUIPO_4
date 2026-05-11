const API = "http://192.168.150.74:8085/api/centros";

export async function getAllCentros() {
    try {
        const response = await fetch(`${API}`);
        if (!response.ok) {
            throw new Error(`Error en la red: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al obtener centros:", error);
        return []; 
    }
}

export async function getCentroById(id){
    const response = await fetch(`${API}/${id}`);
    const centro = await response.json();

    return centro;
}