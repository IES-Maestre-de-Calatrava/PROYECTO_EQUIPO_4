package com.grupo4.frances.Mappers;

import com.grupo4.frances.DTO.NotificacionesDTO;
import com.grupo4.frances.persistence.Notificaciones;

public class NotificacionesMapper {

    public static NotificacionesDTO toDTO(Notificaciones notificaciones) {
        if (notificaciones == null) return null;

        NotificacionesDTO dto = new NotificacionesDTO();

        dto.setIdNotificacion(notificaciones.getIdNotificacion());
        dto.setIdAlumno(notificaciones.getIdAlumno());
        dto.setTitulo(notificaciones.getTitulo());
        dto.setMensaje(notificaciones.getMensaje());
        dto.setCodigo(notificaciones.getCodigo());

        return dto;
    }

    public static Notificaciones toEntity(NotificacionesDTO dto) {
        if (dto == null) return null;

        Notificaciones notificaciones = new Notificaciones(
            dto.getIdAlumno(),
            dto.getTitulo(),
            dto.getMensaje(),
            dto.getCodigo()
        );

        // Manejo del ID para actualizaciones
        if (dto.getIdNotificacion() != null && dto.getIdNotificacion() != 0) {
            notificaciones.setIdNotificacion(dto.getIdNotificacion());
        }

        return notificaciones;
    }

    public static Notificaciones toEntityCreate(NotificacionesDTO dto) {

        Notificaciones notificaciones = new Notificaciones(
            dto.getIdAlumno(),
            dto.getTitulo(),
            dto.getMensaje(),
            dto.getCodigo()
        );

        return notificaciones;
    }
}

