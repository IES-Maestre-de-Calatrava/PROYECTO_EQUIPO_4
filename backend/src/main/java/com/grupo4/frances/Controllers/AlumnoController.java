package com.grupo4.frances.Controllers;

import com.grupo4.frances.DTO.AlumnoDTO;
import com.grupo4.frances.Mappers.AlumnoMapper;
import com.grupo4.frances.persistence.AlumnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/alumno") 
public class AlumnoController {

    @Autowired
    private AlumnoRepository repository;

    /**
     * Obtener todos los alumnos
     * @return List de AlumnoDTO
     */
    @GetMapping("/find")
    public List<AlumnoDTO> getAllAlumnos() {
        return repository.findAll()
                .stream()
                .map(AlumnoMapper::toDTO)
                .toList();
    }

    /**
     * Obtener alumno por ID
     * @param alumnoId
     * @return AlumnoDTO
     */
    @GetMapping("/find/{id}")
    public ResponseEntity<AlumnoDTO> getAlumnoByID(@PathVariable(value = "id") Long alumnoId) {

        AlumnoDTO alumno = repository.findById(alumnoId)
                .map(AlumnoMapper::toDTO)
                .orElse(null);

        return ResponseEntity.ok(alumno);
    }
}