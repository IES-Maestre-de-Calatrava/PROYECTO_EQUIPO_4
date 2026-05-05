package com.grupo4.frances.Repositories;

import com.grupo4.frances.persistence.Alumno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface AlumnoRepository extends JpaRepository<Alumno, Long> {

    @Query("SELECT a FROM Alumno a WHERE a.nombreUsuario = :nombreUsuario")
    List<Alumno> buscarPorNombreUsuario(@Param("nombreUsuario") String nombreUsuario);

    @Query("SELECT a FROM Alumno a WHERE a.correo = :correo")
    Alumno buscarPorCorreo(@Param("correo") String correo);
}