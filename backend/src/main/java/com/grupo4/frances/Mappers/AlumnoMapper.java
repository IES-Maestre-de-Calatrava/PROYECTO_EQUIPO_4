package com.grupo4.frances.Mappers;

import com.grupo4.frances.DTO.AlumnoDTO;
import com.grupo4.frances.persistence.Alumno;

public class AlumnoMapper {

    public static AlumnoDTO toDTO(Alumno alumno) {
        
        if(alumno == null){
            return null;
        }
        AlumnoDTO dto = new AlumnoDTO();

        dto.setIdAlumno(alumno.getIdAlumno());
        dto.setNombreUsuario(alumno.getNombreUsuario());
        dto.setNombre(alumno.getNombre());
        dto.setApellidos(alumno.getApellidos());
        dto.setInstituto(alumno.getInstituto());
        dto.setTelefono(alumno.getTelefono());
        dto.setCorreo(alumno.getCorreo());
        dto.setNivel(alumno.getNivel());
        dto.setRango(alumno.getRango());

        return dto;
    }

    public static Alumno toEntity(AlumnoDTO dto) {
        Alumno alumno = new Alumno(
                dto.getIdAlumno(),
                dto.getNombreUsuario(),
                null,
                dto.getNombre(),
                dto.getApellidos(),
                dto.getInstituto(),
                dto.getTelefono(),
                dto.getCorreo(),
                dto.getNivel(),
                dto.getRango()
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
                dto.getNombre(),
                dto.getApellidos(),
                dto.getInstituto(),
                dto.getTelefono(),
                dto.getCorreo(),
                dto.getNivel(),
                dto.getRango()
        );

        return alumno;
    }
}