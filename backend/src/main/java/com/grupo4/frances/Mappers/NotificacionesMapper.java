package com.grupo4.frances.Mappers;

import com.grupo4.frances.DTO.NotificacionesDTO;
import com.grupo4.frances.persistence.Notificaciones;

public class NotificacionesMapper {

    public static NotificacionesDTO toDTO(Notificaciones notificaciones) {

        if(notificaciones == null){
            return null;
        }
    
        NotificacionesDTO dto = new NotificacionesDTO();

        dto.setIdNotificacion(notificaciones.getIdNotificacion());
        dto.setIdAlumno(notificaciones.getIdAlumno());
        dto.setTitulo(notificaciones.getTitulo());
        dto.setMensaje(notificaciones.getMensaje());
        dto.setCodigo(notificaciones.getCodigo());

        return dto;
    }

    public static Notificaciones toEntity(NotificacionesDTO dto) {
       
        Notificaciones notificaciones = new Notificaciones(

            dto.getIdAlumno(),
            dto.getTitulo(),
            dto.getMensaje(),
            dto.getCodigo()

        };

        // Manejo del ID para actualizaciones
        if(null != dto.getIdAlumno()&& (dto.getIdAlumno() != 0)) {
            Notificaciones.set(dto.getIdAlumno());
        }

        return notificaciones;
    }

    public static Notificaciones toEntityCreate(NotificacionesDTO dto) {

        Notificaciones notificaciones = new Notificaciones(

            notificaciones.getIdAlumno(),
            notificaciones.getTitulo(),
            notificaciones.getMensaje(),
            notificaciones.getCodigo()
        );

        return notificaciones;
    }

}

