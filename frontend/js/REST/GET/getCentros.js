const API = "http://192.168.150.74:8085/centro";

export async function getAllCentros(){
    const response = await fetch(`${API}/`);
    const centros = await response.json();

    return centros;
}

export async function getCentroById(id){
    const response = await fetch(`${API}/${id}`);
    const centro = await response.json();

    return centro;
}
async function renderGrupos() {
    try {
        const userId = getUserIdFromSession();

        if (!userId) {
            console.error("No user ID found in session");

            document.getElementById("courses-container").innerHTML =
                "<p>Error: Usuario no autenticado.</p>";

            return;
        }

        const grupos = await getGruposByAlumno(userId);
        const contenedor = document.getElementById("courses-container");

        let html = `<h2 style="text-align:center;color:#333">GRUPOS</h2>`;
        html += `<div class="groups-grid">`;

        for (let grupo of grupos) {

            const grupoId = grupo.idGrupo ?? grupo.id ?? grupo.id_grupo;

            // Datos solo estéticos para adaptar la tarjeta
            const totalActividades = grupo.numActividades ?? 0;
            const actividadesCompletadas = grupo.actividadesCompletadas ?? 0;

            const pct = Math.round(
                (actividadesCompletadas / Math.max(1, totalActividades)) * 100
            );

            html += `
                <div class="course-card">

                    <span class="course-level-badge beginner">
                        GRUPO
                    </span>

                    <div class="course-title">
                        ${grupo.nombre}
                    </div>

                    <div class="course-meta">
                        🏫 Centro: ${grupo.centro || "---"}
                    </div>

                    <div class="course-meta mt-1">
                        👨‍🎓 ${grupo.numAlumnos ?? "---"} alumnos
                    </div>

                    <div class="course-progress-bar">
                        <div 
                            class="course-progress-fill" 
                            style="width:${pct}%">
                        </div>
                    </div>

                    <div class="course-progress-text">
                        ${actividadesCompletadas}/${totalActividades} actividades completadas
                    </div>

                    <button 
                        class="btn-course"
                        onclick="openCourse('${grupoId}')"
                    >
                        Empezar →
                    </button>

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