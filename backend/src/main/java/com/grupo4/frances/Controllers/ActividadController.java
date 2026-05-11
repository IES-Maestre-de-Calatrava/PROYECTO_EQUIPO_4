package com.grupo4.frances.Controllers;

import com.grupo4.frances.DTO.ActividadDTO;
import com.grupo4.frances.persistence.Actividad;
import com.grupo4.frances.persistence.Grupo;
import com.grupo4.frances.Exceptions.ActividadNotFoundException;
import com.grupo4.frances.Mappers.ActividadMapper;
import com.grupo4.frances.Repositories.ActividadRepository;
import com.grupo4.frances.Repositories.GrupoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/actividad")
public class ActividadController {

    @Autowired
    private ActividadRepository repository;

    @Autowired
    private GrupoRepository grupoRepository;

    /**
     * GET /actividad/find
     * Devuelve todas las actividades.
     */
    @GetMapping("/find")
    public List<ActividadDTO> getAllActividades() {
        return repository.findAll()
                .stream()
                .map(ActividadMapper::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * GET /actividad/find/{id}
     * Devuelve una actividad por ID.
     */
    @GetMapping("/find/{id}")
    public ResponseEntity<ActividadDTO> getActividadByID(@PathVariable(value = "id") Long actividadId)
            throws ActividadNotFoundException {

        ActividadDTO actividad = repository.findById(actividadId)
                .map(ActividadMapper::toDTO)
                .orElseThrow(() -> new ActividadNotFoundException(actividadId));

        return ResponseEntity.ok(actividad);
    }

    /**
     * GET /actividad/grupo/{idGrupo}
     * Devuelve todas las actividades asociadas a un grupo concreto.
     */
    @GetMapping("/grupo/{idGrupo}")
    public ResponseEntity<?> getActividadesByGrupo(@PathVariable Long idGrupo) {
        Optional<Grupo> grupoOpt = grupoRepository.findById(idGrupo);
        if (grupoOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        List<ActividadDTO> actividades = repository.findByGrupoId(idGrupo)
                .stream()
                .map(ActividadMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(actividades);
    }

    /**
     * POST /actividad
     * Crea una nueva actividad y la asocia al grupo indicado en idGrupo (si se proporciona).
     * Body: ActividadDTO + campo opcional idGrupo
     */
    @PostMapping
    public ResponseEntity<?> createActividad(@RequestBody ActividadCreationRequest request) {
        Actividad actividad = new Actividad();
        actividad.setNombre(request.getNombre());
        actividad.setDificultad(request.getDificultad());
        actividad.setIdProfesor(request.getIdProfesor());
        actividad.setDuracion(request.getDuracion());
        actividad.setFechaInicio(request.getFechaInicio());
        actividad.setFechaFin(request.getFechaFin());
        actividad.setFechaEntrega(request.getFechaEntrega());
        actividad.setPreguntas(request.getPreguntas());
        actividad.setRespuestas(request.getRespuestas());
        actividad.setPuntos(request.getPuntos());

        // Asociar al grupo si se indica
        if (request.getIdGrupo() != null) {
            grupoRepository.findById(request.getIdGrupo()).ifPresent(grupo -> {
                actividad.getGrupos().add(grupo);
            });
        }

        Actividad saved = repository.save(actividad);
        return ResponseEntity.ok(ActividadMapper.toDTO(saved));
    }

    /**
     * DTO interno para la creación de actividades (incluye idGrupo opcional).
     */
    public static class ActividadCreationRequest extends ActividadDTO {
        private Long idGrupo;

        public Long getIdGrupo() { return idGrupo; }
        public void setIdGrupo(Long idGrupo) { this.idGrupo = idGrupo; }
    }
}
