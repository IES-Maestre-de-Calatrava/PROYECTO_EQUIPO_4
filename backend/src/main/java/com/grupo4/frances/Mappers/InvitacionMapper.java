package com.grupo4.frances.Mappers;

import com.grupo4.frances.DTO.InvitacionDTO;
import com.grupo4.frances.persistence.Invitacion;

public class InvitacionMapper {

    public static InvitacionDTO toDTO(Invitacion invitacion) {
        if (invitacion == null) return null;

        InvitacionDTO dto = new InvitacionDTO();

        dto.setIdInvitacion(invitacion.getIdInvitacion());
        dto.setIdGrupo(invitacion.getIdGrupo());
        dto.setIdAlumno(invitacion.getIdAlumno());
        dto.setIdProfesor(invitacion.getIdProfesor());
        dto.setEstado(invitacion.getEstado());
        dto.setFechaEnvio(invitacion.getFechaEnvio());
        dto.setFechaRespuesta(invitacion.getFechaRespuesta());

        return dto;
    }

    public static Invitacion toEntity(InvitacionDTO dto) {

        Invitacion invitacion = new Invitacion(
            dto.getIdGrupo(),
            dto.getIdAlumno(),
            dto.getIdProfesor(),
            dto.getEstado(),
            dto.getFechaEnvio(),
            dto.getFechaRespuesta()
        );

        // Manejo del ID para actualizaciones
        if (dto.getIdInvitacion() != null && dto.getIdInvitacion() != 0) {
            invitacion.setIdInvitacion(dto.getIdInvitacion());
        }

        return invitacion;
    }

    public static Invitacion toEntityCreate(InvitacionDTO dto) {

        Invitacion invitacion = new Invitacion(
            dto.getIdGrupo(),
            dto.getIdAlumno(),
            dto.getIdProfesor(),
            dto.getEstado(),
            dto.getFechaEnvio(),
            dto.getFechaRespuesta()
        );

        return invitacion;
    }
}