const API_ALUMNOS = "http://192.168.150.74:8085/api/admin/alumnos";
const API_PROFESORES = "http://192.168.150.74:8085/api/admin/profesores";

export class PutGestionUsuarios {
    async crearAlumno(datosAlumno, usuarioActual = this.#getUsuarioActual()) {
        this.#validarDirector(usuarioActual);

        return await this.#putJson(`${API_ALUMNOS}`, {
            ...datosAlumno,
            rol: "ALUMNO"
        });
    }

    async crearProfesor(datosProfesor, usuarioActual = this.#getUsuarioActual()) {
        this.#validarDirector(usuarioActual);

        return await this.#putJson(`${API_PROFESORES}`, {
            ...datosProfesor,
            rol: "PROFESOR"
        });
    }

    async crearUsuario(datosUsuario, tipoUsuario, usuarioActual = this.#getUsuarioActual()) {
        const tipo = tipoUsuario.toLowerCase();

        if (tipo === "alumno") {
            return await this.crearAlumno(datosUsuario, usuarioActual);
        }

        if (tipo === "profesor") {
            return await this.crearProfesor(datosUsuario, usuarioActual);
        }

        throw new Error("Solo se pueden crear usuarios de tipo alumno o profesor");
    }

    esDirector(usuarioActual = this.#getUsuarioActual()) {
        const rol = usuarioActual?.rol || usuarioActual?.role;
        return rol?.toLowerCase() === "director";
    }

    #validarDirector(usuarioActual) {
        if (!this.esDirector(usuarioActual)) {
            throw new Error("No tienes permisos para crear usuarios. Solo el director puede hacerlo.");
        }
    }

    #getUsuarioActual() {
        const clavesSesion = ["usuario", "lf_session"];
        const usuariosEncontrados = [];

        for (const clave of clavesSesion) {
            const raw = localStorage.getItem(clave) || sessionStorage.getItem(clave);

            if (raw) {
                try {
                    usuariosEncontrados.push(JSON.parse(raw));
                } catch (error) {
                    console.error(`Error al leer la sesion ${clave}:`, error);
                }
            }
        }

        return usuariosEncontrados.find((usuario) => this.esDirector(usuario)) || usuariosEncontrados[0] || null;
    }

    async #putJson(url, datos) {
        console.log("Enviando peticion POST:", url, datos);

        const response = await fetch(`${url}?idDirector=1`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });

        if (!response.ok) {
            throw new Error(`Error al crear el usuario: ${response.status}`);
        }

        const text = await response.text();

        if (!text) {
            return true;
        }

        return JSON.parse(text);
    }
}

export const gestionUsuariosPut = new PutGestionUsuarios();
