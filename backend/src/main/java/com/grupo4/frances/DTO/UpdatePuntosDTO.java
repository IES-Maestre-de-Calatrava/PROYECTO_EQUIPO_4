package com.grupo4.frances.DTO;

public class UpdatePuntosDTO {
    private Integer idAlumno;
    private Integer puntos;

    public UpdatePuntosDTO(){

    }

    public UpdatePuntosDTO(Integer idAlumno, Integer puntos) {
        this.idAlumno = idAlumno;
        this.puntos = puntos;
    }

    public Integer getIdAlumno() {
        return idAlumno;
    }

    public void setIdAlumno(Integer idAlumno) {
        this.idAlumno = idAlumno;
    }

    public Integer getPuntos() {
        return puntos;
    }

    public void setPuntos(Integer puntos) {
        this.puntos = puntos;
    }
}
