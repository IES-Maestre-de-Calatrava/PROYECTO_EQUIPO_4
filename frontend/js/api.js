/**
 * api.js — Servicio centralizado de llamadas al backend.
 * Todas las URL y funciones fetch del proyecto pasan por aquí.
 * Cambia BASE_URL si el backend está en otro host/puerto.
 */

export const BASE_URL = 'http://192.168.150.74:8085';

/* ─── UTILIDADES ─── */

/**
 * Devuelve los headers comunes para peticiones JSON.
 */
function jsonHeaders() {
  return { 'Content-Type': 'application/json' };
}

/**
 * Recupera el objeto de sesión guardado (API real).
 * Devuelve null si no hay sesión.
 */
export function getSession() {
  try {
    const raw = sessionStorage.getItem('lf_session_api') || localStorage.getItem('lf_session_api');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Devuelve el ID del usuario en sesión (alumno o profesor).
 */
export function getSessionUserId() {
  const s = getSession();
  return s ? (s.id_user || s.id || null) : null;
}

/* ─── GRUPOS ─── */

/** GET /api/grupos — Todos los grupos */
export async function apiGetAllGrupos() {
  const res = await fetch(`${BASE_URL}/api/grupos`);
  if (!res.ok) throw new Error(`GET /api/grupos → HTTP ${res.status}`);
  return res.json();
}

/** GET /api/grupos/{id} — Un grupo por ID */
export async function apiGetGrupoById(id) {
  const res = await fetch(`${BASE_URL}/api/grupos/${id}`);
  if (!res.ok) throw new Error(`GET /api/grupos/${id} → HTTP ${res.status}`);
  return res.json();
}

/** GET /api/grupos/alumno/{idAlumno} — Grupos de un alumno */
export async function apiGetGruposByAlumno(idAlumno) {
  const res = await fetch(`${BASE_URL}/api/grupos/alumno/${idAlumno}`);
  if (!res.ok) throw new Error(`GET /api/grupos/alumno/${idAlumno} → HTTP ${res.status}`);
  const data = await res.json();
  // El backend puede devolver { mensaje: "..." } si no hay grupos
  if (!Array.isArray(data)) return [];
  return data;
}

/** POST /api/grupos — Crear grupo */
export async function apiPostGrupo(grupoDTO) {
  const res = await fetch(`${BASE_URL}/api/grupos`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify(grupoDTO),
  });
  if (!res.ok) throw new Error(`POST /api/grupos → HTTP ${res.status}`);
  return res.json();
}

/** DELETE /api/grupos/{id} — Eliminar grupo */
export async function apiDeleteGrupo(id) {
  const res = await fetch(`${BASE_URL}/api/grupos/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`DELETE /api/grupos/${id} → HTTP ${res.status}`);
}

/** GET /api/grupos/{idProfesor}/profesor — Grupos de un profesor */
export async function apiGetGruposByProfesor(idProfesor) {
  const res = await fetch(`${BASE_URL}/api/grupos/profesor/${idProfesor}`);
  if (!res.ok) throw new Error(`GET /api/grupos/profesor/${idProfesor} → HTTP ${res.status}`);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

/* ─── ACTIVIDADES ─── */

/** GET /actividad/find — Todas las actividades */
export async function apiGetAllActividades() {
  const res = await fetch(`${BASE_URL}/actividad/find`);
  if (!res.ok) throw new Error(`GET /actividad/find → HTTP ${res.status}`);
  return res.json();
}

/** GET /actividad/find/{id} — Actividad por ID */
export async function apiGetActividadById(id) {
  const res = await fetch(`${BASE_URL}/actividad/find/${id}`);
  if (!res.ok) throw new Error(`GET /actividad/find/${id} → HTTP ${res.status}`);
  return res.json();
}

/** GET /actividad/grupo/{idGrupo} — Actividades de un grupo */
export async function apiGetActividadesByGrupo(idGrupo) {
  const res = await fetch(`${BASE_URL}/actividad/grupo/${idGrupo}`);
  if (!res.ok) throw new Error(`GET /actividad/grupo/${idGrupo} → HTTP ${res.status}`);
  return res.json();
}

/** POST /actividad — Crear actividad */
export async function apiPostActividad(actividadDTO) {
  const res = await fetch(`${BASE_URL}/actividad`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify(actividadDTO),
  });
  if (!res.ok) throw new Error(`POST /actividad → HTTP ${res.status}`);
  return res.json();
}

/* ─── ALUMNOS ─── */

/** GET /alumno/find/{id} — Alumno por ID */
export async function apiGetAlumnoById(id) {
  const res = await fetch(`${BASE_URL}/alumno/find/${id}`);
  if (!res.ok) throw new Error(`GET /alumno/find/${id} → HTTP ${res.status}`);
  return res.json();
}

/** GET /alumno/find — Todos los alumnos */
export async function apiGetAllAlumnos() {
  const res = await fetch(`${BASE_URL}/alumno/find`);
  if (!res.ok) throw new Error(`GET /alumno/find → HTTP ${res.status}`);
  return res.json();
}

/** PUT /alumno/{id} — Actualizar alumno (incluye puntos) */
export async function apiPutAlumno(id, alumnoDTO) {
  const res = await fetch(`${BASE_URL}/alumno/${id}`, {
    method: 'PUT',
    headers: jsonHeaders(),
    body: JSON.stringify(alumnoDTO),
  });
  if (!res.ok) throw new Error(`PUT /alumno/${id} → HTTP ${res.status}`);
  return res.json();
}

/* ─── PROFESORES ─── */

/** GET /profesor/find/{id} — Profesor por ID */
export async function apiGetProfesorById(id) {
  const res = await fetch(`${BASE_URL}/profesor/find/${id}`);
  if (!res.ok) throw new Error(`GET /profesor/find/${id} → HTTP ${res.status}`);
  return res.json();
}

/** GET /profesor/find — Todos los profesores */
export async function apiGetAllProfesores() {
  const res = await fetch(`${BASE_URL}/profesor/find`);
  if (!res.ok) throw new Error(`GET /profesor/find → HTTP ${res.status}`);
  return res.json();
}
