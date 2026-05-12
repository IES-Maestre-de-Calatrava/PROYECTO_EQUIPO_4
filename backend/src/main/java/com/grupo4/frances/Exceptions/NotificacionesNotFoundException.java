package com.grupo4.frances.Exceptions;

public class NotificacionesNotFoundException extends RuntimeException {

    public NotificacionesNotFoundException(Long id) {
        super("Could not find notificacion " + id);
    }
}
