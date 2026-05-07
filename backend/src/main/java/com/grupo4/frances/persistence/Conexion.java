package com.grupo4.frances.persistence;

import jakarta.persistence.*;

@Entity

@Table(name="CONEXION", schema="frances")

public class Conexion implements java.io.Serializable{

	@Id
	@Column(name="ID_CONEXION")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idConexion;

	@Column(name="ID_ALUMNO")
	private Long idAlumno;
	
	@Column(name="ENTRADA")
	private String entrada;
	
	@Column(name="SALIDA")
	private String salida;

	@Column(name="ID_SESION")
	private String idsesion;

	public Conexion(){

	}

	public Conexion(Long idConexion, Long idAlumno,String entrada,String salida, String idsesion) {
		this.idConexion = idConexion;
		this.idAlumno = idAlumno;
		this.entrada = entrada;
		this.salida = salida;
		this.idsesion = idsesion;
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

	public String getIdsesion() {
		return idsesion;
	}

	public void setIdsesion(String idsesion) {
		this.idsesion = idsesion;
	}
}