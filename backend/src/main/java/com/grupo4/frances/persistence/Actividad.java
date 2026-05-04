package com.grupo4.frances.persistence;

import jakarta.persistence.*;

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
    private String duracion;

    @Column(name="FECHA_INICIO", nullable = false)
    private String fechaInicio;

    @Column(name="FECHA_FIN")
    private String fechaFin;

    @Column(name="FECHA_ENTREGA", nullable = false)
    private String fechaEntrega;


    public Actividad() {
    }


    public Actividad(Long idActividad, String nombre, String dificultad, String idProfesor,
                     String duracion, String fechaInicio, String fechaFin,
                     String fechaEntrega) {
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
}