package com.hospital.receitas.service;

import com.hospital.receitas.model.Receita;
import com.hospital.receitas.repository.ReceitaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReceitaService {


    private final ReceitaRepository repository;

    public ReceitaService(ReceitaRepository repository) {
        this.repository = repository;
    }

    public Receita salvar(Receita receita) {
        //Verifica se o médicamento ja não foi cadastrado
        if (receita != null)
            return repository.save(receita);
        return null;
    }

    public List<Receita> exibirMedicamentos(){
        return  repository.findAll();
    }

    public List<Receita> exibirReceitas() {
        return repository.findAll();
    }
}
