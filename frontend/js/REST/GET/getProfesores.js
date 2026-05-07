const API = "http://192.168.150.185:8085/profesor/";

export async function getAllProfesores(){
    const response = await fetch(`${API}/find`);
    const profesores = await response.json();

    return profesores;
}

export async function getProfesorById(id){
    const response = await fetch(`${API}find/${id}`);
    const profesor = await response.json();

    return profesor;
}