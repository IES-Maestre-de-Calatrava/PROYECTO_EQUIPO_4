    const API = "http://192.168.150.74:8085/api/grupos";

export async function getAllGrupos() {
    const response = await fetch(`${API}`);
    if (!response.ok) throw new Error(`Error ${response.status}`);
    return await response.json();
}

export async function getGruposByAlumno(id) {
    const response = await fetch(`${API}/alumno/${id}`);
    if (!response.ok) throw new Error(`Error ${response.status}`);
    return await response.json();
}

export async function getGrupoById(id) {
    const response = await fetch(`${API}/${id}`);
    if (!response.ok) throw new Error(`Error ${response.status}`);
    return await response.json();
}

// ✅ Usa ?nombre= en lugar de /nombre/{nombre} para evitar problemas con tildes y espacios
export async function getGruposByNombre(nombre) {
    try {
        const url = `${API}/nombre?nombre=${encodeURIComponent(nombre)}`;
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) return [];
            throw new Error(`Error ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error en getGruposByNombre:", error);
        return [];
    }
}

export async function getGruposByProfesor(idProfesor) {
    const response = await fetch(`${API}/profesor/${idProfesor}`);
    if (!response.ok) throw new Error(`Error ${response.status}`);
    return await response.json();
}

export async function getAlumnosByGrupo(idGrupo) {
    const response = await fetch(`${API}/${idGrupo}/alumnos`);
    if (!response.ok) throw new Error(`Error ${response.status}`);
    return await response.json();
}

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
        const contenedor = document.getElementById("courses-container");

        let html = `<h2 style="text-align:center;color:#333">GRUPOS</h2>`;
        html += `<div class="groups-grid">`;

        for (let grupo of grupos) {
            const grupoId = grupo.idGrupo ?? grupo.id ?? grupo.id_grupo;
            html += `
                <div class="grupo-card" onclick="openCourse('${grupoId}')">
                    <div class="grupo-title">${grupo.nombre}</div>
                    <div class="grupo-info">🏫 Centro: ${grupo.centro || '---'}</div>
                    <div class="grupo-info">👨‍🎓 Alumnos: ${grupo.numAlumnos ?? '---'}</div>
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

const coursesContainer = document.getElementById("courses-container");
if (coursesContainer) {
    document.addEventListener("DOMContentLoaded", renderGrupos);
}
