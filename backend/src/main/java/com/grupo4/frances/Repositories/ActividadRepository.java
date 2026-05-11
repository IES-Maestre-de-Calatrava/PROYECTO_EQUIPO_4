package com.grupo4.frances.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grupo4.frances.persistence.Actividad;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ActividadRepository extends JpaRepository<Actividad, Long> {

    @Query("SELECT a FROM Actividad a WHERE a.nombre = :nombre")
    List<Actividad> buscarPorNombre(@Param("nombre") String nombre);

    @Query("SELECT a FROM Actividad a WHERE a.dificultad = :dificultad")
    List<Actividad> buscarPorDificultad(@Param("dificultad") String dificultad);

    @Query("SELECT a FROM Actividad a WHERE a.duracion = :duracion")
    List<Actividad> buscarPorDuracion(@Param("duracion") String duracion);

    /**
     * Devuelve todas las actividades que pertenecen a un grupo concreto.
     * Usa la relación ManyToMany entre Actividad y Grupo (tabla ACTIVIDAD_GRUPO).
     *
     * @param idGrupo ID del grupo
     * @return Lista de actividades del grupo
     */
    @Query("SELECT a FROM Actividad a JOIN a.grupos g WHERE g.idGrupo = :idGrupo")
    List<Actividad> findByGrupoId(@Param("idGrupo") Long idGrupo);
}
