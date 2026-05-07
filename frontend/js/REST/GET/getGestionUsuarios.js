const API_ALUMNOS = "http://192.168.150.185:8085/alumno";
const API_PROFESORES = "http://192.168.150.185:8085/profesor";

export class GetGestionUsuarios {
    async getAlumnos() {
        const alumnos = await this.#getJson(`${API_ALUMNOS}/find`);
        return alumnos.map((alumno) => ({
            ...alumno,
            tipoUsuario: "alumno"
        }));
    }

    async getProfesores() {
        const profesores = await this.#getJson(`${API_PROFESORES}/find`);
        return profesores.map((profesor) => ({
            ...profesor,
            tipoUsuario: "profesor"
        }));
    }

    async getUsuarios() {
        const [alumnos, profesores] = await Promise.all([
            this.getAlumnos(),
            this.getProfesores()
        ]);

        return [...alumnos, ...profesores];
    }

    async getAlumnoById(id) {
        const alumno = await this.#getJson(`${API_ALUMNOS}/find/${id}`);
        return {
            ...alumno,
            tipoUsuario: "alumno"
        };
    }

    async getProfesorById(id) {
        const profesor = await this.#getJson(`${API_PROFESORES}/find/${id}`);
        return {
            ...profesor,
            tipoUsuario: "profesor"
        };
    }

    async getUsuarioById(id, tipoUsuario) {
        if (tipoUsuario === "alumno") {
            return await this.getAlumnoById(id);
        }

        if (tipoUsuario === "profesor") {
            return await this.getProfesorById(id);
        }

        throw new Error("Tipo de usuario no valido");
    }

    async #getJson(url) {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error en la peticion GET: ${response.status}`);
        }

        return await response.json();
    }
}

export const gestionUsuariosGet = new GetGestionUsuarios();
