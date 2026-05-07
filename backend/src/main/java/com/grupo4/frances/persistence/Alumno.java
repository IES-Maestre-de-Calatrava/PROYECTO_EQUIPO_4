package com.grupo4.frances.persistence;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;

@Entity
@Table(name="ALUMNO", schema="frances")
public class Alumno implements java.io.Serializable {

		@Id
		@Column(name="ID_ALUMNO")
		@GeneratedValue(strategy=GenerationType.IDENTITY)
		private Long idAlumno;
		
		@Column(name="NOMBRE_USUARIO")
		private String nombreUsuario;
		
		@Column(name="CONTRASENA")
		private String contrasena;
		
		@Column(name="NOMBRE")
		private String nombre;
		
		@Column(name="APELLIDOS")
		private String apellidos;

		@Column(name="INSTITUTO")
		private String instituto;

		@Column(name="TELEFONO")
		private int telefono;

		@Column(name="CORREO", nullable = false, unique = true)
		private String correo;

		@Column(name="NIVEL")
		private String nivel;

		@Column(name="RANGO")
		private String rango;

		@ManyToMany(mappedBy = "alumnos")
    	private Set<Grupo> grupos = new HashSet<>();

		@ManyToMany
		@JoinTable(
			name = "ALUMNO_ACTIVIDAD",
			schema = "frances",
			joinColumns = @JoinColumn(name = "ID_ALUMNO"),
			inverseJoinColumns = @JoinColumn(name = "ID_ACTIVIDAD")
		)
	private Set<Actividad> actividades = new HashSet<>();

		public Alumno() {
		}

		public Alumno(Long idAlumno, String nombreUsuario, String contrasena, String nombre,
				String apellidos, String instituto, int telefono, String correo, String nivel, 
				String rango) {
			this.idAlumno = idAlumno;
			this.nombreUsuario = nombreUsuario;
			this.contrasena = contrasena;
			this.nombre = nombre;
			this.apellidos = apellidos;
			this.instituto = instituto;
			this.telefono = telefono;
			this.correo = correo;
			this.nivel = nivel;
			this.rango = rango;
		}

		public Long getIdAlumno() {
			return idAlumno;
		}

		public void setIdAlumno(Long idAlumno) {
			this.idAlumno = idAlumno;
		}

		public String getNombreUsuario() {
			return nombreUsuario;
		}

		public void setNombreUsuario(String nombreUsuario) {
			this.nombreUsuario = nombreUsuario;
		}

		public String getContrasena() {
			return contrasena;
		}

		public void setContrasena(String contrasena) {
			this.contrasena = contrasena;
		}

		public String getNombre() {
			return nombre;
		}

		public void setNombre(String nombre) {
			this.nombre = nombre;
		}

		public String getApellidos() {
			return apellidos;
		}

		public void setApellidos(String apellidos) {
			this.apellidos = apellidos;
		}

		public String getInstituto() {
			return instituto;
		}

		public void setInstituto(String instituto) {
			this.instituto = instituto;
		}

		public int getTelefono() {
			return telefono;
		}

		public void setTelefono(int telefono) {
			this.telefono = telefono;
		}

		public String getCorreo() {
			return correo;
		}

		public void setCorreo(String correo) {
			this.correo = correo;
		}

		public String getNivel() {
			return nivel;
		}

		public void setNivel(String nivel) {
			this.nivel = nivel;
		}

		public String getRango() {
			return rango;
		}

		public void setRango(String rango) {
			this.rango = rango;
		}

		public Set getGrupos() {
			return grupos;
		}

		public void setGrupos(Set grupos) {
			this.grupos = grupos;
		}

		public Set getActividades(){
			return actividades;
		}

		public void setActividades(Set actividades){
			this.actividades = actividades;
		}

}
