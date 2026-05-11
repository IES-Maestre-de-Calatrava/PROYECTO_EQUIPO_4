import { Parser } from './JSON/Parser.js';

/**
 * Genera un formulario con campos para responder preguntas
 * @param {string} preguntasJsonString - String JSON con las preguntas
 * @param {string} respuestasJsonString - String JSON con las respuestas correctas
 * @param {string} contenedorId - ID del elemento donde mostrar el formulario
 * @param {Function} onEnviar - Callback opcional que se ejecuta al enviar el formulario
 */
export function generarFormularioActividad(preguntasJsonString, respuestasJsonString, contenedorId, onEnviar = null) {
    try {
        // Parsear preguntas y respuestas
        const preguntas = Parser(preguntasJsonString);
        const respuestasCorrectas = Parser(respuestasJsonString);

        // Validar que haya la misma cantidad de preguntas y respuestas
        if (preguntas.length !== respuestasCorrectas.length) {
            console.warn(`Advertencia: Número de preguntas (${preguntas.length}) no coincide con respuestas (${respuestasCorrectas.length})`);
        }

        const contenedor = document.getElementById(contenedorId);
        if (!contenedor) {
            console.error(`Elemento con ID '${contenedorId}' no encontrado`);
            return;
        }

        // Crear el formulario
        let formulario = `
            <div class="formulario-actividad">
                <form id="formulario-preguntas" style="display: flex; flex-direction: column; gap: 20px;">
        `;

        // Generar campos para cada pregunta
        preguntas.forEach((pregunta, index) => {
            formulario += `
                <div class="campo-pregunta" style="padding: 15px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
                    <label for="respuesta-${index}" style="display: block; font-weight: bold; margin-bottom: 10px; color: #333;">
                        ${index + 1}. ${pregunta}
                    </label>
                    <input 
                        type="text" 
                        id="respuesta-${index}" 
                        name="respuesta-${index}" 
                        class="respuesta-input"
                        placeholder="Escribe tu respuesta aquí..."
                        style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px; box-sizing: border-box;"
                    />
                    <div id="feedback-${index}" class="feedback" style="margin-top: 8px; font-weight: bold; display: none;"></div>
                </div>
            `;
        });

        formulario += `
                    <button type="submit" id="btn-enviar" style="padding: 12px 24px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; font-size: 16px; cursor: pointer; font-weight: bold;">
                        Enviar Respuestas
                    </button>
                    <button type="reset" id="btn-limpiar" style="padding: 12px 24px; background-color: #f44336; color: white; border: none; border-radius: 4px; font-size: 16px; cursor: pointer; margin-top: 10px; font-weight: bold;">
                        Limpiar
                    </button>
                </form>
                <div id="resultado-general" class="resultado-general" style="margin-top: 20px; padding: 15px; border-radius: 4px; display: none;"></div>
            </div>
        `;

        contenedor.innerHTML = formulario;

        // Agregar evento al formulario
        const form = document.getElementById('formulario-preguntas');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            verificarRespuestas(preguntas, respuestasCorrectas, onEnviar);
        });

    } catch (error) {
        console.error("Error al generar el formulario:", error);
        document.getElementById(contenedorId).innerHTML = "<p style='color: red;'>Error al cargar el formulario de preguntas.</p>";
    }
}

/**
 * Verifica las respuestas ingresadas contra las respuestas correctas
 * @param {Array} preguntas - Array de preguntas
 * @param {Array} respuestasCorrectas - Array de respuestas correctas
 * @param {Function} callback - Función a ejecutar después de verificar
 */
function verificarRespuestas(preguntas, respuestasCorrectas, callback = null) {
    let respuestasCorrectas_count = 0;
    const resultados = [];

    // Verificar cada respuesta
    preguntas.forEach((pregunta, index) => {
        const input = document.getElementById(`respuesta-${index}`);
        const feedback = document.getElementById(`feedback-${index}`);
        const respuestaUsuario = input.value.trim().toLowerCase();
        const respuestaCorrecta = respuestasCorrectas[index].toString().toLowerCase();

        const esCorrecta = respuestaUsuario === respuestaCorrecta;

        // Actualizar feedback visual
        if (esCorrecta) {
            feedback.style.color = '#4CAF50';
            feedback.textContent = '✓ ¡Correcto!';
            feedback.style.display = 'block';
            respuestasCorrectas_count++;
        } else {
            feedback.style.color = '#f44336';
            feedback.textContent = `✗ Incorrecto. La respuesta correcta es: "${respuestasCorrectas[index]}"`;
            feedback.style.display = 'block';
        }

        resultados.push({
            pregunta,
            respuestaUsuario,
            respuestaCorrecta,
            esCorrecta
        });
    });

    // Mostrar resumen general
    const porcentaje = Math.round((respuestasCorrectas_count / preguntas.length) * 100);
    const resultadoGeneral = document.getElementById('resultado-general');
    resultadoGeneral.style.display = 'block';
    resultadoGeneral.style.backgroundColor = porcentaje >= 60 ? '#d4edda' : '#f8d7da';
    resultadoGeneral.style.borderLeft = `4px solid ${porcentaje >= 60 ? '#28a745' : '#dc3545'}`;
    resultadoGeneral.innerHTML = `
        <strong style="font-size: 18px;">Resultado Final</strong>
        <p>Respuestas correctas: <strong>${respuestasCorrectas_count}/${preguntas.length}</strong></p>
        <p>Porcentaje: <strong>${porcentaje}%</strong></p>
    `;

    // Ejecutar callback si existe
    if (callback && typeof callback === 'function') {
        callback({
            respuestasCorrectas: respuestasCorrectas_count,
            totalPreguntas: preguntas.length,
            porcentaje,
            resultados
        });
    }
}

/**
 * Alterna la visibilidad del formulario
 * @param {string} contenedorId - ID del contenedor del formulario
 * @param {boolean} mostrar - true para mostrar, false para ocultar
 */
export function toggleFormulario(contenedorId, mostrar = null) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;

    if (mostrar === null) {
        contenedor.style.display = contenedor.style.display === 'none' ? 'block' : 'none';
    } else {
        contenedor.style.display = mostrar ? 'block' : 'none';
    }
}

/**
 * Limpia todas las respuestas del formulario
 * @param {string} formId - ID del formulario
 */
export function limpiarFormulario(formId = 'formulario-preguntas') {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
        // Limpiar feedbacks
        const feedbacks = document.querySelectorAll('.feedback');
        feedbacks.forEach(feedback => feedback.style.display = 'none');
        // Limpiar resultado general
        const resultadoGeneral = document.getElementById('resultado-general');
        if (resultadoGeneral) {
            resultadoGeneral.style.display = 'none';
        }
    }
}
