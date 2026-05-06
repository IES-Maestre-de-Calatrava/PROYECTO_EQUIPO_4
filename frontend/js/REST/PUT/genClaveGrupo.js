const API = "http://localhost:8085/grupos/";

export async function generarClaveGrupo(id, idProf){
    try {
        const request = await fetch(`${API}/${id}/codigo?idProfesor=${idProf}`);
        const response = await request.json();

        return response;
    } catch (error) {
        console.log("Error al generar la clave de grupo");
        return `Error al generar clave: ${error}`;
    }
}