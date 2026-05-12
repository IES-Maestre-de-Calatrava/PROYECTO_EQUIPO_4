package com.grupo4.frances.Mappers;

import com.grupo4.frances.DTO.ActividadDTO;
import com.grupo4.frances.persistence.Actividad;

public class ActividadMapper {

    public static ActividadDTO toDTO(Actividad actividad) {
        if (actividad == null) return null;

        ActividadDTO dto = new ActividadDTO();

        dto.setIdActividad(actividad.getIdActividad());
        dto.setNombre(actividad.getNombre());
        dto.setDificultad(actividad.getDificultad());
        dto.setIdProfesor(actividad.getIdProfesor());
        dto.setDuracion(actividad.getDuracion());
        dto.setFechaInicio(actividad.getFechaInicio());
        dto.setFechaFin(actividad.getFechaFin());
        dto.setFechaEntrega(actividad.getFechaEntrega());
        dto.setPreguntas(actividad.getPreguntas());
        dto.setRespuestas(actividad.getRespuestas());
        dto.setPuntos(actividad.getPuntos());

        return dto;
    }

    public static Actividad toEntity(ActividadDTO dto) {
        if (dto == null) return null;

        Actividad actividad = new Actividad();

        actividad.setNombre(dto.getNombre());
        actividad.setDificultad(dto.getDificultad());
        actividad.setIdProfesor(dto.getIdProfesor());
        actividad.setDuracion(dto.getDuracion());
        actividad.setFechaInicio(dto.getFechaInicio());
        actividad.setFechaFin(dto.getFechaFin());
        actividad.setFechaEntrega(dto.getFechaEntrega());
        actividad.setPreguntas(dto.getPreguntas());
        actividad.setRespuestas(dto.getRespuestas());
        actividad.setPuntos(dto.getPuntos());

        // Manejo del ID para actualizaciones
        if (dto.getIdActividad() != null && dto.getIdActividad() != 0) {
            actividad.setIdActividad(dto.getIdActividad());
        }

        return actividad;
    }

    public static Actividad toEntityCreate(ActividadDTO dto) {
        if (dto == null) return null;

        Actividad actividad = new Actividad();

        actividad.setNombre(dto.getNombre());
        actividad.setDificultad(dto.getDificultad());
        actividad.setIdProfesor(dto.getIdProfesor());
        actividad.setDuracion(dto.getDuracion());
        actividad.setFechaInicio(dto.getFechaInicio());
        actividad.setFechaFin(dto.getFechaFin());
        actividad.setFechaEntrega(dto.getFechaEntrega());
        actividad.setPreguntas(dto.getPreguntas());
        actividad.setRespuestas(dto.getRespuestas());
        actividad.setPuntos(dto.getPuntos());

        return actividad;
    }
}
