const API_BASE = "http://192.168.150.185:8085/api";


// Crear Alumno
async function crearAlumno(datosAlumno) {
    const respuesta = await fetch(`${API_BASE}/alumnos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosAlumno)
    });
    return await respuesta.json();
}

// Borrar Alumno
async function borrarAlumno(id) {
    await fetch(`${API_BASE}/alumnos/${id}`, { method: 'DELETE' });
    console.log(`Alumno ${id} eliminado`);
}

// Crear Profesor
async function crearProfesor(datosProfesor) {
    const respuesta = await fetch(`${API_BASE}/profesores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosProfesor)
    });
    return await respuesta.json();
}

// Borrar Profesor
async function borrarProfesor(id) {
    await fetch(`${API_BASE}/profesores/${id}`, { method: 'DELETE' });
    console.log(`Profesor ${id} eliminado`);
}