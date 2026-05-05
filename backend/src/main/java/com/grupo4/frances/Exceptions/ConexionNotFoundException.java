package com.example.demo.Exceptions;

public class ConexionNotFoundException extends RuntimeException {

    public ConexionNotFoundException(Long id) {
        super("Could not find conexion for alumno " + id);
    }
}