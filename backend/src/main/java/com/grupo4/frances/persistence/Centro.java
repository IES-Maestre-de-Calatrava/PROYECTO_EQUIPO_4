package com.grupo4.frances.persistence;

import jakarta.persistence.*;

@Entity
@Table(name="Centro", schema="frances")
public class Centro implements java.io.Serializable {

    @Id
    @Column(name="ID_CENTRO")
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long centroID;

    @Column(name="NOMBRE")
    private String nombre;

    @Column(name="LOCALIDAD")
    private String localidad;

    public Centro(){

    }

    public Centro(Long centroID, String nombre, String localidad) {
        this.centroID = centroID;
        this.nombre = nombre;
        this.localidad = localidad;
    }

    public Long getCentroID() {
        return centroID;
    }

    public void setCentroID(Long centroID) {
        this.centroID = centroID;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getLocalidad() {
        return localidad;
    }

    public void setLocalidad(String localidad) {
        this.localidad = localidad;
    }
}
