package com.example.demo.persistence;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name="Actividad")
public class Actividad implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="Id_Actividad", precision = 10)
    private Long idActividad;

    @Column(name="Nombre", length = 50, nullable = false)
    private String nombre;

    @Column(name="Dificultad", length = 64, nullable = false)
    private String dificultad;

    @Column(name="Id_Profesor", length = 20, nullable = false)
    private String idProfesor; // Esta puede ser FK en el futuro

    @Column(name="Duracion")
    private LocalDate duracion;

    @Column(name="FECHA_INICIO", nullable = false)
    private LocalDateTime fechaInicio;

    @Column(name="FECHA_FIN")
    private LocalDateTime fechaFin;

    @Column(name="FECHA_ENTREGA", nullable = false)
    private LocalDateTime fechaEntrega;


    public Actividad() {
    }


    public Actividad(Long idActividad, String nombre, String dificultad, String idProfesor,
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