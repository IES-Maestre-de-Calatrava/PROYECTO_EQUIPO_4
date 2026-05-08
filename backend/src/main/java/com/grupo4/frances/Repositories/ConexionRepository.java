package com.grupo4.frances.Repositories;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.grupo4.frances.persistence.Conexion;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ConexionRepository extends JpaRepository<Conexion, Long> {
    @Query("SELECT c FROM Conexion c WHERE c.entrada = :entrada")
    List<Conexion> buscarPorEntrada(@Param("entrada") String entrada);

    @Query("SELECT c FROM Conexion c WHERE c.idsesion = :idsesion")
    Optional<Conexion> buscarPoridsesion(@Param("idsesion") String idsesion);

    Optional<Conexion> findByidsesion(String correo);

    @Query(value = "SELECT * FROM CONEXION WHERE id_alumno = :idAlumno ORDER BY id_conexion DESC LIMIT 1", nativeQuery = true)
    Optional<Conexion> buscarPorIdAlumno(@Param("idalumno") Long idAlumno);

}