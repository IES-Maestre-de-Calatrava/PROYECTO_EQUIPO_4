package com.grupo4.frances.persistence;

import jakarta.persistence.*;

@Entity
@Table(name="USUARIOS", schema="frances")
public class Usuarios implements java.io.Serializable {

    @Id
    @Column(name="ID")
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long idPersona;

    @Column(name="EMAIL")
    private String email;

    @Column(name="USERNAME")
    private String username;

    @Column(name="PASSWD")
    private String passwd;

    @Column(name="NOMBRE")
    private String nombre;

    @Column(name="APELLIDOS")
    private String apellidos;

    @Column(name="TELEFONO")
    private Long telefono;

    @Column(name="INSTITUTO")
    private String instituto;

    public Usuarios(){

    }

    public Usuarios(long idPersona, String email, String username, String passwd, String nombre, String apellidos, Long telefono, String instituto) {
        this.idPersona = idPersona;
        this.email = email;
        this.username = username;
        this.passwd = passwd;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.instituto = instituto;
    }

    public long getIdPersona() {
        return idPersona;
    }

    public void setIdPersona(long idPersona) {
        this.idPersona = idPersona;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswd() {
        return passwd;
    }

    public void setPasswd(String passwd) {
        this.passwd = passwd;
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

    public Long getTelefono() {
        return telefono;
    }

    public void setTelefono(Long telefono) {
        this.telefono = telefono;
    }

    public String getInstituto() {
        return instituto;
    }

    public void setInstituto(String instituto) {
        this.instituto = instituto;
    }

}
