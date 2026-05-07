package com.grupo4.frances.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grupo4.frances.persistence.Conexion;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ConexionRepository extends JpaRepository<Conexion, Long> {
    @Query("SELECT c FROM Conexion c WHERE c.entrada = :entrada")
    List<Conexion> buscarPorEntrada(@Param("entrada") String entrada);

    @Query("SELECT c FROM Conexion c WHERE c.id_sesion = :id_sesion")
    List<conexion> buscarPorUUID(@Param("id_sesion" String id_sesion))
}