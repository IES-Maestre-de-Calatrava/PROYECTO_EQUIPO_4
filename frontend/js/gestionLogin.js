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
        alert(JSON.stringify(response));
        if (document.getElementById('remember-me').checked) {
            // localStorage.setItem('usuario', JSON.stringify(response.idsesion));
        } else {
            // sessionStorage.setItem('usuario', JSON.stringify(response.nombre));
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