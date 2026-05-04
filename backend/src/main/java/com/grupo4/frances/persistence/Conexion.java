package com.grupo4.frances.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence. Table;

@Entity

@Table(name="CONEXION", schema="frances")

public class Conexion implements java.io.Serializable{
	
	@Id
	@Column(name="ID_ALUMNO")
	private Long idAlumno;
	
	@Column(name="ENTRADA")
	private String entrada;
	
	@Column(name="SALIDA")
	private String salida;

	public Conexion(){

	}

	public Conexion(Long idAlumno,String entrada,String salida) {
		this.idAlumno = idAlumno;
		this.entrada = entrada;
		this.salida = salida;
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