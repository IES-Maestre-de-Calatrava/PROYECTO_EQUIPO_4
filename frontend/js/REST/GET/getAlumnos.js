const API = "http://192.168.150.185:8085/alumno/";

export async function getAllalumnoes(){
    const response = await fetch(`${API}/find`);
    const alumnos = await response.json();

    return alumnos;
}

export async function getalumnoById(id){
    const response = await fetch(`${API}find/${id}`);
    const alumno = await response.json();

    return alumno;
}