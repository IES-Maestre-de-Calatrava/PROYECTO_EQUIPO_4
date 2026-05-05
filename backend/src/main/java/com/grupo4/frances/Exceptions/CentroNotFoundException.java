package com.grupo4.frances.Exceptions;

public class CentroNotFoundException extends RuntimeException {

    public CentroNotFoundException(Long id, String localidad) {
        super("Could not find centro with ID " + id + " in locality " + localidad);
    }
}