package com.grupo4.frances.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grupo4.frances.persistence.Centro;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ConexionRepository extends JpaRepository<Conexion, Long> {
    @Query("SELECT c FROM Conexion c WHERE c.entrada = :entrada")
    List<Conexion> buscarPorNombre(@Param("entrada") String entrada);

}