const API_GRUPOS = "http://192.168.150.118:8085/api/grupos";
const API_ALUMNOS = "http://192.168.150.118:8085/alumno";

import { getAllAlumnos, getAlumnoById } from '../GET/getAlumnos.js';

export class PutGestionGrupos {
    async crearGrupo(datosGrupo, usuarioActual = this.#getUsuarioActual()) {
        this.#validarProfesor(usuarioActual);

        const grupo = this.#normalizarGrupo(datosGrupo, usuarioActual);
        return await this.#postJson(API_GRUPOS, grupo);
    }

    async obtenerListaAlumnos() {
        return await getAllAlumnos();
    }

    async añadirAlumnoAGrupo(idGrupo, idAlumno, usuarioActual = this.#getUsuarioActual()) {
        this.#validarProfesor(usuarioActual);

        if (!idGrupo || !idAlumno) {
            throw new Error("idGrupo e idAlumno son requeridos");
        }

        return await this.#asignarGrupoAlAlumno(idGrupo, idAlumno);
    }

    async enviarInvitacion(idAlumno, idGrupo, usuarioActual = this.#getUsuarioActual()) {
        this.#validarProfesor(usuarioActual);

        const url = `${API_GRUPOS}/${idGrupo}/alumnos/${idAlumno}/invitacion`;
        const datos = { idAlumno: Number(idAlumno), idGrupo: Number(idGrupo) };

        return await this.#putJson(url, datos);
    }

    esProfesor(usuarioActual = this.#getUsuarioActual()) {
        const rol = usuarioActual?.rol || usuarioActual?.role;
        return rol?.toLowerCase() === "profesor";
    }

    #normalizarGrupo(datosGrupo, usuarioActual) {
        const idProfesor = datosGrupo.idProfesor || usuarioActual?.idProfesor || usuarioActual?.id || usuarioActual?.id_user;

        const grupo = {
            idGrupo: Number(datosGrupo.idGrupo),
            nombre: datosGrupo.nombre?.trim(),
            idCentro: Number(datosGrupo.idCentro),
            idProfesor: Number(idProfesor),
            codigo: datosGrupo.codigo || null
        };

        this.#validarGrupo(grupo);
        return grupo;
    }

    #validarGrupo(grupo) {
        const camposVacios = [];

        if (!grupo.idGrupo) camposVacios.push("idGrupo");
        if (!grupo.nombre) camposVacios.push("nombre");
        if (!grupo.idCentro) camposVacios.push("idCentro");
        if (!grupo.idProfesor) camposVacios.push("idProfesor");

        if (camposVacios.length > 0) {
            throw new Error(`Faltan campos obligatorios para crear el grupo: ${camposVacios.join(", ")}`);
        }
    }

    #validarProfesor(usuarioActual) {
        if (!this.esProfesor(usuarioActual)) {
            throw new Error("No tienes permisos para crear grupos. Solo un profesor puede hacerlo.");
        }
    }

    async #asignarGrupoAlAlumno(idGrupo, idAlumno) {
        const alumno = await getAlumnoById(idAlumno);
        const idGrupoNumero = Number(idGrupo);
        const idAlumnoNumero = Number(idAlumno);

        const datos = {
            ...alumno,
            idAlumno: alumno.idAlumno ?? idAlumnoNumero,
            idGrupo: idGrupoNumero,
            id_grupo: idGrupoNumero
        };

        if (alumno.grupo) {
            datos.grupo = {
                ...alumno.grupo,
                idGrupo: idGrupoNumero
            };
        }

        return await this.#putJson(`${API_ALUMNOS}/${idAlumnoNumero}`, datos);
    }

    #getUsuarioActual() {
        const clavesSesion = ["usuario", "lf_session", "lf_session_api"];
        const almacenes = [sessionStorage, localStorage];

        for (const clave of clavesSesion) {
            for (const almacen of almacenes) {
                const raw = almacen.getItem(clave);

                if (raw) {
                    try {
                        const usuario = JSON.parse(raw);
                        const idProfesor = usuario.idProfesor ?? usuario.id_user ?? usuario.id;

                        return {
                            ...usuario,
                            id: usuario.id ?? idProfesor,
                            idProfesor,
                            rol: usuario.rol ?? usuario.role,
                            role: usuario.role ?? usuario.rol
                        };
                    } catch (error) {
                        console.error(`Error al leer la sesion ${clave}:`, error);
                    }
                }
            }
        }

        return null;
    }

    async #postJson(url, datos) {
        console.log("Enviando peticion POST grupo:", url, datos);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });

        const text = await response.text();

        if (!response.ok) {
            throw new Error(this.#crearMensajeError(response.status, text));
        }

        if (!text) {
            return { success: true };
        }

        try {
            return JSON.parse(text);
        } catch {
            return { success: true, rawResponse: text };
        }
    }

    async #putJson(url, datos) {
        console.log("Enviando peticion PUT grupo:", url, datos);

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });

        const text = await response.text();

        if (!response.ok) {
            throw new Error(this.#crearMensajeError(response.status, text));
        }

        if (!text) {
            return { success: true };
        }

        try {
            return JSON.parse(text);
        } catch {
            return { success: true, rawResponse: text };
        }
    }

    #crearMensajeError(status, text) {
        const detalle = this.#leerMensajeError(text);
        return detalle ? `Error ${status}: ${detalle}` : `Error ${status}`;
    }

    #leerMensajeError(text) {
        if (!text) {
            return "";
        }

        try {
            const error = JSON.parse(text);
            return error.error || error.message || text;
        } catch {
            return text;
        }
    }
}

export const gestionGruposPut = new PutGestionGrupos();
