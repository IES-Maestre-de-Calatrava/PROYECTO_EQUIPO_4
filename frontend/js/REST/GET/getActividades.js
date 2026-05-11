import {formatearFecha} from  '../../Utilidades.js';
import {getProfesorById} from './getProfesores.js';
import { Parser } from '../../JSON/Parser.js';
import { generarFormularioActividad } from '../../formularioActividades.js';

const API = "http://192.168.150.74:8085/actividad/";

/**
 * Obtiene el ID del grupo desde la sesión almacenada
 */
export function getGroupIdFromSession() {
    let sessionData = sessionStorage.getItem('lf_session_api');
    if (!sessionData) {
        sessionData = localStorage.getItem('lf_session_api');
    }
    
    if (sessionData) {
        try {
            const data = JSON.parse(sessionData);
            return data.id_grupo;
        } catch (e) {
            console.error("Error parsing session data:", e);
            return null;
        }
    }
    return null;
}

/**
 * Obtiene las actividades del grupo del usuario desde la API
 */
export async function obtenerActividadesDelGrupo() {
    try {
        const idGrupo = getGroupIdFromSession();
        if (!idGrupo) {
            console.error("No group ID found in session");
            return [];
        }

        const response = await fetch(`${API}grupo/${idGrupo}`);
        const actividades = await response.json();
        return actividades || [];
    } catch (error) {
        console.error("Error al obtener las actividades del grupo:", error);
        return [];
    }
}

/**
 * Escapa caracteres especiales de HTML
 */
function escaparHTML(texto) {
    texto = texto == null ? '' : String(texto);
    const mapa = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    };
    return texto.replace(/[&<>"']/g, char => mapa[char]);
}

function normalizarPuntos(puntos) {
    const puntosNumericos = Number(puntos);
    return Number.isFinite(puntosNumericos) && puntosNumericos > 0 ? Math.round(puntosNumericos) : 0;
}

function getUserIdFromSession() {
    const sessionRaw = sessionStorage.getItem('lf_session_api') || localStorage.getItem('lf_session_api');
    if (!sessionRaw) return null;

    try {
        const session = JSON.parse(sessionRaw);
        return session.id_user || session.id || null;
    } catch (error) {
        console.error("Error parsing session data:", error);
        return null;
    }
}

async function sumarPuntosAlumno(puntosGanados) {
    puntosGanados = normalizarPuntos(puntosGanados);
    if (!puntosGanados) return false;

    try {
        const idAlumno = getUserIdFromSession();
        if (!idAlumno) return false;

        const resGet = await fetch(`http://192.168.150.74:8085/alumno/find/${idAlumno}`);
        if (!resGet.ok) throw new Error(`GET alumno: HTTP ${resGet.status}`);
        const alumno = await resGet.json();

        const puntosActuales = Number(alumno.puntos) || 0;
        const puntosNuevos = Math.max(0, puntosActuales + puntosGanados);
        let nuevoNivel = alumno.nivel || 'A1';
        if (puntosNuevos >= 9000) nuevoNivel = 'B2';
        else if (puntosNuevos >= 5000) nuevoNivel = 'B1';
        else if (puntosNuevos >= 2000) nuevoNivel = 'A2';
        else nuevoNivel = 'A1';

        const resPut = await fetch(`http://192.168.150.74:8085/alumno/${idAlumno}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...alumno,
                puntos: puntosNuevos,
                nivel: nuevoNivel
            })
        });

        if (!resPut.ok) throw new Error(`PUT alumno: HTTP ${resPut.status}`);
        return true;
    } catch (error) {
        console.error("Error al sumar puntos del alumno:", error);
        return false;
    }
}

async function getActividades() {
    try {
        const idGrupo = getGroupIdFromSession();
        if (!idGrupo) {
            console.error("No group ID found in session");
            document.getElementById("contenedor-tabla").innerHTML = "<p>Error: Grupo no encontrado en la sesión.</p>";
            return;
        }

        const response = await fetch(`${API}grupo/${idGrupo}`);
        const actividades = await response.json();
        
        const contenedor = document.getElementById("contenedor-tabla");
        let tabla = `
        <h2 style="text-align: center; color: #333">ACTIVIDADES DE MI GRUPO</h2>
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
                        <th>Puntos</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;
        for(let act of actividades) {
            console.log(act)
            const profe = await getProfesorById(act.idProfesor);
            const nombreProfe = profe ? profe.nombre : "No asignado";
            const apellidosProfe = profe ? profe.apellidos : "No asignado";
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
                    <td style="padding: 8px;">${preguntasJson.length > 0 ? preguntasJson.join(", ") : '---'}</td>
                    <td style="padding: 8px;">${respuestasJson.length > 0 ? respuestasJson.join(", ") : '---'}</td>
                    <td style="padding: 8px; text-align: center;">${normalizarPuntos(act.puntos)}</td>
                    <td style="padding: 8px; text-align: center;">
                        <button class="btn-responder" data-id="${act.idActividad}" data-preguntas="${escaparHTML(act.preguntas)}" data-respuestas="${escaparHTML(act.respuestas)}" data-nombre="${escaparHTML(act.nombre)}" data-puntos="${normalizarPuntos(act.puntos)}" style="padding: 6px 12px; background-color: #2196F3; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
                            Responder
                        </button>
                    </td>
                </tr>
            `;
        };
        tabla += `
                </tbody>
            </table>
        `;
        contenedor.innerHTML = tabla;
        
        // Agregar eventos a los botones de responder
        const botonesResponder = document.querySelectorAll('.btn-responder');
        botonesResponder.forEach(boton => {
            boton.addEventListener('click', function() {
                const idActividad = this.getAttribute('data-id');
                const preguntasJson = this.getAttribute('data-preguntas');
                const respuestasJson = this.getAttribute('data-respuestas');
                const nombreActividad = this.getAttribute('data-nombre');
                const puntos = this.getAttribute('data-puntos');
                
                mostrarFormularioActividad(idActividad, preguntasJson, respuestasJson, nombreActividad, puntos);
            });
        });
        
    } catch (error) {
        console.error("Error al obtener las actividades:", error);
        document.getElementById("contenedor-tabla").innerHTML = "<p>Error al cargar datos.</p>";
    }
}

/**
 * Muestra el formulario con las preguntas y respuestas de una actividad
 */
function mostrarFormularioActividad(idActividad, preguntasJson, respuestasJson, nombreActividad, puntos) {
    const contenedor = document.getElementById('contenedor-preguntas');
    const puntosActividad = normalizarPuntos(puntos);
    let puntosYaAsignados = false;
    
    // Limpiar contenedor anterior
    contenedor.innerHTML = `
        <div style="margin-top: 40px; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">
            <h2 style="color: #333; margin-bottom: 20px;">${escaparHTML(nombreActividad)}</h2>
            <div id="formulario-container"></div>
        </div>
    `;
    
    // Generar el formulario
    generarFormularioActividad(preguntasJson, respuestasJson, 'formulario-container', (resultado) => {
        console.log('Resultado de la actividad:', resultado);
        // Aquí puedes guardar el resultado en el backend si lo deseas
        if (puntosYaAsignados) return;
        puntosYaAsignados = true;
        sumarPuntosAlumno(puntosActividad);

        const resultadoGeneral = document.getElementById('resultado-general');
        if (resultadoGeneral && puntosActividad > 0) {
            resultadoGeneral.innerHTML += `
                <p>Has ganado: <strong>+${puntosActividad} puntos</strong></p>
            `;
        }
    });
    
    // Scroll al formulario
    contenedor.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener("DOMContentLoaded", function() {getActividades()});
