const API = "http://localhost:8085/grupos";

export async function getAllGrupos(){
    const response = await fetch(`${API}/`);
    const grupos = await response.json();

    return grupos;
}

export async function getGrupoById(id){
    const response = await fetch(`${API}/${id}`);
    const grupo = await response.json();

    return grupo;
}