package com.grupo4.frances.Repositories;

import com.grupo4.frances.persistence.Grupo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface GrupoRepository extends JpaRepository<Grupo, Long> {

    @Query("SELECT g FROM Grupo g WHERE g.nombre = :nombre")
    List<Grupo> buscarPorNombre(@Param("nombre") String nombre);
}