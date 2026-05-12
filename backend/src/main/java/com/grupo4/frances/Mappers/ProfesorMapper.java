package com.grupo4.frances.Mappers;

import com.grupo4.frances.DTO.ProfesorDTO;
import com.grupo4.frances.persistence.Profesor;

public class ProfesorMapper{

    public static ProfesorDTO toDTO(Profesor profesor){

        if(profesor == null){
            return null;
        }

        ProfesorDTO dto = new ProfesorDTO();

        dto.setIdProfesor(profesor.getIdProfesor());
        dto.setNombreUsuario(profesor.getNombreUsuario());
        dto.setContrasena(profesor.getContrasena());
        dto.setNombre(profesor.getNombre());
        dto.setApellidos(profesor.getApellidos());
        dto.setInstituto(profesor.getInstituto());
        dto.setTelefono(profesor.getTelefono());
        dto.setCorreo(profesor.getCorreo());
        dto.setDirector(profesor.isDirector());

        return dto;

    }

    public static Profesor toEntity(ProfesorDTO dto){
        Profesor profesor = new Profesor(
            dto.getIdProfesor(),
            dto.getNombreUsuario(),
            dto.getContrasena(),
            dto.getNombre(),
            dto.getApellidos(),
            dto.getInstituto(),
            dto.getTelefono(),
            dto.getCorreo(),
            dto.getDirector()

        );

        if(null != dto.getIdProfesor()&& (dto.getIdProfesor() != 0)) {
            profesor.setIdProfesor(dto.getIdProfesor());
        }

        return profesor;

    }

    public static Profesor toEntityCreate(ProfesorDTO dto){

            Profesor profesor = new Profesor(
                dto.getIdProfesor(),
                dto.getNombreUsuario(),
                dto.getContrasena(),
                dto.getNombre(),
                dto.getApellidos(),
                dto.getInstituto(),
                dto.getTelefono(),
                dto.getCorreo(),
                dto.getDirector()

            );

            return profesor;

    }



}