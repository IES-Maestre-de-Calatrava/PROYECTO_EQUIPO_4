package com.grupo4.frances.Utilidades;

public class Numericas {
    public static int generarNumAleatorio(int min, int max) {
        double f = Math.random()/Math.nextDown(1.0);
        double x = min*(1.0 - f) + max*f;

        return (int) x;
    }

}
