package com.grupo4.frances.Repositories;

import com.grupo4.frances.persistence.Profesor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ProfesorRepository extends JpaRepository<Profesor, Long> {

    @Query("SELECT p FROM Profesor p WHERE p.nombre = :nombre")
    List<Profesor> buscarPorNombre(@Param("nombre") String nombre);
}