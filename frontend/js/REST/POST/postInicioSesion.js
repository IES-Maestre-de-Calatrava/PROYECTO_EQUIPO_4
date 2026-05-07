const API = 'http://192.168.150.185:8085/api/auth';
import {sha256} from '../../Utilidades.js';

export async function postLogin(){
    const clave = await sha256(document.getElementById('login-password').value);
    let datosDevueltos = {};
    const datos = {
        'correo' : document.getElementById('login-email').value,
        'contrasena' : clave
    }
    const datosAdicionales = {
        headers: {'content-type' : 'application/json; charset=UTF-8'},
        body: JSON.stringify(datos),
        method: 'POST',
        mode: 'cors'
    }
    await fetch(`${API}/login`, datosAdicionales).then(function(respuesta) {
            if(respuesta.ok) {
                return respuesta.json();
            } else {
                throw new Error('No se ha podido conectar con la base de datos' + respuesta.statusText);
            }
        }).then(function(data){
            datosDevueltos = data;
        }).catch(function(e){
            alert(e.message);
        });
    if(datosDevueltos != null){
        return datosDevueltos
    } else {
        return false;
    }
}