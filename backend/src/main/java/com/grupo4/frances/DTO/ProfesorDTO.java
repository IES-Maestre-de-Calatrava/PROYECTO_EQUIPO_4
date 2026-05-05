package com.grupo4.frances.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ProfesorDTO {
	
	private Long idProfesor;
	
	@NotBlank
	@Size(max=45)
	private String nombreUsuario;

    @NotBlank
    @Size(64)
    private String contrasena;

    @NotBlank
    @Size(20)
    private String nombre;

    @NotBlank
    @Size(64)
    private String apellidos;

    @Size(50)
    private String instituto;

    @NotBlank
    @Size(9)
    private int telefono;
	
	@Email
    @Size(50)
	private String correo;
	
    @NotBlank
    private boolean director;

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
	
}