const API_ALUMNOS = "http://192.168.150.185:8085/alumno";
const API_GRUPOS = "http://192.168.150.185:8085/api/grupos";

export class PutAlumnos {
    /**
     * Añade un alumno a un grupo
     * @param {number} idGrupo - ID del grupo
     * @param {number} idAlumno - ID del alumno a añadir
     * @returns {Promise<any>} Respuesta del servidor
     */
    async añadirAlumnoAlGrupo(idGrupo, idAlumno) {
        if (!idGrupo || !idAlumno) {
            throw new Error("idGrupo e idAlumno son requeridos");
        }

        const url = `${API_GRUPOS}/${idGrupo}/alumnos/${idAlumno}`;
        const datos = { idAlumno: Number(idAlumno) };

        return await this.#putJson(url, datos, "Alumno añadido al grupo");
    }

    /**
     * Envía una invitación a un alumno para unirse a un grupo
     * @param {number} idGrupo - ID del grupo
     * @param {number} idAlumno - ID del alumno a invitar
     * @returns {Promise<any>} Respuesta del servidor
     */
    async enviarInvitacionAlumno(idGrupo, idAlumno) {
        if (!idGrupo || !idAlumno) {
            throw new Error("idGrupo e idAlumno son requeridos");
        }

        const url = `${API_GRUPOS}/${idGrupo}/alumnos/${idAlumno}/invitacion`;
        const datos = { 
            idGrupo: Number(idGrupo),
            idAlumno: Number(idAlumno),
            estado: "pendiente"
        };

        return await this.#putJson(url, datos, "Invitación enviada al alumno");
    }

    /**
     * Actualiza información de un alumno
     * @param {number} idAlumno - ID del alumno
     * @param {object} datosActualizados - Datos a actualizar
     * @returns {Promise<any>} Respuesta del servidor
     */
    async actualizarAlumno(idAlumno, datosActualizados) {
        if (!idAlumno || !datosActualizados) {
            throw new Error("idAlumno y datosActualizados son requeridos");
        }

        const url = `${API_ALUMNOS}/${idAlumno}`;
        const datos = {
            idAlumno: Number(idAlumno),
            ...datosActualizados
        };

        return await this.#putJson(url, datos, "Datos del alumno actualizados");
    }

    /**
     * Elimina un alumno de un grupo
     * @param {number} idGrupo - ID del grupo
     * @param {number} idAlumno - ID del alumno a eliminar
     * @returns {Promise<any>} Respuesta del servidor
     */
    async eliminarAlumnoDelGrupo(idGrupo, idAlumno) {
        if (!idGrupo || !idAlumno) {
            throw new Error("idGrupo e idAlumno son requeridos");
        }

        const url = `${API_GRUPOS}/${idGrupo}/alumnos/${idAlumno}`;
        
        return await this.#deleteJson(url, "Alumno eliminado del grupo");
    }

    /**
     * Acepta la invitación de un alumno a un grupo
     * @param {number} idGrupo - ID del grupo
     * @param {number} idAlumno - ID del alumno
     * @returns {Promise<any>} Respuesta del servidor
     */
    async aceptarInvitacion(idGrupo, idAlumno) {
        if (!idGrupo || !idAlumno) {
            throw new Error("idGrupo e idAlumno son requeridos");
        }

        const url = `${API_GRUPOS}/${idGrupo}/alumnos/${idAlumno}/invitacion`;
        const datos = { 
            idGrupo: Number(idGrupo),
            idAlumno: Number(idAlumno),
            estado: "aceptada"
        };

        return await this.#putJson(url, datos, "Invitación aceptada");
    }

    /**
     * Rechaza la invitación de un alumno a un grupo
     * @param {number} idGrupo - ID del grupo
     * @param {number} idAlumno - ID del alumno
     * @returns {Promise<any>} Respuesta del servidor
     */
    async rechazarInvitacion(idGrupo, idAlumno) {
        if (!idGrupo || !idAlumno) {
            throw new Error("idGrupo e idAlumno son requeridos");
        }

        const url = `${API_GRUPOS}/${idGrupo}/alumnos/${idAlumno}/invitacion`;
        const datos = { 
            idGrupo: Number(idGrupo),
            idAlumno: Number(idAlumno),
            estado: "rechazada"
        };

        return await this.#putJson(url, datos, "Invitación rechazada");
    }

    // ═══════════════════════════════════════════════════════════════
    // MÉTODOS PRIVADOS
    // ═══════════════════════════════════════════════════════════════

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

    async #deleteJson(url, mensajeExito = "Operación completada") {
        console.log(`🗑️ DELETE ${url}`);

        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
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
            console.error(`❌ Error en DELETE:`, error);
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
            409: "Conflicto (el alumno ya está en el grupo)",
            500: "Error interno del servidor",
            503: "Servicio no disponible"
        };

        return mensajes[status] || `Error ${status}`;
    }
}

export const putAlumnos = new PutAlumnos();
