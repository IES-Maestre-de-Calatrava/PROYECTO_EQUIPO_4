package com.grupo4.frances.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.grupo4.frances.persistence.Alumno;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AlumnoRepository extends JpaRepository<Alumno, Long> {
    @Query("SELECT a FROM Alumno a WHERE a.nombreUsuario = :username")
    List<Alumno> buscarPorUsername(@Param("username") String username);

    @Query("SELECT a FROM Alumno a WHERE a.instituto = :instituto")
    List<Alumno> buscarPorInstituto(@Param("instituto") String instituto);

    @Query("SELECT a FROM Alumno a WHERE a.telefono = :telefono")
    List<Alumno> buscarPorTelefono(@Param("telefono") int telefono);

    @Query("SELECT a FROM Alumno a WHERE a.correo = :correo")
    Alumno buscarPorCorreo(@Param("correo") String correo);
}
