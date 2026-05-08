package com.grupo4.frances.DTO;

public class LoginRequestDTO {
    String correo;
    String contrasena;
    String idsesion;

    public LoginRequestDTO() {
    }

    public LoginRequestDTO(String correo, String contrasena, String idsesion) {
        this.correo = correo;
        this.contrasena = contrasena;
        this.idsesion = idsesion;
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

    public String getIdsesion() {
        return idsesion;
    }

    public void setId_sesion(String idsesion) {
        this.idsesion = idsesion;
    }
}
