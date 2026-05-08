package com.grupo4.frances.persistence;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="INVITACIONES", schema="frances")
public class Invitacion implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="ID_INVITACION", precision = 10)
    private Long idInvitacion;

    @Column(name="ID_GRUPO", nullable = false)
    private Long idGrupo;

    @Column(name="ID_ALUMNO", nullable = false)
    private Long idAlumno;

    @Column(name="ID_PROFESOR", nullable = false)
    private Long idProfesor;

    @Column(name="ESTADO", length = 20, nullable = false)
    @Enumerated(EnumType.STRING)
    private EstadoInvitacion estado;

    @Column(name="FECHA_ENVIO", nullable = false)
    private LocalDateTime fechaEnvio;

    @Column(name="FECHA_RESPUESTA")
    private LocalDateTime fechaRespuesta;

    public enum EstadoInvitacion {
        PENDIENTE,
        ACEPTADA,
        RECHAZADA
    }

    public Invitacion(Long idGrupo1, Long idAlumno1, Long idProfesor1, EstadoInvitacion estado1, LocalDateTime fechaEnvio1, LocalDateTime fechaRespuesta1) {
    }

    public Invitacion(Long idInvitacion, Long idGrupo, Long idAlumno, Long idProfesor,
                     EstadoInvitacion estado, LocalDateTime fechaEnvio, LocalDateTime fechaRespuesta) {
        this.idInvitacion = idInvitacion;
        this.idGrupo = idGrupo;
        this.idAlumno = idAlumno;
        this.idProfesor = idProfesor;
        this.estado = estado;
        this.fechaEnvio = fechaEnvio;
        this.fechaRespuesta = fechaRespuesta;
    }

    // Getters y Setters
    public Long getIdInvitacion() {
        return idInvitacion;
    }

    public void setIdInvitacion(Long idInvitacion) {
        this.idInvitacion = idInvitacion;
    }

    public Long getIdGrupo() {
        return idGrupo;
    }

    public void setIdGrupo(Long idGrupo) {
        this.idGrupo = idGrupo;
    }

    public Long getIdAlumno() {
        return idAlumno;
    }

    public void setIdAlumno(Long idAlumno) {
        this.idAlumno = idAlumno;
    }

    public Long getIdProfesor() {
        return idProfesor;
    }

    public void setIdProfesor(Long idProfesor) {
        this.idProfesor = idProfesor;
    }

    public EstadoInvitacion getEstado() {
        return estado;
    }

    public void setEstado(EstadoInvitacion estado) {
        this.estado = estado;
    }

    public LocalDateTime getFechaEnvio() {
        return fechaEnvio;
    }

    public void setFechaEnvio(LocalDateTime fechaEnvio) {
        this.fechaEnvio = fechaEnvio;
    }

    public LocalDateTime getFechaRespuesta() {
        return fechaRespuesta;
    }

    public void setFechaRespuesta(LocalDateTime fechaRespuesta) {
        this.fechaRespuesta = fechaRespuesta;
    }
}