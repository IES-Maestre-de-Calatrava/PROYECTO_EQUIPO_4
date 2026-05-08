const API = "http://192.168.150.185:8085/api/grupos";

export async function getAllGrupos(){
    const response = await fetch(`${API}`);
    const grupos = await response.json();

    return grupos;
}

export async function getGrupoById(id) {
    const response = await fetch(`${API}/${id}`);
    const grupo = await response.json();

    return grupo;
}

//si no va borrar el codigo de aqui para abajo

async function renderGrupos() {
    try {
        const grupos = await getAllGrupos();
<<<<<<< Updated upstream
        const contenedor = document.getElementById("courses-container");
=======
        const contenedor = document.getElementById("contenedor-tabla");
>>>>>>> Stashed changes

        let tabla = `
        <h2 style="text-align: center; color: #333">GRUPOS</h2>
            <table border="1" style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;">
                <thead style="background-color: #f2f2f2;">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Curso</th>
                        <th>Centro</th>
                        <th>Nº Alumnos</th>
                    </tr>
                </thead>
                <tbody>
        `;

        for (let grupo of grupos) {
            tabla += `
                <tr>
                    <td style="padding: 8px; text-align: center;">${grupo.idGrupo}</td>
                    <td style="padding: 8px;"><strong>${grupo.nombre}</strong></td>
                    <td style="padding: 8px;">${grupo.curso || '---'}</td>
                    <td style="padding: 8px;">${grupo.centro || grupo.idCentro || '---'}</td>
                    <td style="padding: 8px; text-align: center;">${grupo.numAlumnos ?? '---'}</td>
                </tr>
            `;
        }

        tabla += `</tbody></table>`;
        contenedor.innerHTML = tabla;

    } catch (error) {
        console.error("Error al obtener los grupos:", error);
<<<<<<< Updated upstream
        document.getElementById("courses-container").innerHTML = "<p>Error al cargar datos.</p>";
    }
}

document.addEventListener("DOMContentLoaded", function() {renderGrupos()});
=======
        document.getElementById("contenedor-tabla").innerHTML = "<p>Error al cargar datos.</p>";
    }
}
>>>>>>> Stashed changes
