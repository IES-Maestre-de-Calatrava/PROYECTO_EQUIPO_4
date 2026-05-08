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
        const contenedor = document.getElementById("courses-container");

        let html = `<h2 style="text-align:center;color:#333">GRUPOS</h2>`;

        html += `<div class="groups-grid">`;

        for (let grupo of grupos) {
            html += `
                <div class="grupo-card" onclick="openCourse(${grupo.idGrupo})">
                    <div class="grupo-title">${grupo.nombre}</div>

                    <div class="grupo-info">
                        🏫 Centro: ${grupo.centro || '---'}
                    </div>

                    <div class="grupo-info">
                        👨‍🎓 Alumnos: ${grupo.numAlumnos ?? '---'}
                    </div>
                </div>
            `;
        }

        html += `</div>`;

        contenedor.innerHTML = html;

    } catch (error) {
        console.error("Error al obtener los grupos:", error);
        document.getElementById("courses-container").innerHTML =
            "<p>Error al cargar datos.</p>";
    }
}

document.addEventListener("DOMContentLoaded", renderGrupos);

document.addEventListener("DOMContentLoaded", function() {renderGrupos()});
