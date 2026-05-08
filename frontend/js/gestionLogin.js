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
<<<<<<< Updated upstream
        alert(JSON.stringify(response));
        if (document.getElementById('remember-me').checked) {
            localStorage.setItem('idSesion', JSON.stringify(response.id_sesion));
        } else {
            sessionStorage.setItem('idSesion', JSON.stringify(response.id_sesion));
=======
        // Guardar nombre y datos del usuario devueltos por la API
        const sessionData = {
            id_sesion: response.id_sesion,
            nombre: response.nombre || response.name || '',
            apellidos: response.apellidos || '',
            rol: response.rol || response.role || 'alumno',
            correo: response.correo || response.email || ''
        };
        if (document.getElementById('remember-me').checked) {
            localStorage.setItem('lf_session_api', JSON.stringify(sessionData));
        } else {
            sessionStorage.setItem('lf_session_api', JSON.stringify(sessionData));
>>>>>>> Stashed changes
        }
        entrarApp();
    } else {
        
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