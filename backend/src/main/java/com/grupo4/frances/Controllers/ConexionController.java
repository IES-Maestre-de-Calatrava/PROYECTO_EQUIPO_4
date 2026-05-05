package com.grupo4.frances.Controllers;

import com.example.demo.DTO.ConexionDTO;
import com.example.demo.Exceptions.ConexionNotFoundException;
import com.example.demo.Mappers.ConexionMapper;
import com.example.demo.persistence.ConexionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/conexion")
public class ConexionController {

    @Autowired
    private ConexionRepository repository;

    /**
     * Obtener todo el historial de conexiones
     */
    @GetMapping("/find")
    public List<ConexionDTO> getAllConexiones() {
        return repository.findAll()
                .stream()
                .map(ConexionMapper::toDTO)
                .toList();
    }

    /**
     * Obtener las conexiones de un alumno específico
     * @param idAlumno
     */
    @GetMapping("/alumno/{id}")
    public List<ConexionDTO> getConexionesByAlumno(@PathVariable(value = "id") Long idAlumno) {
        return repository.findByIdAlumno(idAlumno)
                .stream()
                .map(ConexionMapper::toDTO)
                .toList();
    }

    /**
     * Registrar una nueva entrada (Create)
     */
    @PostMapping("/add")
    public ConexionDTO registrarEntrada(@RequestBody ConexionDTO conexionDTO) {
        return ConexionMapper.toDTO(repository.save(ConexionMapper.toEntity(conexionDTO)));
    }
}