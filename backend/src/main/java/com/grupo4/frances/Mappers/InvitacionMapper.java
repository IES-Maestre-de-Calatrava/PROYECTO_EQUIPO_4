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
        if (dto == null) return null;

        Invitacion invitacion = new Invitacion();

        invitacion.setIdGrupo(dto.getIdGrupo());
        invitacion.setIdAlumno(dto.getIdAlumno());
        invitacion.setIdProfesor(dto.getIdProfesor());
        invitacion.setEstado(dto.getEstado());
        invitacion.setFechaEnvio(dto.getFechaEnvio());
        invitacion.setFechaRespuesta(dto.getFechaRespuesta());

        // Manejo del ID para actualizaciones
        if (dto.getIdInvitacion() != null && dto.getIdInvitacion() != 0) {
            invitacion.setIdInvitacion(dto.getIdInvitacion());
        }

        return invitacion;
    }

    public static Invitacion toEntityCreate(InvitacionDTO dto) {
        if (dto == null) return null;

        Invitacion invitacion = new Invitacion();

        invitacion.setIdGrupo(dto.getIdGrupo());
        invitacion.setIdAlumno(dto.getIdAlumno());
        invitacion.setIdProfesor(dto.getIdProfesor());
        invitacion.setEstado(dto.getEstado());
        invitacion.setFechaEnvio(dto.getFechaEnvio());
        invitacion.setFechaRespuesta(dto.getFechaRespuesta());

        return invitacion;
    }
}