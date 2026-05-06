package com.grupo4.frances.DTO;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class GrupoDTO{

    @Id
    private Long idGrupo;

    @NotNull
    @Size(max=50)
    private String nombre;

    @NotNull
    private Long idCentro;

    @NotNull
    private Long idProfesor;

    private String codigo;

    public GrupoDTO() {
    }

    public GrupoDTO(Long idCentro, Long idGrupo, Long idProfesor, String nombre) {
        this.idCentro = idCentro;
        this.idGrupo = idGrupo;
        this.idProfesor = idProfesor;
        this.nombre = nombre;
    }

    public Long getIdGrupo() {
        return idGrupo;
    }

    public String getNombre() {
        return nombre;
    }

    public Long getIdCentro() {
        return idCentro;
    }

    public Long getIdProfesor() {
        return idProfesor;
    }

    public void setIdGrupo(Long idGrupo) {
        this.idGrupo = idGrupo;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setIdCentro(Long idCentro) {
        this.idCentro = idCentro;
    }

    public void setIdProfesor(Long idProfesor) {
        this.idProfesor = idProfesor;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }



}