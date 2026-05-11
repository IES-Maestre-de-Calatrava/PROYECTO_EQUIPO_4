    const API = "http://192.168.150.74:8085/api/grupos";

export async function getAllGrupos(){
    const response = await fetch(`${API}`);
    const grupos = await response.json();

    return grupos;
}

export async function getGruposByAlumno(id){
    const response = await fetch(`${API}/alumno/${id}`);
    const grupos = await response.json();

    return grupos;
}

export async function getGrupoById(id) {
    const response = await fetch(`${API}/${id}`);
    const grupo = await response.json();

    return grupo;
}

//si no va borrar el codigo de aqui para abajo

function getUserIdFromSession() {
    let sessionData = sessionStorage.getItem('lf_session_api');
    if (!sessionData) {
        sessionData = localStorage.getItem('lf_session_api');
    }
    
    if (sessionData) {
        try {
            const data = JSON.parse(sessionData);
            return data.id_user;
        } catch (e) {
            console.error("Error parsing session data:", e);
            return null;
        }
    }
    return null;
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

        const contenedor =
            document.getElementById("courses-container");

        let html = `
            <h2 style="text-align:center;color:#333">
                GRUPOS
            </h2>
        `;

        html += `<div class="groups-grid">`;

        for (let grupo of grupos) {

            const grupoId =
                grupo.idGrupo ??
                grupo.id ??
                grupo.id_grupo;

            const completed =
                state?.completedActivities || new Set();

            const totalActivities =
                grupo.activities?.length || 0;

            const totalExercises =
                grupo.activities?.reduce(
                    (s, a) =>
                        s + (a.exercises?.length || 0),
                    0
                ) || 0;

            const doneActivities =
                grupo.activities?.filter(a =>
                    completed.has(a.id)
                ).length || 0;

            const pct = Math.round(
                (doneActivities /
                    Math.max(1, totalActivities)) * 100
            );

            html += `
                <div class="course-card">

                    <span class="course-level-badge ${grupo.badge || 'basic'}">
                        ${grupo.level || 'Curso'}
                    </span>

                    <div class="course-title">
                        ${grupo.nombre}
                    </div>

                    <div class="course-meta">
                        ${grupo.desc || grupo.centro || 'Sin descripción'}
                    </div>

                    <div class="course-meta mt-1">
                        ${totalActivities || '--'} actividades ·
                        ${totalExercises || '--'} ejercicios
                    </div>

                    <div class="course-progress-bar">
                        <div
                            class="course-progress-fill"
                            style="width:${pct}%"
                        ></div>
                    </div>

                    <div class="course-progress-text">
                        ${doneActivities}/${totalActivities}
                        actividades completadas
                    </div>

                    <button
                        class="btn-course"
                        onclick="event.stopPropagation(); openCourse('${grupoId}')"
                    >
                        ${
                            doneActivities === 0
                                ? 'Empezar'
                                : doneActivities < totalActivities
                                    ? 'Continuar'
                                    : 'Revisar'
                        } →
                    </button>

                </div>
            `;
        }

        html += `</div>`;

        contenedor.innerHTML = html;

    } catch (error) {

        console.error(
            "Error al obtener los grupos:",
            error
        );

        document.getElementById("courses-container").innerHTML =
            "<p>Error al cargar datos.</p>";
    }
}

document.addEventListener(
    "DOMContentLoaded",
    renderGrupos
);