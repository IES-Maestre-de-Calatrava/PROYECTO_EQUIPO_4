package com.grupo4.frances.DTO;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import javax.annotation.processing.Generated;

public class ConexionDTO{

	private Long idConexion;

    @NotNull
	private Long idAlumno;
	
	@NotBlank
    @NotNull
	private String entrada;
	
    private String salida;

	private String id_sesion;

	public ConexionDTO(){

	}

    public ConexionDTO(Long idConexion, Long idAlumno, String entrada, String salida, String id_sesion){
		this.idConexion = idConexion;
        this.idAlumno=idAlumno;
        this.entrada=entrada;
        this.salida=salida;
		this.id_sesion = id_sesion;
    }

	public Long getIdConexion() {
		return idConexion;
	}

	public void setIdConexion(long idConexion) {
		this.idConexion = idConexion;
	}

	public Long getIdAlumno() {
		return idAlumno;
	}

	public void setIdAlumno(Long idAlumno) {
		this.idAlumno = idAlumno;
	}

	public String getEntrada() {
		return entrada;
	}

	public void setEntrada(String entrada) {
		this.entrada = entrada;
	}

	public String getSalida() {
		return salida;
	}

	public void setSalida(String salida) {
		this.salida = salida;
	}

	public void setIdConexion(Long idConexion) {
		this.idConexion = idConexion;
	}

	public String getId_sesion() {
		return id_sesion;
	}

	public void setId_sesion(String id_sesion) {
		this.id_sesion = id_sesion;
	}
}