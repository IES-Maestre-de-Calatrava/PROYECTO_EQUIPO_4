package com.grupo4.frances.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

public class AlumnoDTO {

    private Long idAlumno;

    @NotBlank
    @Size(max = 50)
    private String nombreUsuario;

    @NotBlank
    @Size(max = 20)
    private String rol;

    @NotBlank
    @Size(max = 50)
    private String nombre;

    @NotBlank
    @Size(max = 100)
    private String apellidos;

    @Size(max = 100)
    private String instituto;

    private int telefono;

    @Email
    @NotBlank
    private String correo;

    @Size(max = 10)
    private String nivel;

    @Size(max = 20)
    private String rango;

    private LocalDateTime ultimaConexion;

    // Constructor vacío
    public AlumnoDTO() {
    }

    // Constructor con campos
    public AlumnoDTO(Long idAlumno, String nombreUsuario, String rol, String nombre, String apellidos, 
                     String instituto, int telefono, String correo, String nivel, String rango, 
                     LocalDateTime ultimaConexion) {
        this.idAlumno = idAlumno;
        this.nombreUsuario = nombreUsuario;
        this.rol = rol;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.instituto = instituto;
        this.telefono = telefono;
        this.correo = correo;
        this.nivel = nivel;
        this.rango = rango;
        this.ultimaConexion = ultimaConexion;
    }

    // Getters y Setters
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

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
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

    public LocalDateTime getUltimaConexion() {
        return ultimaConexion;
    }

    public void setUltimaConexion(LocalDateTime ultimaConexion) {
        this.ultimaConexion = ultimaConexion;
    }
}