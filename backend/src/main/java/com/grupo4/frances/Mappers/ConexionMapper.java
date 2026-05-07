package com.grupo4.frances.Mappers;

import com.grupo4.frances.DTO.ConexionDTO;
import com.grupo4.frances.persistence.Conexion;

public class ConexionMapper {

    public static ConexionDTO toDTO(Conexion conexion) {
        ConexionDTO dto = new ConexionDTO();

        dto.setEntrada(conexion.getEntrada());
        dto.setSalida(conexion.getSalida());
        dto.setIdAlumno(conexion.getIdAlumno());
        dto.setIdConexion(conexion.getIdConexion());
        dto.setId_sesion(conexion.getId_sesion());

        return dto;
    }

    public static Conexion toEntity(ConexionDTO dto) {
        Conexion conexion = new Conexion();

        conexion.setEntrada(dto.getEntrada());
        conexion.setSalida(dto.getSalida());
        conexion.setIdAlumno(dto.getIdAlumno());
        conexion.setId_sesion(dto.getId_sesion());

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
        dto.setIdConexion(conexion.getIdConexion());
        dto.setId_sesion(conexion.getId_sesion());

        return conexion;
    }
}
