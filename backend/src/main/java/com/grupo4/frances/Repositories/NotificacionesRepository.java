package com.grupo4.frances.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.grupo4.frances.persistence.Notificaciones;

public interface NotificacionesRepository extends JpaRepository<Notificaciones, Long> {

    @Query("SELECT N FROM NOTIFICACIONES n WHERE N.ID_ALUMNO = :idAlumno")
    List<Notificaciones> buscarPorIdAlumno(@Param("idAlumno") String idAlumno);

    @Query("SELECT N FROM NOTIFICACIONES n WHERE N.TITULO = :titulo")
    List<Notificaciones> buscarPorTitulo(@Param("titulo") String titulo);

    @Query("SELECT N FROM NOTIFICACIONES n WHERE N.CODIGO = :codigo")
    List<Notificaciones> buscarPorCodigo(@Param("codigo") String codigo);
}
