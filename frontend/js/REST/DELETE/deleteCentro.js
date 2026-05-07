const API = "http://192.168.150.185:8085/centro";

export async function deleteAllCentros(){
    const response = await fetch(`${API}/`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Error al eliminar el centro");
    }

    return true;
}


export async function deleteCentroId(id){
    const response = await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Error al eliminar el centro");
    }

    return true;
}