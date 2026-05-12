package com.grupo4.frances.Exceptions;

public class ProfesorNotFoundException extends RuntimeException {

    public ProfesorNotFoundException(Long id) {
        super("Could not find profesor " + id);
    }
}