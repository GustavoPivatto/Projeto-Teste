package br.com.Projeto_Tomaz.deploy.filmes;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;

@RestController
@RequestMapping("/filmes")
public class FilmesController {

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

}
