const API = "http://192.168.150.118:8085/grupos/";

export async function generarClaveGrupo(id, idProf){
    try {
        const request = await fetch(`${API}/${id}/codigo?idProfesor=${idProf}`, {method: 'POST'});
        const response = await request.json();

        return response;
    } catch (error) {
        console.log("Error al generar la clave de grupo");
        return `Error al generar clave: ${error}`;
    }
}