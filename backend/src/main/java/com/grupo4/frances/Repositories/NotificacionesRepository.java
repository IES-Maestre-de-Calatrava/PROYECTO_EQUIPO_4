package com.grupo4.frances.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.grupo4.frances.persistence.Notificaciones;

public interface NotificacionesRepository extends JpaRepository<Notificaciones, Long> {

    @Query("SELECT n FROM Notificaciones n WHERE n.idAlumno = :idAlumno")
    List<Notificaciones> buscarPorIdAlumno(@Param("idAlumno") Long idAlumno);

    @Query("SELECT n FROM Notificaciones n WHERE n.titulo = :titulo")
    List<Notificaciones> buscarPorTitulo(@Param("titulo") String titulo);

    @Query("SELECT n FROM Notificaciones n WHERE n.codigo = :codigo")
    List<Notificaciones> buscarPorCodigo(@Param("codigo") String codigo);
}
