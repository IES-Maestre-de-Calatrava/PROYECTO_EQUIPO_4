package com.grupo4.frances.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.grupo4.frances.persistence.Grupo;

public interface GrupoRepository extends JpaRepository<Grupo, Long> {

    @Query("SELECT g FROM Grupo g WHERE g.nombre = :nombre")
    List<Grupo> buscarPorNombre(@Param("nombre") String nombre);

    @Query("SELECT g FROM Grupo g JOIN g.alumnos a WHERE a.idAlumno = :idAlumno")
    List<Grupo> buscarGruposPorAlumno(@Param("idAlumno") Long idAlumno);

    Optional<Grupo> findByCodigo(String codigo);

}