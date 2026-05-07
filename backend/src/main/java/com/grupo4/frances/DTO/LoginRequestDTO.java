package com.grupo4.frances.DTO;

public class LoginRequestDTO {
    String correo;
    String contrasena;
    String id_sesion;

    public LoginRequestDTO() {
    }

    public LoginRequestDTO(String correo, String contrasena, String id_sesion) {
        this.correo = correo;
        this.contrasena = contrasena;
        this.id_sesion = id_sesion;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public String getId_sesion() {
        return id_sesion;
    }

    public void setId_sesion(String id_sesion) {
        this.id_sesion = id_sesion;
    }
}
