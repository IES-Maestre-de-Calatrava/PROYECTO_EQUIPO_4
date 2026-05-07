package com.grupo4.frances.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grupo4.frances.DTO.NotificacionesDTO;
import com.grupo4.frances.Mappers.NotificacionesMapper;
import com.grupo4.frances.Repositories.NotificacionesRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/notificaciones")
public class NotificacionesController {

    @Autowired
    private NotificacionesRepository repository;

    /**
     * Obtener todas las notificaciones
     * @return List de NotificacionesDTO
     */
    @GetMapping("/find")
    public List<NotificacionesDTO> getAllNotificaciones() {
        return repository.findAll()
                .stream()
                .map(NotificacionesMapper::toDTO)
                .toList();
    }

    /**
     * Obtener notificación por ID
     * @param notificacionId
     * @return NotificacionesDTO
     */
    @GetMapping("/find/{id}")
    public ResponseEntity<NotificacionesDTO> getNotificacionByID(@PathVariable(value = "id") Long notificacionId) {

        NotificacionesDTO notificacion = repository.findById(notificacionId)
                .map(NotificacionesMapper::toDTO)
                .orElse(null);

        return ResponseEntity.ok(notificacion);
    }

    /**
     * Obtener notificaciones por ID de alumno
     * @param idAlumno
     * @return List de NotificacionesDTO
     */
    @GetMapping("/alumno/{idAlumno}")
    public List<NotificacionesDTO> getNotificacionesByAlumno(@PathVariable(value = "idAlumno") String idAlumno) {
        return repository.buscarPorIdAlumno(idAlumno)
                .stream()
                .map(NotificacionesMapper::toDTO)
                .toList();
    }

    /**
     * Crear una nueva notificación
     * @param notificacionDTO
     * @return NotificacionesDTO creado
     */
    @PostMapping("/crear")
    public ResponseEntity<NotificacionesDTO> createNotificacion(@RequestBody NotificacionesDTO notificacionDTO) {
        var notificacion = NotificacionesMapper.toEntityCreate(notificacionDTO);
        var saved = repository.save(notificacion);
        return ResponseEntity.ok(NotificacionesMapper.toDTO(saved));
    }

    /**
     * Actualizar una notificación
     * @param notificacionId
     * @param notificacionDTO
     * @return NotificacionesDTO actualizado
     */
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<NotificacionesDTO> updateNotificacion(
            @PathVariable(value = "id") Long notificacionId,
            @RequestBody NotificacionesDTO notificacionDTO) {

        var notificacion = repository.findById(notificacionId).orElse(null);

        if (notificacion == null) {
            return ResponseEntity.notFound().build();
        }

        notificacion.setIdAlumno(notificacionDTO.getIdAlumno());
        notificacion.setTitulo(notificacionDTO.getTitulo());
        notificacion.setMensaje(notificacionDTO.getMensaje());
        notificacion.setCodigo(notificacionDTO.getCodigo());

        var updated = repository.save(notificacion);
        return ResponseEntity.ok(NotificacionesMapper.toDTO(updated));
    }

    /**
     * Eliminar una notificación
     * @param notificacionId
     * @return ResponseEntity sin contenido
     */
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> deleteNotificacion(@PathVariable(value = "id") Long notificacionId) {

        var notificacion = repository.findById(notificacionId).orElse(null);

        if (notificacion == null) {
            return ResponseEntity.notFound().build();
        }

        repository.delete(notificacion);
        return ResponseEntity.noContent().build();
    }
}
