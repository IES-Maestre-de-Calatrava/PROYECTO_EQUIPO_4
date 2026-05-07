const API = "http://192.168.150.185:8085/conexion/";

export async function getAllconexiones(){
    const response = await fetch(`${API}/find`);
    const conexiones = await response.json();

    return conexiones;
}

export async function getconexionById(id){
    const response = await fetch(`${API}find/${id}`);
    const conexion = await response.json();

    return conexion;
}