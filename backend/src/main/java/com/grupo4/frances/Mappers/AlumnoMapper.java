package com.grupo4.frances.Mappers;

import com.grupo4.frances.DTO.AlumnoDTO;
import com.grupo4.frances.persistence.Alumno;

public class AlumnoMapper {

    public static AlumnoDTO toDTO(Alumno alumno) {
        AlumnoDTO dto = new AlumnoDTO();

        dto.setIdAlumno(alumno.getIdAlumno());
        dto.setNombreUsuario(alumno.getNombreUsuario());
        dto.setRol(alumno.getRol());
        dto.setNombre(alumno.getNombre());
        dto.setApellidos(alumno.getApellidos());
        dto.setInstituto(alumno.getInstituto());
        dto.setTelefono(alumno.getTelefono());
        dto.setCorreo(alumno.getCorreo());
        dto.setNivel(alumno.getNivel());
        dto.setRango(alumno.getRango());
        dto.setUltimaConexion(alumno.getUltimaConexion());

        return dto;
    }

    public static Alumno toEntity(AlumnoDTO dto) {
        Alumno alumno = new Alumno(
                dto.getIdAlumno(),
                dto.getNombreUsuario(),
                null, 
                dto.getRol(),
                dto.getNombre(),
                dto.getApellidos(),
                dto.getInstituto(),
                dto.getTelefono(),
                dto.getCorreo(),
                dto.getNivel(),
                dto.getRango(),
                dto.getUltimaConexion()
        );

        if (null != dto.getIdAlumno() && (dto.getIdAlumno() != 0)) {
            alumno.setIdAlumno(dto.getIdAlumno());
        }

        return alumno;
    }

    public static Alumno toEntityCreate(AlumnoDTO dto) {
        Alumno alumno = new Alumno(
                dto.getIdAlumno(),
                dto.getNombreUsuario(),
                null,
                dto.getRol(),
                dto.getNombre(),
                dto.getApellidos(),
                dto.getInstituto(),
                dto.getTelefono(),
                dto.getCorreo(),
                dto.getNivel(),
                dto.getRango(),
                dto.getUltimaConexion()
        );

        return alumno;
    }
}