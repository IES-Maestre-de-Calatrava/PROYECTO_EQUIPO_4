package com.example.demo.Exceptions;

public class AlumnoNotFoundException extends RuntimeException {

    public AlumnoNotFoundException(Long id) {
        super("Could not find alumno " + id);
    }
}