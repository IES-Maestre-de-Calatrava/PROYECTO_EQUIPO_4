package com.grupo4.frances.Repositories;

import com.grupo4.frances.persistence.Conexion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ConexionRepository extends JpaRepository<Conexion, Long> {

    @Query("SELECT c FROM Conexion c WHERE c.fechaConexion = :fecha")
    List<Conexion> buscarPorFecha(@Param("fecha") String fecha);
}