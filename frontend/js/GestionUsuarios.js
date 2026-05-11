const API_BASE = "http://192.168.150.74:8085/api/admin"; // Ajusta esto a tu URL de servidor

// --- FUNCIONES PARA ALUMNOS ---

/**
 * Crea un nuevo alumno enviando un objeto Alumno al backend.
 * Requiere @PostMapping en AlumnoController.
 */
export async function crearAlumno(datosAlumno) {
    try {
        const response = await fetch(`${API_BASE}/alumno/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosAlumno)
        });
        if (!response.ok) throw new Error('Error al crear el alumno');
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

/**
 * Elimina un alumno por su ID.
 * Requiere @DeleteMapping("/delete/{id}") en AlumnoController.
 */
export async function eliminarAlumno(id) {
    try {
        const response = await fetch(`${API_BASE}/alumno/delete/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Error al eliminar el alumno');
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

// --- FUNCIONES PARA PROFESORES ---

/**
 * Crea un nuevo profesor enviando un objeto Profesor al backend.
 * Requiere @PostMapping en ProfesorController.
 */
export async function crearProfesor(datosProfesor) {
    try {
        const response = await fetch(`${API_BASE}/profesor/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosProfesor)
        });
        if (!response.ok) throw new Error('Error al crear el profesor');
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

/**
 * Elimina un profesor por su ID.
 * Requiere @DeleteMapping("/delete/{id}") en ProfesorController.
 */
export async function eliminarProfesor(id) {
    try {
        const response = await fetch(`${API_BASE}/profesor/delete/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Error al eliminar el profesor');
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}