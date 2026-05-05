package com.grupo4.frances.Exceptions;

public class CentroNotFoundException extends RuntimeException {

    public CentroNotFoundException(Long id) {
        super("Could not find centro with ID " + id);
    }

    public CentroNotFoundException(String nombre){
        super("Could not find centro with nombre " + nombre);
    }
}