const API_NOTIFICACIONES = "http://192.168.150.74:8085/api/notificaciones";
const API_INVITACIONES = "http://192.168.150.74:8085/api/invitaciones";

export class PostNotificaciones {
    /**
     * Crea una notificación para un usuario
     * @param {number} idUsuario - ID del usuario destinatario
     * @param {string} titulo - Título de la notificación
     * @param {string} mensaje - Mensaje de la notificación
     * @param {string} tipo - Tipo de notificación ('invitacion_grupo', 'info', etc.)
     * @param {object} datosExtra - Datos adicionales (opcional)
     * @returns {Promise<any>} Respuesta del servidor
     */
    async crearNotificacion(idUsuario, titulo, mensaje, tipo = 'info', datosExtra = {}) {
        if (!idUsuario || !titulo || !mensaje) {
            throw new Error("idUsuario, titulo y mensaje son requeridos");
        }

        const datos = {
            idUsuario: Number(idUsuario),
            titulo: titulo.trim(),
            mensaje: mensaje.trim(),
            tipo: tipo,
            fechaCreacion: new Date().toISOString(),
            leida: false,
            ...datosExtra
        };

        return await this.#postJson(API_NOTIFICACIONES, datos, "Notificación creada");
    }

    /**
     * Crea una notificación de invitación a grupo
     * @param {number} idAlumno - ID del alumno
     * @param {number} idGrupo - ID del grupo
     * @param {string} nombreGrupo - Nombre del grupo
     * @param {string} nombreProfesor - Nombre del profesor
     * @returns {Promise<any>} Respuesta del servidor
     */
    async notificarInvitacionGrupo(idAlumno, idGrupo, nombreGrupo, nombreProfesor) {
        const titulo = "¡Nueva invitación a grupo!";
        const mensaje = `${nombreProfesor} te ha invitado a unirte al grupo "${nombreGrupo}". ¿Quieres aceptar la invitación?`;

        return await this.crearNotificacion(
            idAlumno,
            titulo,
            mensaje,
            'invitacion_grupo',
            {
                idGrupo: Number(idGrupo),
                nombreGrupo: nombreGrupo,
                nombreProfesor: nombreProfesor,
                tipoAccion: 'invitacion_grupo'
            }
        );
    }

    /**
     * Crea una notificación de invitación aceptada
     * @param {number} idProfesor - ID del profesor
     * @param {number} idAlumno - ID del alumno
     * @param {string} nombreAlumno - Nombre del alumno
     * @param {string} nombreGrupo - Nombre del grupo
     * @returns {Promise<any>} Respuesta del servidor
     */
    async notificarInvitacionAceptada(idProfesor, idAlumno, nombreAlumno, nombreGrupo) {
        const titulo = "Invitación aceptada";
        const mensaje = `${nombreAlumno} ha aceptado tu invitación y se ha unido al grupo "${nombreGrupo}".`;

        return await this.crearNotificacion(
            idProfesor,
            titulo,
            mensaje,
            'invitacion_aceptada',
            {
                idAlumno: Number(idAlumno),
                nombreAlumno: nombreAlumno,
                idGrupo: Number(idGrupo),
                nombreGrupo: nombreGrupo
            }
        );
    }

    // ═══════════════════════════════════════════════════════════════
    // MÉTODOS PRIVADOS
    // ═══════════════════════════════════════════════════════════════

    async #postJson(url, datos, mensajeExito = "Operación completada") {
        console.log(`📤 POST ${url}`, datos);

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            });

            const text = await response.text();

            if (!response.ok) {
                const errorMsg = this.#extraerMensajeError(response.status, text);
                throw new Error(`${response.status}: ${errorMsg}`);
            }

            if (!text) {
                console.log(`✅ ${mensajeExito}`);
                return { success: true, message: mensajeExito };
            }

            try {
                const resultado = JSON.parse(text);
                console.log(`✅ ${mensajeExito}`, resultado);
                return resultado;
            } catch {
                return { success: true, message: mensajeExito, rawResponse: text };
            }
        } catch (error) {
            console.error(`❌ Error en POST:`, error);
            throw error;
        }
    }

    #extraerMensajeError(status, text) {
        if (!text) {
            return this.#obtenerMensajeEstatus(status);
        }

        try {
            const error = JSON.parse(text);
            return error.error || error.message || error.msg || text;
        } catch {
            return text || this.#obtenerMensajeEstatus(status);
        }
    }

    #obtenerMensajeEstatus(status) {
        const mensajes = {
            400: "Solicitud inválida",
            403: "Acceso denegado",
            404: "Recurso no encontrado",
            409: "Conflicto",
            500: "Error interno del servidor",
            503: "Servicio no disponible"
        };

        return mensajes[status] || `Error ${status}`;
    }
}

export const postNotificaciones = new PostNotificaciones();