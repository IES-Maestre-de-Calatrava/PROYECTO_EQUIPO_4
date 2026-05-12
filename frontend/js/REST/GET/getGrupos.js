    const API = "http://192.168.150.118:8085/api/grupos";

export async function getAllGrupos() {
    const response = await fetch(`${API}`);
    if (!response.ok) throw new Error(`Error ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data)) return [];
    return data;
}

export async function getGruposByAlumno(id) {
    const response = await fetch(`${API}/alumno/${id}`);
    if (!response.ok) throw new Error(`Error ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data)) return [];
    return data;
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

        const data = await response.json();
        if (!Array.isArray(data)) return [];
        return data;
    } catch (error) {
        console.error("Error en getGruposByNombre:", error);
        return [];
    }
}

export async function getGruposByProfesor(idProfesor) {
    const response = await fetch(`${API}/profesor/${idProfesor}`);
    if (!response.ok) throw new Error(`Error ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data)) return [];
    return data;
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
