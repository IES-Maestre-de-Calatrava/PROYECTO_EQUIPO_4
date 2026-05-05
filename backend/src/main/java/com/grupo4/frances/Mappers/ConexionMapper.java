package com.grupo4.frances.Mappers;

import com.grupo4.frances.DTO.ConexionDTO;
import com.grupo4.frances.persistence.Conexion;

public class ConexionMapper {

    public static ConexionDTO toDTO(Conexion conexion) {
        ConexionDTO dto = new ConexionDTO();

        dto.setEntrada(conexion.getEntrada());
        dto.setSalida(conexion.getSalida());
        dto.setIdAlumno(conexion.getIdAlumno());

        return dto;
    }

    public static Conexion toEntity(ConexionDTO dto) {
        Conexion conexion = new Conexion();

        conexion.setEntrada(dto.getEntrada());
        conexion.setSalida(dto.getSalida());
        conexion.setIdAlumno(dto.getIdAlumno());

        if (dto.getIdConexion() != null && dto.getIdConexion() != 0) {
            conexion.setIdConexion(dto.getIdConexion());
        }

        return conexion;
    }

    public static Conexion toEntityCreate(ConexionDTO dto) {
        Conexion conexion = new Conexion();

        conexion.setEntrada(dto.getEntrada());
        conexion.setSalida(dto.getSalida());
        conexion.setIdAlumno(dto.getIdAlumno());

        return conexion;
    }
}
