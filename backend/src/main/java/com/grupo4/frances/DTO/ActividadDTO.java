package com.grupo4.frances.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ActividadDTO {

    private Long idActividad;

    @NotBlank
    @Size(max = 50)
    private String nombre;

    @NotBlank
    @Size(max = 64)
    private String dificultad;

    @NotBlank
    @Size(max = 20)
    private String idProfesor;

    private String duracion; // Admite NULL según la tabla

    @NotNull
    private String fechaInicio;

    private String fechaFin; // Admite NULL según la tabla

    @NotNull
    private String fechaEntrega;

    private String preguntas;

    private String respuestas;

    @NotBlank
    private int puntos;

    // Constructor vacío
    public ActividadDTO() {
    }

    // Constructor completo


    public ActividadDTO(Long idActividad, String nombre, String dificultad, String idProfesor, String duracion, String fechaInicio, String fechaFin, String fechaEntrega, String preguntas, String respuestas, int puntos) {
        this.idActividad = idActividad;
        this.nombre = nombre;
        this.dificultad = dificultad;
        this.idProfesor = idProfesor;
        this.duracion = duracion;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.fechaEntrega = fechaEntrega;
        this.preguntas = preguntas;
        this.respuestas = respuestas;
        this.puntos = puntos;
    }

    // Getters y Setters
    public Long getIdActividad() {
        return idActividad;
    }

    public void setIdActividad(Long idActividad) {
        this.idActividad = idActividad;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDificultad() {
        return dificultad;
    }

    public void setDificultad(String dificultad) {
        this.dificultad = dificultad;
    }

    public String getIdProfesor() {
        return idProfesor;
    }

    public void setIdProfesor(String idProfesor) {
        this.idProfesor = idProfesor;
    }

    public String getDuracion() {
        return duracion;
    }

    public void setDuracion(String duracion) {
        this.duracion = duracion;
    }

    public String getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(String fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public String getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(String fechaFin) {
        this.fechaFin = fechaFin;
    }

    public String getFechaEntrega() {
        return fechaEntrega;
    }

    public void setFechaEntrega(String fechaEntrega) {
        this.fechaEntrega = fechaEntrega;
    }

    public String getPreguntas() {
        return preguntas;
    }

    public void setPreguntas(String preguntas) {
        this.preguntas = preguntas;
    }

    public String getRespuestas() {
        return respuestas;
    }

    public void setRespuestas(String respuestas) {
        this.respuestas = respuestas;
    }

    public int getPuntos() {
        return puntos;
    }

    public void setPuntos(int puntos) {
        this.puntos = puntos;
    }
}