package com.grupo4.frances.Mappers;

import com.grupo4.frances.DTO.GrupoDTO;
import com.grupo4.frances.persistence.Grupo;

public class GrupoMapper{

    public static GrupoDTO toDTO(Grupo grupo){
        GrupoDTO dto = new GrupoDTO();

        dto.setIdGrupo(grupo.getIdGrupo());
        dto.setNombre(grupo.getNombre());
        dto.setIdCentro(grupo.getCentro());
        dto.setIdProfesor(grupo.getProfesor());
        dto.setCodigo(grupo.getCodigo());

        return dto;

    }

    public static Grupo toEntity(GrupoDTO dto){
        
        Grupo grupo = new Grupo(
            dto.getIdCentro(),
            dto.getNombre(),
            dto.getIdCentro(),
            dto.getIdProfesor(),
            dto.getCodigo()
        );

        if(null != dto.getIdCentro() && (dto.getIdCentro() != 0)) {
            grupo.setIdGrupo(dto.getIdCentro());
        }

        return grupo;

    }

    public static Grupo toEntityCreate(GrupoDTO dto){
        Grupo grupo = new Grupo(
            dto.getIdCentro(),
            dto.getNombre(),
            dto.getIdCentro(),
            dto.getIdProfesor(),
            dto.getCodigo()
        );

        return grupo;

    }

}