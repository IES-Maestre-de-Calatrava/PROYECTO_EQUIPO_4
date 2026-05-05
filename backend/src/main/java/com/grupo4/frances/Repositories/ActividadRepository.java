package com.grupo4.frances.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grupo4.frances.persistence.Actividad;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ActividadRepository extends JpaRepository<Actividad, List> {

    @Query("SELECT a FROM Actividad a WHERE a.nombre = :nombre")
    List<Actividad> buscarPorNombre(@Param("nombre") String nombre);

    @Query("SELECT a FROM Actividad a WHERE a.class = :dificultad")
    List<Actividad> buscarPorDificultad(@Param("dificultad") int dificultad);

    @Query("SELECT a FROM Actividad a WHERE a.duracion = :duracion")
    List<Actividad> buscarPorDuracion(@Param("duracion") int duracion);


}
