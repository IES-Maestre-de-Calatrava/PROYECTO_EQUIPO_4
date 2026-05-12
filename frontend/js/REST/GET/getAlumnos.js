const API = "http://192.168.150.118:8085/alumno";

export async function getAllAlumnos(){
    const response = await fetch(`${API}/find`);
    if (!response.ok) {
        throw new Error(`Error ${response.status} al cargar los alumnos`);
    }

    return await response.json();
}

export async function getAlumnoById(id){
    const response = await fetch(`${API}/find/${id}`);
    if (!response.ok) {
        throw new Error(`Error ${response.status} al obtener el alumno`);
    }

    return await response.json();
}