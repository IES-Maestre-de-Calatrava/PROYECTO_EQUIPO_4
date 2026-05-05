package com.grupo4.frances.persistence;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity

@Table(name="PROFESOR", schema="frances")

public class Profesor implements java.io.Serializable{

		@Id
		@Column(name="ID_PROFESOR")
		@GeneratedValue(strategy=GenerationType.IDENTITY)
		private Long idProfesor;
		
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

        @Column(name="CORREO")
		private String correo;

        @Column(name="DIRECTOR")
		private boolean director;

	public Profesor() {
	}

	public Profesor(Long idProfesor, String nombreUsuario, String contrasena, String nombre, String apellidos,
	                String instituto, int telefono, String correo, boolean director) {
			this.idProfesor = idProfesor;
			this.nombreUsuario = nombreUsuario;
			this.contrasena = contrasena;
			this.nombre = nombre;
			this.apellidos = apellidos;
			this.instituto = instituto;
			this.telefono = telefono;
			this.correo = correo;
			this.director = director;
		}

		public Long getIdProfesor() {
			return idProfesor;
		}

		public void setIdProfesor(Long idProfesor) {
			this.idProfesor = idProfesor;
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

		public boolean isDirector() {
			return director;
		}

		public void setDirector(boolean director) {
			this.director = director;
		}

		public Grupo crearGrupo(Long idGrupo, String nombre, Long centro) {
    		return new Grupo(idGrupo, nombre, centro, this.idProfesor);
		}

		public Actividad subirActividadAGrupo(Actividad actividad, Grupo grupo) {

			if (!grupo.getProfesor().equals(this.idProfesor)) {
				System.err.println("❌ El profesor '" + this.nombre + 
								"' no es tutor del grupo '" + grupo.getNombre() + "'");
				return null;
			}

			actividad.setIdProfesor(String.valueOf(this.idProfesor));
			actividad.agregarGrupo(grupo);

			System.out.println("✅ Actividad '" + actividad.getNombre() + 
							"' subida al grupo '" + grupo.getNombre() + 
							"' por el profesor '" + this.nombre + "'");
			return actividad;
		}

		public Profesor crearProfesor(Long idProfesor, String nombreUsuario, String contrasena,
                               String nombre, String apellidos, String instituto,
                               int telefono, String correo, boolean esDirector) {

			// ✅ Solo un director puede crear profesores
			if (!this.director) {
				System.err.println("❌ El profesor '" + this.nombre + "' no es director. " +
								"No tiene permiso para crear profesores.");
				return null;
			}

			Profesor nuevoProfesor = new Profesor(idProfesor, nombreUsuario, contrasena,
												nombre, apellidos, instituto,
												telefono, correo, esDirector);

			System.out.println("✅ Profesor '" + nombre + " " + apellidos + 
							"' creado por el director '" + this.nombre + "'");
			return nuevoProfesor;
		}

		public Alumno crearAlumno(Long idAlumno, String nombreUsuario, String contrasena,
                           String nombre, String apellidos, String instituto,
                           int telefono, String correo, String nivel, String rango) {

			// ✅ Solo un director puede crear alumnos
			if (!this.director) {
				System.err.println("❌ El profesor '" + this.nombre + "' no es director. " +
								"No tiene permiso para crear alumnos.");
				return null;
			}

			Alumno nuevoAlumno = new Alumno(idAlumno, nombreUsuario, contrasena,
											nombre, apellidos, instituto, telefono, correo,
											nivel, rango);

			System.out.println("✅ Alumno '" + nombre + " " + apellidos + 
							"' creado por el director '" + this.nombre + "'");
			return nuevoAlumno;
		}

		public boolean eliminarProfesor(Profesor profesor) {

			if (!this.director) {
				System.err.println("❌ El profesor '" + this.nombre + "' no es director. " +
								"No tiene permiso para eliminar profesores.");
				return false;
			}

			// ✅ Un director no puede eliminarse a sí mismo
			if (profesor.getIdProfesor().equals(this.idProfesor)) {
				System.err.println("❌ El director '" + this.nombre + "' no puede eliminarse a sí mismo.");
				return false;
			}

			System.out.println("✅ Profesor '" + profesor.getNombre() + " " + profesor.getApellidos() +
							"' eliminado por el director '" + this.nombre + "'");
			return true;
		}
		
		public boolean eliminarAlumno(Alumno alumno) {

			if (!this.director) {
				System.err.println("❌ El profesor '" + this.nombre + "' no es director.");
				return false;
			}

			System.out.println("✅ Alumno '" + alumno.getNombre() + " " + alumno.getApellidos() + "' eliminado.");
			return true;
		}
        
        
} 