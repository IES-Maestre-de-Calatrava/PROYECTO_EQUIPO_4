const API = 'http://192.168.150.74:8085/api/auth';
import { sha256 } from '../../Utilidades.js';

export async function postLogin() {
    const clave = await sha256(document.getElementById('login-password').value);
    let datosDevueltos = {};
    const datos = {
        'correo': document.getElementById('login-email').value,
        'contrasena': clave
    }
    const datosAdicionales = {
        headers: { 'content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(datos),
        method: 'POST',
        mode: 'cors'
    };

    try {
        const respuesta = await fetch(`${API}/login`, datosAdicionales);
        if(respuesta.status == 401){
            return false;
        }
        if (!respuesta.ok) {
            console.error('No se ha podido conectar con la base de datos: ' + respuesta.statusText);
        }

        const datosDevueltos = await respuesta.json();
        return datosDevueltos;
    } catch (e) {
        alert(e.message);
        return false;
    }
}