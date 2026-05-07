package com.grupo4.frances.Controllers;

import com.grupo4.frances.DTO.ActividadDTO;
import com.grupo4.frances.persistence.Actividad.*;
import com.grupo4.frances.Exceptions.ActividadNotFoundException;
import com.grupo4.frances.Mappers.ActividadMapper;
import com.grupo4.frances.Repositories.ActividadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/actividad") // Ruta actualizada a /actividad
public class ActividadController {

    @Autowired
    private ActividadRepository repository;

    /**
     * Obtener todas las actividades.
     * @return List de ActividadDTO
     */
    @GetMapping("/find")
    public List<ActividadDTO> getAllActividades() {
        return repository.findAll()
                .stream()
                .map(ActividadMapper::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Obtener actividad por ID
     * @param actividadId
     * @return ActividadDTO
     * @throws ActividadNotFoundException
     */
    @GetMapping("/find/{id}")
    public ResponseEntity<ActividadDTO> getActividadByID(@PathVariable(value = "id") Long actividadId)
            throws ActividadNotFoundException {

        ActividadDTO actividad = repository.findById(actividadId)
                .map(ActividadMapper::toDTO)
                .orElseThrow(() -> new ActividadNotFoundException(actividadId));

        return ResponseEntity.ok(actividad);
    }
}
