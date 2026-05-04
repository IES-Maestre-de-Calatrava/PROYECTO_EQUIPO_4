package DTO;

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
    private 
	
	@NotBlank
	@Size(max=200)
	private String apellidos;
	private String domicilio;
	
	@Email
	private String correo;
	
	


}