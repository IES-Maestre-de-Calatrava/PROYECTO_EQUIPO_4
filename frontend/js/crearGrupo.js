const API_URL = "http://192.168.150.185:8085/profesor";

async function profesorCreaGrupo(nombreGrupo, codigoGrupo, idProfesor) {
    const datos = {
        nombre: nombreGrupo,
        codigo: codigoGrupo,
        profesor: { id: idProfesor } // Relación con la entidad Profesor
    };

    try {
        const response = await fetch(`${API_URL}/crear-grupo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        if (response.ok) {
            const result = await response.json();
            console.log("Grupo creado exitosamente:", result);
        }
    } catch (error) {
        console.error("Error en la conexión:", error);
    }
}