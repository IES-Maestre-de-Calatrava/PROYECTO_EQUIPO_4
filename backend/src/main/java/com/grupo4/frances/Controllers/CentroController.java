package com.grupo4.frances.Controllers;

import com.grupo4.frances.DTO.CentroDTO;
import com.grupo4.frances.Exceptions.CentroNotFoundException;
import com.grupo4.frances.Mappers.CentroMapper;
import com.grupo4.frances.Repositories.CentroRepository;
import com.grupo4.frances.persistence.Centro;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/centros")
public class CentroController {

    private final CentroRepository repository;

    public CentroController(CentroRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<CentroDTO> getAllCentros() {
        return repository.findAll().stream()
                .map(CentroMapper::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public CentroDTO getCentroById(@PathVariable Long id) {
        return repository.findById(id)
                .map(CentroMapper::toDTO)
                .orElseThrow(() -> new CentroNotFoundException());
    }

    @PostMapping
    public CentroDTO createCentro(@RequestBody CentroDTO centroDTO) {
        Centro centro = CentroMapper.toEntity(centroDTO);
        return CentroMapper.toDTO(repository.save(centro));
    }

    @DeleteMapping("/{id}")
    public void deleteCentro(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            throw new CentroNotFoundException();
        }
        repository.deleteById(id);
    }
}