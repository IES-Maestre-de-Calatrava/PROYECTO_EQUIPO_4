package com.grupo4.frances.Controllers;

import com.grupo4.frances.DTO.GrupoDTO;
import com.grupo4.frances.Exceptions.GrupoNotFoundException;
import com.grupo4.frances.Mappers.GrupoMapper;
import com.grupo4.frances.Repositories.GrupoRepository;
import com.grupo4.frances.persistence.Grupo;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/grupos")
public class GrupoController {

    private final GrupoRepository repository;

    public GrupoController(GrupoRepository repository) {
        this.repository = repository;
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
                .orElseThrow(() -> new GrupoNotFoundException());
    }

    @PostMapping
    public GrupoDTO createGrupo(@RequestBody GrupoDTO grupoDTO) {
        Grupo grupo = GrupoMapper.toEntity(grupoDTO);
        return GrupoMapper.toDTO(repository.save(grupo));
    }

    @DeleteMapping("/{id}")
    public void deleteGrupo(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            throw new GrupoNotFoundException();
        }
        repository.deleteById(id);
    }
}