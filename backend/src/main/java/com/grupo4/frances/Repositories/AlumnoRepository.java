package com.grupo4.frances.Repositories;

import com.grupo4.frances.persistence.Actividad;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.grupo4.frances.persistence.Alumno;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

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

    @Query(value = "SELECT PUNTOS FROM ACTIVIDAD WHERE ID_ALUMNO = :idAlumno", nativeQuery = true)
    List<Actividad> findPuntosAlumno(Long idAlumno);

    Optional<Alumno> findByCorreo(String correo);

    @Modifying
    @Transactional
    @Query("UPDATE Alumno a SET a.puntos = a.puntos + :puntosNuevos WHERE a.idAlumno = :idAlumno")
    void sumarPuntosAlumno(@Param("idAlumno") Integer idAlumno, @Param("puntosNuevos") Integer puntosNuevos);

}
