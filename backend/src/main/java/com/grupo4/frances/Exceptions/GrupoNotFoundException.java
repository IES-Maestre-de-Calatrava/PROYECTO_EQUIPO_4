package com.example.demo.Exceptions;

public class GrupoNotFoundException extends RuntimeException {
    public GrupoNotFoundException(Long id) {
        super("Could not find persona " + id);
    }
}
