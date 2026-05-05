package com.grupo4.frances.Controllers;

import com.grupo4.frances.DTO.ConexionDTO;
import com.grupo4.frances.Exceptions.ConexionNotFoundException;
import com.grupo4.frances.Mappers.ConexionMapper;
import com.grupo4.frances.Repositories.ConexionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/conexion") // Ruta actualizada a /actividad
public class ConexionController {

    @Autowired
    private ConexionRepository repository;

    /**
     * Obtener todas las actividades
     * @return List de ActividadDTO
     */
    @GetMapping("/find")
    public List<ConexionDTO> getAllActividades() {
        return repository.findAll()
                .stream()
                .map(ConexionMapper::toDTO)
                .toList();
    }

    /**
     * Obtener actividad por ID
     * @param conexionID
     * @return ConexionDTO
     * @throws ConexionNotFoundException
     */
    @GetMapping("/find/{id}")
    public ResponseEntity<ConexionDTO> getAlumnoByID(@PathVariable(value = "id") Long alumnoID)
            throws ConexionNotFoundException {

        ConexionDTO conexion = repository.findById(alumnoID)
                .map(ConexionMapper::toDTO)
                .orElseThrow(() -> new ConexionNotFoundException(alumnoID));

        return ResponseEntity.ok(conexion);
    }
}