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

	public ConexionDTO(){

	}

    public ConexionDTO(Long idConexion, Long idAlumno, String entrada, String salida){
		this.idConexion = idConexion;
        this.idAlumno=idAlumno;
        this.entrada=entrada;
        this.salida=salida;
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

}