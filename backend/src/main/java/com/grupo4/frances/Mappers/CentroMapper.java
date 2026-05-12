package com.grupo4.frances.Mappers;

import com.grupo4.frances.DTO.CentroDTO;
import com.grupo4.frances.persistence.Centro;

public class CentroMapper {
    public static CentroDTO toDTO(Centro centro) {
        CentroDTO dto = new CentroDTO();

        dto.setId(centro.getCentroID());
        dto.setNombre(centro.getNombre());
        dto.setLocalidad(centro.getNombre());

        return dto;
    }

    public static Centro toEntity(CentroDTO dto) {
        Centro centro = new Centro(
                dto.getId(),
                dto.getNombre(),
                dto.getLocalidad()
        );

        if(null != dto.getId() && (dto.getId() != 0)) {
            centro.setCentroID(dto.getId());
        }

        return centro;
    }

    public static Centro toEntityCreate(CentroDTO dto) {
        Centro centro = new Centro(
                dto.getId(),
                dto.getNombre(),
                dto.getLocalidad()
        );

        return centro;
    }
}
