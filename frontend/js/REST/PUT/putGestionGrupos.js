const API_GRUPOS = "http://192.168.150.74:8085/api/grupos";

import { getAllAlumnos } from '../GET/getAlumnos.js';

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

        const url = `${API_GRUPOS}/${idGrupo}/alumnos`;
        const datos = { idAlumno: Number(idAlumno) };

        return await this.#putJson(url, datos);
    }

    async eliminarAlumnoDeGrupo(idGrupo, idAlumno, usuarioActual = this.#getUsuarioActual()) {
        this.#validarProfesor(usuarioActual);

        const url = `${API_GRUPOS}/${idGrupo}/alumnos/${idAlumno}`;
        return await this.#deleteJson(url);
    }

    esProfesor(usuarioActual = this.#getUsuarioActual()) {
        const rol = usuarioActual?.rol || usuarioActual?.role;
        return rol?.toLowerCase() === "profesor";
    }

    #normalizarGrupo(datosGrupo, usuarioActual) {
        const idProfesor = datosGrupo.idProfesor || usuarioActual?.idProfesor || usuarioActual?.id;

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

    #getUsuarioActual() {
        const clavesSesion = ["usuario", "lf_session"];

        for (const clave of clavesSesion) {
            const raw = localStorage.getItem(clave) || sessionStorage.getItem(clave);

            if (raw) {
                try {
                    return JSON.parse(raw);
                } catch (error) {
                    console.error(`Error al leer la sesion ${clave}:`, error);
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
            return true;
        }

        return JSON.parse(text);
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
            return true;
        }

        return JSON.parse(text);
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

    async #deleteJson(url) {
        console.log("Enviando peticion DELETE grupo:", url);

        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const text = await response.text();

        if (!response.ok) {
            throw new Error(this.#crearMensajeError(response.status, text));
        }

        if (!text) {
            return true;
        }

        return JSON.parse(text);
    }
}

export const gestionGruposPut = new PutGestionGrupos();
