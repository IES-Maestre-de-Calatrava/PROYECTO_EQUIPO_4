package com.grupo4.frances.Exceptions;

public class InvitacionNotFoundException extends RuntimeException {

    public InvitacionNotFoundException(Long id) {
        super("Could not find invitacion " + id);
    }
}