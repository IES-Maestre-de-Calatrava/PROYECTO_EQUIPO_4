package com.grupo4.frances.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class NotificacionesDTO {

    private Long idNotificacion;

    @NotNull
    private Long idAlumno;

    @NotBlank
    @Size(max = 100)
    private String titulo;

    @NotBlank
    private String mensaje;

    @Size(max = 20)
    private String codigo;

    // Constructor vacío
    public NotificacionesDTO() {
    }

    // Constructor completo
    public NotificacionesDTO(Long idNotificacion, Long idAlumno, String titulo, String mensaje, String codigo) {
        this.idNotificacion = idNotificacion;
        this.idAlumno = idAlumno;
        this.titulo = titulo;
        this.mensaje = mensaje;
        this.codigo = codigo;
    }

    // Getters y Setters
    public Long getIdNotificacion() {
        return idNotificacion;
    }

    public void setIdNotificacion(Long idNotificacion) {
        this.idNotificacion = idNotificacion;
    }

    public Long getIdAlumno() {
        return idAlumno;
    }

    public void setIdAlumno(Long idAlumno) {
        this.idAlumno = idAlumno;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }
}
