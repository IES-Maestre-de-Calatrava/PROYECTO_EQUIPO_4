const API = "http://localhost:8085/grupo";

export async function deleteAllGrupos(){
    const response = await fetch(`${API}/`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Error al eliminar el grupo");
    }

    return true;
}


export async function deleteGrupoId(id){
    const response = await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Error al eliminar el grupo");
    }

    return true;
}