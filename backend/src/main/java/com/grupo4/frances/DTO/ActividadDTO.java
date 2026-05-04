package com.example.demo.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalDateTime;

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

    private LocalDate duracion; // Admite NULL según la tabla

    @NotNull
    private LocalDateTime fechaInicio;

    private LocalDateTime fechaFin; // Admite NULL según la tabla

    @NotNull
    private LocalDateTime fechaEntrega;

    // Constructor vacío
    public ActividadDTO() {
    }

    // Constructor completo
    public ActividadDTO(Long idActividad, String nombre, String dificultad, String idProfesor,
                        LocalDate duracion, LocalDateTime fechaInicio, LocalDateTime fechaFin,
                        LocalDateTime fechaEntrega) {
        this.idActividad = idActividad;
        this.nombre = nombre;
        this.dificultad = dificultad;
        this.idProfesor = idProfesor;
        this.duracion = duracion;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.fechaEntrega = fechaEntrega;
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

    public LocalDate getDuracion() {
        return duracion;
    }

    public void setDuracion(LocalDate duracion) {
        this.duracion = duracion;
    }

    public LocalDateTime getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDateTime fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDateTime getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDateTime fechaFin) {
        this.fechaFin = fechaFin;
    }

    public LocalDateTime getFechaEntrega() {
        return fechaEntrega;
    }

    public void setFechaEntrega(LocalDateTime fechaEntrega) {
        this.fechaEntrega = fechaEntrega;
    }
}