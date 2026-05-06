package com.grupo4.frances.Controllers;

import com.grupo4.frances.DTO.ProfesorDTO;
import com.grupo4.frances.Exceptions.ProfesorNotFoundException;
import com.grupo4.frances.Mappers.ProfesorMapper;
import com.grupo4.frances.Repositories.ProfesorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.grupo4.frances.Repositories.GrupoRepository;
import com.grupo4.frances.persistence.Grupo;

import java.util.List;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/profesor") // Ruta actualizada a /actividad
public class ProfesorController {

    @Autowired
    private ProfesorRepository repository;

    /**
     * Obtener todas las actividades
     * @return List de ActividadDTO
     */
    @GetMapping("/find")
    public List<ProfesorDTO> getAllActividades() {
        return repository.findAll()
                .stream()
                .map(ProfesorMapper::toDTO)
                .toList();
    }

    /**
     * Obtener actividad por ID
     * @param profesorId
     * @return ProfesorDTO
     * @throws ProfesorNotFoundException
     */
    @GetMapping("/find/{id}")
    public ResponseEntity<ProfesorDTO> getProfesorByID(@PathVariable(value = "id") Long profesorId)
            throws ProfesorNotFoundException {

        ProfesorDTO profesor = repository.findById(profesorId)
                .map(ProfesorMapper::toDTO)
                .orElseThrow(() -> new ProfesorNotFoundException(profesorId));

        return ResponseEntity.ok(profesor);
    }

    @PostMapping("/crear-grupo")
    public ResponseEntity<Grupo> crearGrupo(@RequestBody Grupo nuevoGrupo) {
        // Aquí se guarda el grupo usando la lógica de JpaRepository
        Grupo grupoGuardado = grupoRepository.save(nuevoGrupo);
        return ResponseEntity.ok(grupoGuardado);
    }

}