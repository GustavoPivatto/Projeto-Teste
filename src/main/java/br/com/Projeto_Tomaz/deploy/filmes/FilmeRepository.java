package br.com.Projeto_Tomaz.deploy.filmes;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FilmeRepository extends JpaRepository<Filme, UUID> {

Filme findByUuid(UUID id);
}
