package com.grupo4.frances.JSON;

public class Preguntas {
    private int idPregunta;
    private String contenidoPregunta;
    private String respuesta;

    public Preguntas() {
    }

    public Preguntas(int idPregunta, String contenidoPregunta, String respuesta) {
        this.idPregunta = idPregunta;
        this.contenidoPregunta = contenidoPregunta;
        this.respuesta = respuesta;
    }

    public int getIdPregunta() {
        return idPregunta;
    }

    public void setIdPregunta(int idPregunta) {
        this.idPregunta = idPregunta;
    }

    public String getContenidoPregunta() {
        return contenidoPregunta;
    }

    public void setContenidoPregunta(String contenidoPregunta) {
        this.contenidoPregunta = contenidoPregunta;
    }

    public String getRespuesta() {
        return respuesta;
    }

    public void setRespuesta(String respuesta) {
        this.respuesta = respuesta;
    }
}
