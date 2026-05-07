package com.grupo4.frances.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name="NOTIFICACIONES", schema="frances")
public class Notificaciones implements java.io.Serializable {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID_NOTIFICACION", precision = 10)
	private Long idNotificacion;
	
	@Column(name="ID_ALUMNO", length = 20, nullable = false)
	private String idAlumno;
	
	@Column(name="TITULO", length = 100, nullable = false)
	private String titulo;
	
	@Column(name="MENSAJE", nullable = false)
	private String mensaje;

	@Column(name="CODIGO", length = 20)
	private String codigo;

	public Notificaciones(String idAlumno1, String titulo1, String mensaje1, String codigo1) {
	}

	public Notificaciones(Long idNotificacion, String idAlumno, String titulo, String mensaje, String codigo) {
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

	public String getIdAlumno() {
		return idAlumno;
	}

	public void setIdAlumno(String idAlumno) {
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