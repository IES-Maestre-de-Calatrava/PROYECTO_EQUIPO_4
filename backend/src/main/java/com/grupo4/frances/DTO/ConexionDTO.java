package com.grupo4.frances.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ConexionDTO{

    @NotNull
	private Long idAlumno;
	
	@NotBlank
    @NotNull
	private String entrada;
	
    private String salida;

    public ConexionDTO(Long idAlumno, String entrada, String salida){
        this.idAlumno=idAlumno;
        this.entrada=entrada;
        this.salida=salida;
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