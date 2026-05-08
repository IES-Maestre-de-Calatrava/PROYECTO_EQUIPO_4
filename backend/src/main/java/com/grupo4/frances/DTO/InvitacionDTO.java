package com.grupo4.frances.DTO;

import java.time.LocalDateTime;

import com.grupo4.frances.persistence.Invitacion.EstadoInvitacion;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class InvitacionDTO {

    private Long idInvitacion;

    @NotNull
    private Long idGrupo;

    @NotBlank
    @Size(max = 20)
    private String idAlumno;

    @NotBlank
    @Size(max = 20)
    private String idProfesor;

    @NotNull
    private EstadoInvitacion estado;

    @NotNull
    private LocalDateTime fechaEnvio;

    private LocalDateTime fechaRespuesta;

    // Constructor vacío
    public InvitacionDTO() {
    }

    // Constructor completo
    public InvitacionDTO(Long idInvitacion, Long idGrupo, String idAlumno, String idProfesor,
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

    public String getIdAlumno() {
        return idAlumno;
    }

    public void setIdAlumno(String idAlumno) {
        this.idAlumno = idAlumno;
    }

    public String getIdProfesor() {
        return idProfesor;
    }

    public void setIdProfesor(String idProfesor) {
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