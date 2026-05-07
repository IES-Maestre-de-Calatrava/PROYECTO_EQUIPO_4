const API_BASE = 'http://192.168.150.185:8085/api';


// Crear Alumno
async function crearAlumno(datosAlumno) {
    const respuesta = await fetch(`${urlBase}/alumnos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosAlumno)
    });
    return await respuesta.json();
}

// Borrar Alumno
async function borrarAlumno(id) {
    await fetch(`${urlBase}/alumnos/${id}`, { method: 'DELETE' });
    console.log(`Alumno ${id} eliminado`);
}

// Crear Profesor
async function crearProfesor(datosProfesor) {
    const respuesta = await fetch(`${urlBase}/profesores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosProfesor)
    });
    return await respuesta.json();
}

// Borrar Profesor
async function borrarProfesor(id) {
    await fetch(`${urlBase}/profesores/${id}`, { method: 'DELETE' });
    console.log(`Profesor ${id} eliminado`);
}