package com.grupo4.frances.Controllers;

import com.grupo4.frances.Repositories.AlumnoRepository;
import com.grupo4.frances.Repositories.ProfesorRepository;
import com.grupo4.frances.persistence.Alumno;
import com.grupo4.frances.persistence.Profesor;
import static com.grupo4.frances.utilidades.Seguridad.*;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AlumnoRepository alumnoRepository;
    private final ProfesorRepository profesorRepository;

    public AdminController(AlumnoRepository alumnoRepository, ProfesorRepository profesorRepository) {
        this.alumnoRepository = alumnoRepository;
        this.profesorRepository = profesorRepository;
    }

    @PostMapping("/alumnos")
    @Transactional
    public ResponseEntity<?> crearAlumno(@RequestParam Long idDirector, @RequestBody Alumno alumno) {
        ResponseEntity<?> errorPermisos = validarDirector(idDirector);
        if (errorPermisos != null) return errorPermisos;

        alumno.setIdAlumno(null);
        alumno.setContrasena(sha256(alumno.getContrasena()));
        Alumno guardado = alumnoRepository.save(alumno);
        return ResponseEntity.ok(guardado);
    }

    @DeleteMapping("/alumnos/{id}")
    public ResponseEntity<?> borrarAlumno(@RequestParam Long idDirector, @PathVariable Long id) {
        ResponseEntity<?> errorPermisos = validarDirector(idDirector);
        if (errorPermisos != null) {
            return errorPermisos;
        }

        if (!alumnoRepository.existsById(id)) {
            return ResponseEntity.status(404).body(Map.of("error", "Alumno no encontrado"));
        }

        alumnoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/profesores")
    public ResponseEntity<?> crearProfesor(@RequestParam Long idDirector, @RequestBody Profesor profesor) {
        ResponseEntity<?> errorPermisos = validarDirector(idDirector);
        if (errorPermisos != null) return errorPermisos;

        profesor.setIdProfesor(null);
        profesor.setContrasena(sha256(profesor.getContrasena()));
        Profesor guardado = profesorRepository.save(profesor);
        return ResponseEntity.ok(guardado);
    }

    @DeleteMapping("/profesores/{id}")
    public ResponseEntity<?> borrarProfesor(@RequestParam Long idDirector, @PathVariable Long id) {
        ResponseEntity<?> errorPermisos = validarDirector(idDirector);
        if (errorPermisos != null) {
            return errorPermisos;
        }

        if (idDirector.equals(id)) {
            return ResponseEntity.status(409).body(Map.of("error", "El director no puede eliminarse a si mismo"));
        }

        if (!profesorRepository.existsById(id)) {
            return ResponseEntity.status(404).body(Map.of("error", "Profesor no encontrado"));
        }

        profesorRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private ResponseEntity<?> validarDirector(Long idDirector) {
        Profesor director = profesorRepository.findById(idDirector).orElse(null);
        if (director == null || !director.isDirector()) {
            return ResponseEntity.status(403).body(Map.of("error", "Solo un director puede realizar esta accion"));
        }

        return null;
    }
}
