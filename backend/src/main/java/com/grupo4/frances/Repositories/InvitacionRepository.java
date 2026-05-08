package com.grupo4.frances.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.grupo4.frances.persistence.Invitacion;

public interface InvitacionRepository extends JpaRepository<Invitacion, Long> {

    @Query("SELECT i FROM Invitacion i WHERE i.idAlumno = :idAlumno AND i.estado = 'PENDIENTE'")
    List<Invitacion> buscarInvitacionesPendientes(@Param("idAlumno") String idAlumno);

    @Query("SELECT i FROM Invitacion i WHERE i.idGrupo = :idGrupo AND i.idAlumno = :idAlumno")
    Invitacion buscarPorGrupoYAlumno(@Param("idGrupo") Long idGrupo, @Param("idAlumno") String idAlumno);

    @Query("SELECT i FROM Invitacion i WHERE i.idProfesor = :idProfesor")
    List<Invitacion> buscarPorProfesor(@Param("idProfesor") String idProfesor);

    @Query("SELECT i FROM Invitacion i WHERE i.idGrupo = :idGrupo")
    List<Invitacion> buscarPorGrupo(@Param("idGrupo") Long idGrupo);
}