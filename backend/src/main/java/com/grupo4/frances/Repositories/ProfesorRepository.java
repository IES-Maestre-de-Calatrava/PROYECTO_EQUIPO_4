package com.grupo4.frances.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

import com.grupo4.frances.persistence.Profesor;

public interface ProfesorRepository extends JpaRepository<Profesor, Long> {
    @Query("SELECT c FROM Grupo c WHERE c.nombre = :nombre")
    List<Profesor> buscarPorNombre(@Param("nombre") String nombre);

    Optional<Profesor> findByCorreo(String correo);

}