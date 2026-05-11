import { postLogin } from './REST/POST/postInicioSesion.js';

async function ejecutarLogin() {
    const exito = await doLogin();
    if (exito) {
        entrarApp();
    }
}

async function doLogin() {
    const response = await postLogin();
    if (response && response !== false) {
        // Guardar nombre y datos del usuario devueltos por la API
        const sessionData = {
            id_sesion: response.id_sesion,
            nombre: response.nombre || response.name || '',
            apellidos: response.apellidos || '',
            rol: response.rol || response.role || 'alumno',
            correo: response.correo || response.email || '',
            id_user : response.id,
            id_grupo : response.id_grupo,
        };
        if (document.getElementById('remember-me').checked) {
            localStorage.setItem('lf_session_api', JSON.stringify(sessionData));
        } else {
            sessionStorage.setItem('lf_session_api', JSON.stringify(sessionData));
        }
        entrarApp();
    } else {
        const modal = document.getElementById('login-error');
        modal.classList.remove('d-none');
        modal.innerHTML = 'Credenciales incorrectas';
    }
}

function entrarApp() {
    window.location.replace('../html/index.html');
}

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.btn-login');
    console.log("Botón encontrado:", btn);
    if (btn) {
        btn.onclick = ejecutarLogin;
    }
    const passInput = document.getElementById('login-password');
    if (passInput) {
        passInput.onkeydown = (e) => {
            if (e.key === 'Enter') ejecutarLogin();
        };
    }
    
});
