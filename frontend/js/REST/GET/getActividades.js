import {formatearFecha} from  '../../Utilidades.js';
import {getProfesorById} from './getProfesores.js';
import { Parser } from '../../JSON/Parser.js';
import { generarFormularioActividad } from '../../formularioActividades.js';

const API = "http://192.168.150.74:8085/actividad/";

/**
 * Escapa caracteres especiales de HTML
 */
function escaparHTML(texto) {
    const mapa = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    };
    return texto.replace(/[&<>"']/g, char => mapa[char]);
}

async function getActividades() {
    try {
        const response = await fetch(`${API}find`);
        const actividades = await response.json();
        
        const contenedor = document.getElementById("contenedor-tabla");
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
                    <td style="padding: 8px; text-align: center;">
                        <button class="btn-responder" data-id="${act.idActividad}" data-preguntas="${escaparHTML(act.preguntas)}" data-respuestas="${escaparHTML(act.respuestas)}" data-nombre="${escaparHTML(act.nombre)}" style="padding: 6px 12px; background-color: #2196F3; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
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
                
                mostrarFormularioActividad(idActividad, preguntasJson, respuestasJson, nombreActividad);
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
function mostrarFormularioActividad(idActividad, preguntasJson, respuestasJson, nombreActividad) {
    const contenedor = document.getElementById('contenedor-preguntas');
    
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
    });
    
    // Scroll al formulario
    contenedor.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener("DOMContentLoaded", function() {getActividades()});
