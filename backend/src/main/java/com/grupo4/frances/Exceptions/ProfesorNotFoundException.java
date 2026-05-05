package com.example.demo.Exceptions;

public class ProfesorNotFoundException extends RuntimeException {

    public ProfesorNotFoundException(Long id) {
        super("Could not find profesor " + id);
    }
}