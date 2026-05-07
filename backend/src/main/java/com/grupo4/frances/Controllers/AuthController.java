package com.grupo4.frances.Controllers;

import com.grupo4.frances.Repositories.AlumnoRepository;
import com.grupo4.frances.Repositories.ConexionRepository;
import com.grupo4.frances.Repositories.ProfesorRepository;
import com.grupo4.frances.persistence.Alumno;
import com.grupo4.frances.persistence.Conexion;
import com.grupo4.frances.persistence.Profesor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.HexFormat;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final DateTimeFormatter FORMATO_FECHA = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private final AlumnoRepository alumnoRepository;
    private final ConexionRepository conexionRepository;
    private final ProfesorRepository profesorRepository;

    public AuthController(AlumnoRepository alumnoRepository, ConexionRepository conexionRepository,
                          ProfesorRepository profesorRepository) {
        this.alumnoRepository = alumnoRepository;
        this.conexionRepository = conexionRepository;
        this.profesorRepository = profesorRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credenciales) {
        String correo = limpiar(credenciales.get("correo"));
        String contrasena = limpiar(credenciales.get("contrasena"));

        if (correo == null || contrasena == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Correo y contrasena son obligatorios"));
        }

        Alumno alumno = alumnoRepository.findByCorreo(correo).orElse(null);
        if (alumno != null && contrasenaCorrecta(contrasena, alumno.getContrasena())) {
            registrarConexionAlumno(alumno);

            Map<String, Object> respuesta = new HashMap<>();
            respuesta.put("id", alumno.getIdAlumno());
            respuesta.put("nombre", alumno.getNombre());
            respuesta.put("apellidos", alumno.getApellidos());
            respuesta.put("correo", alumno.getCorreo());
            respuesta.put("rol", "ALUMNO");
            respuesta.put("nivel", alumno.getNivel());
            respuesta.put("rango", alumno.getRango());
            return ResponseEntity.ok(respuesta);
        }

        Profesor profesor = profesorRepository.findByCorreo(correo).orElse(null);
        if (profesor != null && contrasenaCorrecta(contrasena, profesor.getContrasena())) {
            Map<String, Object> respuesta = new HashMap<>();
            respuesta.put("id", profesor.getIdProfesor());
            respuesta.put("nombre", profesor.getNombre());
            respuesta.put("apellidos", profesor.getApellidos());
            respuesta.put("correo", profesor.getCorreo());
            respuesta.put("rol", profesor.isDirector() ? "DIRECTOR" : "PROFESOR");
            respuesta.put("instituto", profesor.getInstituto());
            return ResponseEntity.ok(respuesta);
        }

        return ResponseEntity.status(401)
                .body(Map.of("error", "Correo o contrasena incorrectos"));
    }

    @PostMapping("/registro")
    public ResponseEntity<?> registrarAlumno(@RequestBody Map<String, String> datos) {
        String nombre = limpiar(datos.get("nombre"));
        String apellidos = limpiar(datos.get("apellidos"));
        String correo = limpiar(datos.get("correo"));
        String contrasena = limpiar(datos.get("contrasena"));
        String nombreUsuario = limpiar(datos.get("nombreUsuario"));
        String instituto = limpiar(datos.get("instituto"));
        String telefonoTexto = limpiar(datos.get("telefono"));
        String nivel = limpiar(datos.get("nivel"));
        String rango = limpiar(datos.get("rango"));

        if (nombre == null || apellidos == null || correo == null || contrasena == null || nombreUsuario == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Nombre, apellidos, correo, contrasena y nombreUsuario son obligatorios"));
        }

        if (alumnoRepository.findByCorreo(correo).isPresent() || profesorRepository.findByCorreo(correo).isPresent()) {
            return ResponseEntity.status(409)
                    .body(Map.of("error", "Ya existe un usuario con ese correo"));
        }

        Alumno alumno = new Alumno();
        alumno.setNombre(nombre);
        alumno.setApellidos(apellidos);
        alumno.setCorreo(correo);
        alumno.setContrasena(sha256(contrasena));
        alumno.setNombreUsuario(nombreUsuario);
        alumno.setInstituto(instituto == null ? "" : instituto);
        alumno.setTelefono(parseTelefono(telefonoTexto));
        alumno.setNivel(nivel == null ? "A1" : nivel);
        alumno.setRango(rango == null ? "Novato" : rango);

        Alumno guardado = alumnoRepository.save(alumno);

        Map<String, Object> respuesta = new HashMap<>();
        respuesta.put("id", guardado.getIdAlumno());
        respuesta.put("nombre", guardado.getNombre());
        respuesta.put("apellidos", guardado.getApellidos());
        respuesta.put("correo", guardado.getCorreo());
        respuesta.put("rol", "ALUMNO");
        respuesta.put("nivel", guardado.getNivel());
        respuesta.put("rango", guardado.getRango());

        return ResponseEntity.ok(respuesta);
    }

    private void registrarConexionAlumno(Alumno alumno) {
        Conexion conexion = new Conexion();
        conexion.setIdAlumno(alumno.getIdAlumno());
        conexion.setEntrada(LocalDateTime.now().format(FORMATO_FECHA));
        conexionRepository.save(conexion);
    }

    private boolean contrasenaCorrecta(String contrasenaRecibida, String contrasenaGuardada) {
        if (contrasenaGuardada == null) {
            return false;
        }

        return contrasenaGuardada.equals(contrasenaRecibida)
                || contrasenaGuardada.equals(sha256(contrasenaRecibida));
    }

    private String limpiar(String valor) {
        if (valor == null || valor.trim().isEmpty()) {
            return null;
        }

        return valor.trim();
    }

    private int parseTelefono(String telefonoTexto) {
        if (telefonoTexto == null) {
            return 0;
        }

        try {
            return Integer.parseInt(telefonoTexto);
        } catch (NumberFormatException error) {
            return 0;
        }
    }

    private String sha256(String texto) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(texto.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hash);
        } catch (NoSuchAlgorithmException error) {
            throw new IllegalStateException("No se pudo calcular SHA-256", error);
        }
    }
}
