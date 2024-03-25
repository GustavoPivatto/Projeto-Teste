package br.com.Projeto_Tomaz.deploy.filmes;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.Id;

@Entity(name = "filmes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Filme {

    @Id
        @GeneratedValue(generator = "UUID")
    private UUID id;
    private String filme_id;
    private String titulo;
    private String diretor;
    private int ano_lancamento;
    private String pais;

}
