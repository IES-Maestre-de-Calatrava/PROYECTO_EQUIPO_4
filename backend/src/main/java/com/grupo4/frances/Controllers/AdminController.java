/*
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AlumnoRepository alumnoRepository;

    @Autowired
    private ProfesorRepository profesorRepository;

    // --- GESTIÓN DE ALUMNOS ---

    @PostMapping("/alumnos")
    public Alumno crearAlumno(@RequestBody Alumno alumno) {
        return alumnoRepository.save(alumno); // Usa JpaRepository
    }

    @DeleteMapping("/alumnos/{id}")
    public void borrarAlumno(@PathVariable Long id) {
        alumnoRepository.deleteById(id); // Usa JpaRepository
    }

    // --- GESTIÓN DE PROFESORES ---

    @PostMapping("/profesores")
    public Profesor crearProfesor(@RequestBody Profesor profesor) {
        return profesorRepository.save(profesor); // Usa JpaRepository
    }

    @DeleteMapping("/profesores/{id}")
    public void borrarProfesor(@PathVariable Long id) {
        profesorRepository.deleteById(id); // Usa JpaRepository
    }
}*/