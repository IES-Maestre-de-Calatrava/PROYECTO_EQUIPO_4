package com.grupo4.frances.DTO;

import java.time.LocalDateTime;

import com.grupo4.frances.persistence.Invitacion.EstadoInvitacion;

import jakarta.validation.constraints.NotNull;

public class InvitacionDTO {

    private Long idInvitacion;

    @NotNull
    private Long idGrupo;

    @NotNull
    private Long idAlumno;

    @NotNull
    private Long idProfesor;

    @NotNull
    private EstadoInvitacion estado;

    @NotNull
    private LocalDateTime fechaEnvio;

    private LocalDateTime fechaRespuesta;

    // Constructor vacío
    public InvitacionDTO() {
    }

    // Constructor completo
    public InvitacionDTO(Long idInvitacion, Long idGrupo, Long idAlumno, Long idProfesor,
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