package com.grupo4.frances.Exceptions;

public class ActividadNotFoundException extends RuntimeException {
    public ActividadNotFoundException(Long id) {
        super("Could not find actividad " + id);
    }
    public ActividadNotFoundException(Integer id) {
        super("Could not find actividad " + id);
    }
}
