/**
 * getGrupos.js
 * Solo expone funciones de acceso a la API de grupos.
 * El renderizado se hace en script.js, reutilizando courseCardHTML().
 */

import { apiGetAllGrupos, apiGetGruposByAlumno, apiGetGrupoById } from '../../api.js';

export async function getAllGrupos() {
  return apiGetAllGrupos();
}

export async function getGruposByAlumno(idAlumno) {
  return apiGetGruposByAlumno(idAlumno);
}

export async function getGrupoById(id) {
  return apiGetGrupoById(id);
}
