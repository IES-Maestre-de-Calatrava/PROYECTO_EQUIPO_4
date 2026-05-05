package com.grupo4.frances.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ProfesorDTO {

	private Long idProfesor;
	
	@NotBlank(message = "El nombre de usuario es obligatorio")
    @Size(max = 45)
    private String nombreUsuario;

    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 8, max = 64) // Añadido un mínimo de seguridad
    private String contrasena;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 20)
    private String nombre;

    @NotBlank(message = "Los apellidos son obligatorios")
    @Size(max = 64)
    private String apellidos;

    @Size(max = 50)
    private String instituto;

    @Size(min = 9, max = 15) // Cambiado a String para manejar prefijos y ceros
    private int telefono;

    @Email(message = "Debe proporcionar un correo válido")
    @NotBlank(message = "El correo es obligatorio")
    @Size(max = 50)
    private String correo;

    private Boolean director;

	public ProfesorDTO(){
		
	}

    public ProfesorDTO(String apellidos, String contrasena, String correo, Boolean director, Long idProfesor, String instituto, String nombre, String nombreUsuario, int telefono) {
        this.apellidos = apellidos;
        this.contrasena = contrasena;
        this.correo = correo;
        this.director = director;
        this.idProfesor = idProfesor;
        this.instituto = instituto;
        this.nombre = nombre;
        this.nombreUsuario = nombreUsuario;
        this.telefono = telefono;
    }

    public Long getIdProfesor() {
        return idProfesor;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public String getContrasena() {
        return contrasena;
    }

    public String getNombre() {
        return nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public String getInstituto() {
        return instituto;
    }

    public int getTelefono() {
        return telefono;
    }

    public String getCorreo() {
        return correo;
    }

    public Boolean getDirector() {
        return director;
    }

    public void setIdProfesor(Long idProfesor) {
        this.idProfesor = idProfesor;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public void setInstituto(String instituto) {
        this.instituto = instituto;
    }

    public void setTelefono(int telefono) {
        this.telefono = telefono;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public void setDirector(Boolean director) {
        this.director = director;
    }
	
}