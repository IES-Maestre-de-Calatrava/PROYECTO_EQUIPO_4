package com.grupo4.frances.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence. Table;

@Entity

@Table(name="GRUPO", schema="frances")

public class Grupo implements java.io.Serializable{
	
	@Id
	@Column(name="ID_GRUPO")
	private Long idGrupo;
	
	@Column(name="NOMBRE")
	private String nombre;
	
	@Column(name="ID_CENTRO")
	private Long centro;
	
	@Column(name="TUTOR")
	private Long profesor;

	public Grupo(){

	}

	public Grupo(Long idGrupo, String nombre, Long centro, Long profesor) {
		this.idGrupo = idGrupo;
		this.nombre = nombre;
		this.centro = centro;
		this.profesor = profesor;
	}

	public Long getIdGrupo() {
		return idGrupo;
	}

	public void setIdGrupo(Long idGrupo) {
		this.idGrupo = idGrupo;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Long getCentro() {
		return centro;
	}

	public void setCentro(Long centro) {
		this.centro = centro;
	}

	public Long getProfesor() {
		return profesor;
	}

	public void setProfesor(Long profesor) {
		this.profesor = profesor;
	}
	
}