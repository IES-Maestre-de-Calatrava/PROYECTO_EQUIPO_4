package com.grupo4.frances.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.grupo4.frances.persistence.Profesor;

public interface AdminRepository extends JpaRepository<Profesor, Long> {

    @Query("SELECT p FROM Profesor p WHERE p.director = true")
    List<Profesor> buscarTodosLosAdmins();

    @Query("SELECT p FROM Profesor p WHERE p.director = true AND p.correo = :correo")
    Optional<Profesor> buscarAdminPorCorreo(@Param("correo") String correo);

    @Query("SELECT p FROM Profesor p WHERE p.director = true AND p.instituto = :instituto")
    List<Profesor> buscarAdminsPorInstituto(@Param("instituto") String instituto);

    Optional<Profesor> findByCorreoAndDirectorTrue(String correo);
}
