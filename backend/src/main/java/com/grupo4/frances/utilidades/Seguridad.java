package com.grupo4.frances.utilidades;

import java.security.MessageDigest;
import java.util.UUID;

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

    public static String generarUUID(){
        return UUID.randomUUID().toString();
    }

    public static String sha256(final String base) {
        try{
            final MessageDigest digest = MessageDigest.getInstance("SHA-256");
            final byte[] hash = digest.digest(base.getBytes("UTF-8"));
            final StringBuilder hexString = new StringBuilder();
            for (int i = 0; i < hash.length; i++) {
                final String hex = Integer.toHexString(0xff & hash[i]);
                if(hex.length() == 1)
                    hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch(Exception ex){
            throw new RuntimeException(ex);
        }
    }
}
