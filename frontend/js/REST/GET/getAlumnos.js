const API = "http://192.168.150.118:8085/alumno";

export async function getAllAlumnos(){
    const response = await fetch(`${API}/find`);
    const alumnos = await response.json();

    return alumnos;
}

export async function getAlumnoById(id){
    const response = await fetch(`${API}/find/${id}`);
    const alumno = await response.json();

    return alumno;
}

export async function renderAlumnos(){
    const alumnos = await getAllAlumnos();
    const alumnosList = document.getElementById('students-list');
    alumnosList.innerHTML = '';

    if (!alumnos || alumnos.length === 0) {
        alumnosList.innerHTML = '<p>No se encontraron alumnos.</p>';
        return;
    }

    // Crear tabla
    const columns = Object.keys(alumnos[0] || {});
    const header = columns.map(col => `<th>${col}</th>`).join('');
    const rows = alumnos.map(alumno => {
        const cells = columns.map(col => `<td>${alumno[col] !== null && alumno[col] !== undefined ? alumno[col] : '-'}</td>`).join('');
        return `<tr>${cells}</tr>`;
    }).join('');

    alumnosList.innerHTML = `
        <table class="result-table">
            <thead><tr>${header}</tr></thead>
            <tbody>${rows}</tbody>
        </table>
    `;
}

document.addEventListener("DOMContentLoaded", renderAlumnos);