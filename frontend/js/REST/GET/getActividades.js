/**
 * getActividades.js
 * Funciones de acceso a la API de actividades.
 * Incluye nueva función getActividadesByGrupo para cargar actividades reales por grupo.
 */

import { formatearFecha } from '../../Utilidades.js';
import { apiGetProfesorById } from '../../api.js';
import { Parser } from '../../JSON/Parser.js';
import { generarFormularioActividad } from '../../formularioActividades.js';
import {
  apiGetAllActividades,
  apiGetActividadById,
  apiGetActividadesByGrupo,
} from '../../api.js';

export { apiGetAllActividades as getAllActividades, apiGetActividadById as getActividadById };

/**
 * Devuelve las actividades de un grupo concreto.
 * Llama a GET /actividad/grupo/{idGrupo}
 */
export async function getActividadesByGrupo(idGrupo) {
  return apiGetActividadesByGrupo(idGrupo);
}

/* ─────────────────────────────────────────────
   Funciones de renderizado (panel admin/tabla)
   Se mantienen igual para compatibilidad.
───────────────────────────────────────────── */

/**
 * Escapa caracteres especiales de HTML
 */
function escaparHTML(texto) {
  const mapa = { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' };
  return String(texto).replace(/[&<>"']/g, char => mapa[char]);
}

/**
 * Renderiza tabla de actividades en el elemento #contenedor-tabla.
 * Usada por páginas de administración, no por script.js principal.
 */
export async function renderTablaActividades() {
  try {
    const actividades = await apiGetAllActividades();
    const contenedor = document.getElementById('contenedor-tabla');
    if (!contenedor) return;

    let tabla = `
    <h2 style="text-align: center; color: #333">ACTIVIDADES</h2>
      <table border="1" style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;">
          <thead style="background-color: #f2f2f2;">
              <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Dificultad</th>
                  <th>Profesor</th>
                  <th>Duración</th>
                  <th>Inicio</th>
                  <th>Fin</th>
                  <th>Entrega</th>
                  <th>Preguntas</th>
                  <th>Respuestas</th>
                  <th>Acciones</th>
              </tr>
          </thead>
          <tbody>
    `;

    for (let act of actividades) {
      let nombreProfe = 'No asignado', apellidosProfe = '';
      try {
        const profe = await apiGetProfesorById(act.idProfesor);
        if (profe) { nombreProfe = profe.nombre; apellidosProfe = profe.apellidos || ''; }
      } catch {}
      const preguntasJson = Parser(act.preguntas);
      const respuestasJson = Parser(act.respuestas);
      tabla += `
          <tr>
              <td style="padding: 8px; text-align: center;">${act.idActividad}</td>
              <td style="padding: 8px;"><strong>${act.nombre}</strong></td>
              <td style="padding: 8px; text-align: center;">${act.dificultad}</td>
              <td style="padding: 8px; text-align: center;">${nombreProfe} ${apellidosProfe}</td>
              <td style="padding: 8px; text-align: center;">${act.duracion || '---'}</td>
              <td style="padding: 8px;">${formatearFecha(act.fechaInicio)}</td>
              <td style="padding: 8px;">${formatearFecha(act.fechaFin)}</td>
              <td style="padding: 8px; color: red;">${formatearFecha(act.fechaEntrega)}</td>
              <td style="padding: 8px;">${preguntasJson.length > 0 ? preguntasJson.join(', ') : '---'}</td>
              <td style="padding: 8px;">${respuestasJson.length > 0 ? respuestasJson.join(', ') : '---'}</td>
              <td style="padding: 8px; text-align: center;">
                  <button class="btn-responder"
                    data-id="${act.idActividad}"
                    data-preguntas="${escaparHTML(act.preguntas)}"
                    data-respuestas="${escaparHTML(act.respuestas)}"
                    data-nombre="${escaparHTML(act.nombre)}"
                    style="padding: 6px 12px; background-color: #2196F3; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
                      Responder
                  </button>
              </td>
          </tr>
      `;
    }
    tabla += `</tbody></table>`;
    contenedor.innerHTML = tabla;

    document.querySelectorAll('.btn-responder').forEach(boton => {
      boton.addEventListener('click', function () {
        mostrarFormularioActividad(
          this.getAttribute('data-id'),
          this.getAttribute('data-preguntas'),
          this.getAttribute('data-respuestas'),
          this.getAttribute('data-nombre')
        );
      });
    });

  } catch (error) {
    console.error('Error al obtener las actividades:', error);
    const c = document.getElementById('contenedor-tabla');
    if (c) c.innerHTML = '<p>Error al cargar datos.</p>';
  }
}

function mostrarFormularioActividad(idActividad, preguntasJson, respuestasJson, nombreActividad) {
  const contenedor = document.getElementById('contenedor-preguntas');
  if (!contenedor) return;
  contenedor.innerHTML = `
      <div style="margin-top: 40px; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">
          <h2 style="color: #333; margin-bottom: 20px;">${escaparHTML(nombreActividad)}</h2>
          <div id="formulario-container"></div>
      </div>
  `;
  generarFormularioActividad(preguntasJson, respuestasJson, 'formulario-container', (resultado) => {
    console.log('Resultado de la actividad:', resultado);
  });
  contenedor.scrollIntoView({ behavior: 'smooth' });
}

// Auto-render si existe el contenedor (compatibilidad con páginas legacy)
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('contenedor-tabla')) {
    renderTablaActividades();
  }
});
