import {formatearFecha} from  '../Utilidades.js';
import {getProfesorById} from './getProfesores.js';

const API = "http://localhost:8085/actividad/";

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
                    </tr>
                </thead>
                <tbody>
        `;
        for(let act of actividades) {
            console.log(act)
            const profe = await getProfesorById(act.idProfesor);
            const nombreProfe = profe ? profe.nombre : "No asignado";
            const apellidosProfe = profe ? profe.apellidos : "No asignado";
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
                    <td style="padding: 8px;">${act.preguntas}</td>
                    <td style="padding: 8px;">${act.respuestas}</td>
                </tr>
            `;
        };
        tabla += `
                </tbody>
            </table>
        `;
        contenedor.innerHTML = tabla;
    } catch (error) {
        console.error("Error al obtener las actividades:", error);
        document.getElementById("contenedor-tabla").innerHTML = "<p>Error al cargar datos.</p>";
    }
}

document.addEventListener("DOMContentLoaded", function() {getActividades()});