package br.com.Projeto_Tomaz.deploy.filmes;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;



@RestController
@RequestMapping("/api/filmes")
public class FilmesController {

    @ResponseStatus(HttpStatus.NOT_FOUND)
    public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
        }
    }

    @Autowired
    private FilmeRepository repository;

    @GetMapping("/")
    public List<Filme> list() {
        return this.repository.findAll();
    }
    

    @PostMapping("/")
    public Filme create(@RequestBody Filme filme) {
        return this.repository.save(filme);
    }

    @PutMapping("/{id}")
    public Filme updateFilme(@PathVariable("id") UUID id, @RequestBody Filme updatedFilme) {
        Filme existingFilme = repository.findByUuid(id);
        if (existingFilme != null) {
            // Update fields of existingFilme with values from updatedFilme
            // Id,Titulo,Diretor,AnoLancamento,pais,FilmeId
            existingFilme.setTitulo(updatedFilme.getTitulo());
            existingFilme.setFilme_id(updatedFilme.getFilmeId());
            existingFilme.setDiretor(updatedFilme.getDiretor());
            existingFilme.setAnoLancamento(updatedFilme.getAnoLancamento());
            existingFilme.setPais(updatedFilme.getPais());
            

            // Save the updated filme
            return repository.save(existingFilme);
        } else {
            // Handle filme not found error
            throw new ResourceNotFoundException("Filme not found with id: " + id);
        }
    }
    
    @GetMapping("/{id}")
    public Filme findFilmeById(@PathVariable("id") UUID id) {
        return repository.findByUuid(id);
    }
    
    // Delete filme by UUID
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFilmeById(@PathVariable("id") UUID id) {
        Filme existingFilme = repository.findByUuid(id);
        if (existingFilme != null) {
            repository.delete(existingFilme);
        } else {
            throw new ResourceNotFoundException("Filme not found with id: " + id);
        }
    }
}


