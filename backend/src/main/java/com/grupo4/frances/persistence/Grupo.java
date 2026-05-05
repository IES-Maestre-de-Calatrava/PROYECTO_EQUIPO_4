package com.grupo4.frances.persistence;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence. Table;

@Entity

@Table(name="GRUPO", schema="frances")

public class Grupo implements java.io.Serializable{
	
	@Id
	@Column(name="ID_GRUPO")
	private Long idGrupo;
	
	@Column(name="NOMBRE")
	private String nombre;
	
	@Column(name="ID_CENTRO")
	private Long centro;
	
	@Column(name="TUTOR")
	private Long profesor;

	@ManyToMany
    @JoinTable(
        name = "GRUPO_ALUMNO",                         
        schema = "frances",
        joinColumns = @JoinColumn(name = "ID_GRUPO"),   
        inverseJoinColumns = @JoinColumn(name = "ID_ALUMNO") 
    )

	private Set<Alumno> alumnos = new HashSet<>();

	@ManyToMany(mappedBy = "grupos")
	@JsonIgnore  // evita bucle infinito en JSON
	private Set<Actividad> actividades = new HashSet<>();

	public Grupo(){

	}

	public Grupo(Long idGrupo, String nombre, Long centro, Long profesor) {
		this.idGrupo = idGrupo;
		this.nombre = nombre;
		this.centro = centro;
		this.profesor = profesor;
	}

	public Long getIdGrupo() {
		return idGrupo;
	}

	public void setIdGrupo(Long idGrupo) {
		this.idGrupo = idGrupo;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Long getCentro() {
		return centro;
	}

	public void setCentro(Long centro) {
		this.centro = centro;
	}

	public Long getProfesor() {
		return profesor;
	}

	public void setProfesor(Long profesor) {
		this.profesor = profesor;
	}

    public Set getAlumnos() {
        return alumnos;
    }

    public void setAlumnos(Set alumnos) {
        this.alumnos = alumnos;
    }

    public Set<Actividad> getActividades() {
        return actividades;
    }

    public void setActividades(Set<Actividad> actividades) {
        this.actividades = actividades;
    }

	public void agregarAlumno(Alumno alumno) {
        this.alumnos.add(alumno);
        alumno.getGrupos().add(this);
    }

    public void eliminarAlumno(Alumno alumno) {
        this.alumnos.remove(alumno);
        alumno.getGrupos().remove(this);
    }


	
}