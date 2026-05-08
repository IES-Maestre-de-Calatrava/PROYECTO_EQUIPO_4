package com.grupo4.frances.Controllers;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

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

import com.grupo4.frances.DTO.InvitacionDTO;
import com.grupo4.frances.DTO.NotificacionesDTO;
import com.grupo4.frances.Exceptions.InvitacionNotFoundException;
import com.grupo4.frances.Mappers.InvitacionMapper;
import com.grupo4.frances.Mappers.NotificacionesMapper;
import com.grupo4.frances.Repositories.InvitacionRepository;
import com.grupo4.frances.Repositories.NotificacionesRepository;
import com.grupo4.frances.persistence.Invitacion;
import com.grupo4.frances.persistence.Invitacion.EstadoInvitacion;
import com.grupo4.frances.persistence.Notificaciones;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/invitaciones")
public class InvitacionesController {

    @Autowired
    private InvitacionRepository invitacionRepository;

    @Autowired
    private NotificacionesRepository notificacionesRepository;

    /**
     * Obtener todas las invitaciones
     * @return List de InvitacionDTO
     */
    @GetMapping("/find")
    public List<InvitacionDTO> getAllInvitaciones() {
        return invitacionRepository.findAll()
                .stream()
                .map(InvitacionMapper::toDTO)
                .toList();
    }

    /**
     * Obtener invitación por ID
     * @param invitacionId
     * @return InvitacionDTO
     * @throws InvitacionNotFoundException
     */
    @GetMapping("/find/{id}")
    public ResponseEntity<InvitacionDTO> getInvitacionByID(@PathVariable(value = "id") Long invitacionId)
            throws InvitacionNotFoundException {

        InvitacionDTO invitacion = invitacionRepository.findById(invitacionId)
                .map(InvitacionMapper::toDTO)
                .orElseThrow(() -> new InvitacionNotFoundException(invitacionId));

        return ResponseEntity.ok(invitacion);
    }

    /**
     * Obtener invitaciones pendientes de un alumno
     * @param idAlumno
     * @return List de InvitacionDTO
     */
    @GetMapping("/alumno/{idAlumno}/pendientes")
    public List<InvitacionDTO> getInvitacionesPendientes(@PathVariable(value = "idAlumno") Long idAlumno) {
        return invitacionRepository.buscarInvitacionesPendientes(idAlumno)
                .stream()
                .map(InvitacionMapper::toDTO)
                .toList();
    }

    /**
     * Enviar invitación a un alumno para unirse a un grupo
     * @param idGrupo
     * @param idAlumno
     * @param requestBody
     * @return InvitacionDTO creada
     */
    @PostMapping("/{idGrupo}/alumnos/{idAlumno}/invitacion")
    public ResponseEntity<InvitacionDTO> enviarInvitacion(
            @PathVariable(value = "idGrupo") Long idGrupo,
            @PathVariable(value = "idAlumno") Long idAlumno,
            @RequestBody Map<String, Object> requestBody) {

        Long idProfesor = parseLongValue(requestBody.get("idProfesor"));
        if (idProfesor == null) {
            return ResponseEntity.badRequest().build();
        }

        // Verificar si ya existe una invitación pendiente
        Invitacion invitacionExistente = invitacionRepository.buscarPorGrupoYAlumno(idGrupo, idAlumno);
        if (invitacionExistente != null && invitacionExistente.getEstado() == EstadoInvitacion.PENDIENTE) {
            return ResponseEntity.badRequest().build(); // Ya existe invitación pendiente
        }

        // Crear nueva invitación
        InvitacionDTO invitacionDTO = new InvitacionDTO();
        invitacionDTO.setIdGrupo(idGrupo);
        invitacionDTO.setIdAlumno(idAlumno);
        invitacionDTO.setIdProfesor(idProfesor);
        invitacionDTO.setEstado(EstadoInvitacion.PENDIENTE);
        invitacionDTO.setFechaEnvio(LocalDateTime.now());

        Invitacion invitacion = InvitacionMapper.toEntityCreate(invitacionDTO);
        Invitacion saved = invitacionRepository.save(invitacion);

        // Crear notificación para el alumno
        crearNotificacionInvitacion(saved);

        return ResponseEntity.ok(InvitacionMapper.toDTO(saved));
    }

    /**
     * Aceptar o rechazar invitación
     * @param idGrupo
     * @param idAlumno
     * @param requestBody
     * @return InvitacionDTO actualizada
     */
    @PutMapping("/{idGrupo}/alumnos/{idAlumno}/invitacion")
    public ResponseEntity<InvitacionDTO> responderInvitacion(
            @PathVariable(value = "idGrupo") Long idGrupo,
            @PathVariable(value = "idAlumno") Long idAlumno,
            @RequestBody Map<String, Object> requestBody) {

        String accion = (String) requestBody.get("accion"); // "aceptar" o "rechazar"

        Invitacion invitacion = invitacionRepository.buscarPorGrupoYAlumno(idGrupo, idAlumno);

        if (invitacion == null || invitacion.getEstado() != EstadoInvitacion.PENDIENTE) {
            return ResponseEntity.notFound().build();
        }

        EstadoInvitacion nuevoEstado = accion.equals("aceptar") ?
            EstadoInvitacion.ACEPTADA : EstadoInvitacion.RECHAZADA;

        invitacion.setEstado(nuevoEstado);
        invitacion.setFechaRespuesta(LocalDateTime.now());

        Invitacion updated = invitacionRepository.save(invitacion);

        // Crear notificación para el profesor
        crearNotificacionRespuesta(updated, accion);

        return ResponseEntity.ok(InvitacionMapper.toDTO(updated));
    }

    /**
     * Eliminar invitación
     * @param invitacionId
     * @return ResponseEntity sin contenido
     * @throws InvitacionNotFoundException
     */
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> deleteInvitacion(@PathVariable(value = "id") Long invitacionId)
            throws InvitacionNotFoundException {

        Invitacion invitacion = invitacionRepository.findById(invitacionId)
                .orElseThrow(() -> new InvitacionNotFoundException(invitacionId));

        invitacionRepository.delete(invitacion);
        return ResponseEntity.noContent().build();
    }

    // Métodos auxiliares para crear notificaciones

    private void crearNotificacionInvitacion(Invitacion invitacion) {
        NotificacionesDTO notificacionDTO = new NotificacionesDTO();
        notificacionDTO.setIdAlumno(invitacion.getIdAlumno());
        notificacionDTO.setTitulo("¡Nueva invitación a grupo!");
        notificacionDTO.setMensaje("Has sido invitado a unirte a un grupo. Revisa tus invitaciones pendientes.");
        notificacionDTO.setCodigo("invitacion_grupo");

        Notificaciones notificacion = NotificacionesMapper.toEntityCreate(notificacionDTO);
        notificacionesRepository.save(notificacion);
    }

    private void crearNotificacionRespuesta(Invitacion invitacion, String accion) {
        String titulo = accion.equals("aceptar") ? "Invitación aceptada" : "Invitación rechazada";
        String mensaje = accion.equals("aceptar") ?
            "Un alumno ha aceptado tu invitación para unirse al grupo." :
            "Un alumno ha rechazado tu invitación para unirse al grupo.";

        NotificacionesDTO notificacionDTO = new NotificacionesDTO();
        notificacionDTO.setIdAlumno(invitacion.getIdProfesor()); // Notificar al profesor
        notificacionDTO.setTitulo(titulo);
        notificacionDTO.setMensaje(mensaje);
        notificacionDTO.setCodigo("respuesta_invitacion");

        Notificaciones notificacion = NotificacionesMapper.toEntityCreate(notificacionDTO);
        notificacionesRepository.save(notificacion);
    }

    private Long parseLongValue(Object value) {
        if (value == null) {
            return null;
        }
        if (value instanceof Number number) {
            return number.longValue();
        }
        if (value instanceof String string && !string.isBlank()) {
            return Long.valueOf(string);
        }
        throw new IllegalArgumentException("El valor proporcionado no se puede convertir en Long");
    }
}