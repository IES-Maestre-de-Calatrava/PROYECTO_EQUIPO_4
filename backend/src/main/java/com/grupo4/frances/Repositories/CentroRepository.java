package com.grupo4.frances.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grupo4.frances.persistence.Centro;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CentroRepository extends JpaRepository<Centro, Long> {
    @Query("SELECT c FROM Centro c WHERE c.nombre = :nombre")
    List<Centro> buscarPorNombre(@Param("nombre") String nombre);

    @Query("SELECT c FROM Centro c WHERE c.localidad = :localidad")
    List<Centro> buscarPorLocalidad(@Param("localidad") String localidad);

}
