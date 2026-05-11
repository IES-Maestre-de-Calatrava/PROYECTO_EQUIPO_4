package com.grupo4.frances.Controllers;

import com.grupo4.frances.JSON.LoginCredentials;
import com.grupo4.frances.Mappers.GrupoMapper;
import com.grupo4.frances.Repositories.AlumnoRepository;
import com.grupo4.frances.Repositories.ConexionRepository;
import com.grupo4.frances.Repositories.GrupoRepository;
import com.grupo4.frances.Repositories.ProfesorRepository;
import com.grupo4.frances.persistence.Alumno;
import com.grupo4.frances.persistence.Conexion;
import com.grupo4.frances.persistence.Grupo;
import com.grupo4.frances.persistence.Profesor;
import jakarta.transaction.Transactional;
import org.apache.coyote.Response;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import static com.grupo4.frances.utilidades.Seguridad.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final DateTimeFormatter FORMATO_FECHA = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private final AlumnoRepository alumnoRepository;
    private final ConexionRepository conexionRepository;
    private final ProfesorRepository profesorRepository;
    private final GrupoRepository grupoRepository;

    public AuthController(AlumnoRepository alumnoRepository, ConexionRepository conexionRepository,
                          ProfesorRepository profesorRepository, GrupoRepository grupoRepository) {
        this.alumnoRepository = alumnoRepository;
        this.conexionRepository = conexionRepository;
        this.profesorRepository = profesorRepository;
        this.grupoRepository = grupoRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginCredentials credenciales) {

        String correo    = credenciales.getCorreo();
        String contrasena = credenciales.getContrasena();

        if (correo == null || contrasena == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Correo y contraseña son obligatorios"));
        }

        // ✅ Buscar primero en Alumno
        Alumno alumno = alumnoRepository.findByCorreo(correo).orElse(null);

        if (alumno != null && alumno.getContrasena().equals(contrasena)) {
            registrarConexion(alumno);

            Conexion conexion = conexionRepository.buscarPorIdAlumno(alumno.getIdAlumno()).orElse(null);
            List<Grupo> grupo = grupoRepository.buscarGruposPorAlumno(alumno.getIdAlumno());

            Map<String, Object> respuesta = new HashMap<>();
            respuesta.put("id",        alumno.getIdAlumno());
            respuesta.put("nombre",    alumno.getNombre());
            respuesta.put("apellidos", alumno.getApellidos());
            respuesta.put("correo",    alumno.getCorreo());
            respuesta.put("rol",       "ALUMNO");
            respuesta.put("nivel",     alumno.getNivel());
            respuesta.put("rango",     alumno.getRango());
            respuesta.put("id_sesion", conexion.getIdsesion());
            respuesta.put("id_grupo", grupo.get(0).getIdGrupo());
            return ResponseEntity.ok(respuesta);
        }

        // ✅ Buscar en Profesor
        Profesor profesor = profesorRepository.findByCorreo(correo).orElse(null);

        if (profesor != null && profesor.getContrasena().equals(contrasena)) {
            registrarConexion(profesor);
            Conexion conexion = conexionRepository.buscarPorIdAlumno(profesor.getIdProfesor()).orElse(null);

            Map<String, Object> respuesta = new HashMap<>();
            respuesta.put("id",        profesor.getIdProfesor());
            respuesta.put("nombre",    profesor.getNombre());
            respuesta.put("apellidos", profesor.getApellidos());
            respuesta.put("correo",    profesor.getCorreo());
            respuesta.put("rol",       profesor.isDirector() ? "DIRECTOR" : "PROFESOR");
            respuesta.put("instituto", profesor.getInstituto());
            respuesta.put("id_sesion", conexion.getIdsesion());
            return ResponseEntity.ok(respuesta);
        }

        // ❌ No encontrado en ninguna tabla
        return ResponseEntity.status(401)
                .body(Map.of("error", "Correo o contraseña incorrectos"));
    }

    @GetMapping("/getUser")
    public ResponseEntity<?> getUserFromUUID(@RequestBody String UUID){
        Conexion conexion = conexionRepository.buscarPoridsesion(UUID).orElse(null);
        if(!(conexion != null && conexion.getIdsesion().equals(UUID))){
            return ResponseEntity.status(401).body(Map.of("error", "No existe el UUID en la base de datos"));
        }

        // Buscar si es un alumno
        Alumno alumno = alumnoRepository.findById(conexion.getIdAlumno()).orElse(null);

        if(alumno != null){
            Map<String, Object> respuesta = new HashMap<>();
            respuesta.put("id",        alumno.getIdAlumno());
            respuesta.put("nombre",    alumno.getNombre());
            respuesta.put("apellidos", alumno.getApellidos());
            respuesta.put("correo",    alumno.getCorreo());
            respuesta.put("rol",       "ALUMNO");
            respuesta.put("nivel",     alumno.getNivel());
            respuesta.put("rango",     alumno.getRango());
            respuesta.put("id_sesion", conexion.getIdsesion());
            return ResponseEntity.ok(respuesta);
        }

        // Buscar si es un profesor
        Profesor profesor = profesorRepository.findById(conexion.getIdAlumno()).orElse(null);

        if(profesor != null){
            Map<String, Object> respuesta = new HashMap<>();
            respuesta.put("id",        profesor.getIdProfesor());
            respuesta.put("nombre",    profesor.getNombre());
            respuesta.put("apellidos", profesor.getApellidos());
            respuesta.put("correo",    profesor.getCorreo());
            respuesta.put("rol",       profesor.isDirector() ? "DIRECTOR" : "PROFESOR");
            respuesta.put("instituto", profesor.getInstituto());
            respuesta.put("id_sesion", conexion.getIdsesion());
            return ResponseEntity.ok(respuesta);
        }
        return ResponseEntity.badRequest()
                .body(Map.of("error", "Error en la query"));
    }

    private void registrarConexion(Alumno alumno) {
        Conexion conexion = new Conexion();
        conexion.setIdAlumno(alumno.getIdAlumno());
        conexion.setEntrada(LocalDateTime.now().format(FORMATO_FECHA));
        conexion.setIdsesion(generarUUID());
        conexionRepository.save(conexion);
    }

    private void registrarConexion(Profesor profesor) {
        Conexion conexion = new Conexion();
        conexion.setIdAlumno(profesor.getIdProfesor());
        conexion.setEntrada(LocalDateTime.now().format(FORMATO_FECHA));
        conexion.setIdsesion(generarUUID());
        conexionRepository.save(conexion);
    }
}
