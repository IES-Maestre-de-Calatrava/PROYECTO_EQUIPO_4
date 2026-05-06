package com.grupo4.frances.Controllers;

import com.grupo4.frances.DTO.GrupoDTO;
import com.grupo4.frances.Exceptions.GrupoNotFoundException;
import com.grupo4.frances.Mappers.GrupoMapper;
import com.grupo4.frances.Repositories.AlumnoRepository;
import com.grupo4.frances.Repositories.CentroRepository;
import com.grupo4.frances.Repositories.GrupoRepository;
import com.grupo4.frances.utilidades.Seguridad;
import com.grupo4.frances.persistence.Alumno;
import com.grupo4.frances.persistence.Centro;
import com.grupo4.frances.persistence.Grupo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/grupos")
public class GrupoController {

    private final GrupoRepository repository;
    private final AlumnoRepository alumnoRepository;
    private final CentroRepository centroRepository;

    public GrupoController(GrupoRepository repository, AlumnoRepository alumnoRepository,
                           CentroRepository centroRepository) {
        this.repository = repository;
        this.alumnoRepository = alumnoRepository;
        this.centroRepository = centroRepository;
    }

    @GetMapping
    public List<GrupoDTO> getAllGrupos() {
        return repository.findAll().stream()
                .map(GrupoMapper::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public GrupoDTO getGrupoById(@PathVariable Long id) {
        return repository.findById(id)
                .map(GrupoMapper::toDTO)
                .orElseThrow(() -> new GrupoNotFoundException(id));
    }

    @PostMapping
    public GrupoDTO createGrupo(@RequestBody GrupoDTO grupoDTO) {
        Grupo grupo = GrupoMapper.toEntity(grupoDTO);
        return GrupoMapper.toDTO(repository.save(grupo));
    }

    @DeleteMapping("/{id}")
    public void deleteGrupo(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            throw new GrupoNotFoundException(id);
        }
        repository.deleteById(id);
    }

    // El profesor genera un código de acceso
    @PostMapping("/{id}/codigo")
    public ResponseEntity<?> generarCodigo(
            @PathVariable Long id,
            @RequestParam Long idProfesor) {

        Grupo grupo = repository.findById(id)
                .orElseThrow(() -> new GrupoNotFoundException(id));

        if (!grupo.getProfesor().equals(idProfesor)) {
            return ResponseEntity.status(403)
                    .body(Map.of("error", "No eres el tutor de este grupo"));
        }

        String codigo = Seguridad.generarClaveGrupo();
        grupo.setCodigo(codigo);
        repository.save(grupo);

        return ResponseEntity.ok(Map.of(
                "codigo", codigo,
                "grupo",  grupo.getNombre()
        ));
    }

    // El alumno introduce el código para unirse
    @PostMapping("/unirse")
    public ResponseEntity<?> unirseAGrupo(
            @RequestParam String codigo,
            @RequestParam Long idAlumno) {

        Grupo grupo = repository.findByCodigo(codigo)
                .orElse(null);

        if (grupo == null) {
            return ResponseEntity.status(404)
                    .body(Map.of("error", "Código inválido: " + codigo));
        }

        Alumno alumno = alumnoRepository.findById(idAlumno)
                .orElseThrow(() -> new RuntimeException("Alumno no encontrado: " + idAlumno));

        if (grupo.getAlumnos().contains(alumno)) {
            return ResponseEntity.status(409)
                    .body(Map.of("error", "Ya perteneces a este grupo"));
        }

        Centro centro = grupo.getCentro() == null
                ? null
                : centroRepository.findById(grupo.getCentro()).orElse(null);

        if (centro == null) {
            return ResponseEntity.status(404)
                    .body(Map.of("error", "Centro no encontrado para el grupo '" + grupo.getNombre() + "'"));
        }

        alumno.setInstituto(centro.getNombre());
        grupo.agregarAlumno(alumno);
        alumnoRepository.save(alumno);
        repository.save(grupo);

        return ResponseEntity.ok(Map.of(
                "mensaje", "Te has unido al grupo '" + grupo.getNombre() + "'",
                "grupo",   grupo.getNombre(),
                "centro",  centro.getNombre()
        ));
    }
}
