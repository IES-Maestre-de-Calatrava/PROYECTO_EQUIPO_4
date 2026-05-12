const API = "http://192.168.150.118:8085/alumno";

export async function getAllAlumnos(){
    const response = await fetch(`${API}/find`);
    const alumnos = await response.json();

    return alumnos;
}

export async function getAlumnoById(id){
    const response = await fetch(`${API}/find/${id}`);
    const alumno = await response.json();

    return alumno;
}