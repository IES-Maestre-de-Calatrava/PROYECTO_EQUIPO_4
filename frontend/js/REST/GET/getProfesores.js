/**
 * getProfesores.js
 * Redirige a las funciones centralizadas de api.js
 */

import { apiGetAllProfesores, apiGetProfesorById } from '../../api.js';

export async function getAllProfesores() {
  return apiGetAllProfesores();
}

export async function getProfesorById(id) {
  return apiGetProfesorById(id);
}
