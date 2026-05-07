const API_NOTIFICACIONES = "http://192.168.150.185:8085/api/notificaciones";
const API_INVITACIONES = "http://192.168.150.185:8085/api/invitaciones";
const API_GRUPOS = "http://192.168.150.185:8085/api/grupos";

export class GetNotificaciones {
    /**
     * Obtiene todas las notificaciones de un usuario
     * @param {number} idUsuario - ID del usuario
     * @param {boolean} soloNoLeidas - Si true, solo devuelve notificaciones no leídas
     * @returns {Promise<Array>} Lista de notificaciones
     */
    async obtenerNotificacionesUsuario(idUsuario, soloNoLeidas = false) {
        if (!idUsuario) {
            throw new Error("idUsuario es requerido");
        }

        const url = `${API_NOTIFICACIONES}/usuario/${idUsuario}${soloNoLeidas ? '?leidas=false' : ''}`;
        return await this.#getJson(url);
    }

    /**
     * Obtiene invitaciones pendientes de un alumno
     * @param {number} idAlumno - ID del alumno
     * @returns {Promise<Array>} Lista de invitaciones pendientes
     */
    async obtenerInvitacionesPendientes(idAlumno) {
        if (!idAlumno) {
            throw new Error("idAlumno es requerido");
        }

        const url = `${API_INVITACIONES}/alumno/${idAlumno}/pendientes`;
        return await this.#getJson(url);
    }

    /**
     * Obtiene los grupos de un alumno (cursos matriculados)
     * @param {number} idAlumno - ID del alumno
     * @returns {Promise<Array>} Lista de grupos del alumno
     */
    async obtenerGruposAlumno(idAlumno) {
        if (!idAlumno) {
            throw new Error("idAlumno es requerido");
        }

        const url = `${API_GRUPOS}/alumno/${idAlumno}`;
        return await this.#getJson(url);
    }

    /**
     * Marca una notificación como leída
     * @param {number} idNotificacion - ID de la notificación
     * @returns {Promise<any>} Respuesta del servidor
     */
    async marcarNotificacionLeida(idNotificacion) {
        if (!idNotificacion) {
            throw new Error("idNotificacion es requerido");
        }

        const url = `${API_NOTIFICACIONES}/${idNotificacion}/leida`;
        return await this.#putJson(url, { leida: true }, "Notificación marcada como leída");
    }

    // ═══════════════════════════════════════════════════════════════
    // MÉTODOS PRIVADOS
    // ═══════════════════════════════════════════════════════════════

    async #getJson(url) {
        console.log(`📥 GET ${url}`);

        try {
            const response = await fetch(url);

            if (!response.ok) {
                const errorMsg = this.#extraerMensajeError(response.status, await response.text());
                throw new Error(`${response.status}: ${errorMsg}`);
            }

            const text = await response.text();

            if (!text) {
                console.log(`✅ GET completado (sin contenido)`);
                return [];
            }

            try {
                const resultado = JSON.parse(text);
                console.log(`✅ GET completado`, resultado);
                return Array.isArray(resultado) ? resultado : [resultado];
            } catch {
                console.warn(`⚠️ Respuesta no es JSON válido:`, text);
                return [];
            }
        } catch (error) {
            console.error(`❌ Error en GET:`, error);
            throw error;
        }
    }

    async #putJson(url, datos, mensajeExito = "Operación completada") {
        console.log(`📤 PUT ${url}`, datos);

        try {
            const response = await fetch(url, {
                method: "PUT",
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
            console.error(`❌ Error en PUT:`, error);
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

export const getNotificaciones = new GetNotificaciones();