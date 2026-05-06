package com.grupo4.frances.utilidades;

import static com.grupo4.frances.utilidades.Numericas.*;

public class Seguridad {
    public static String generarClaveGrupo() {
        StringBuilder clave = new StringBuilder();
        for(int i = 0; i < 4; i++){
            clave.append((char) generarNumAleatorio(65, 90));
        }
        clave.append('-');
        for(int i = 0; i < 4; i++){
            clave.append(generarNumAleatorio(0, 9));
        }

        return clave.toString();
    }
}
