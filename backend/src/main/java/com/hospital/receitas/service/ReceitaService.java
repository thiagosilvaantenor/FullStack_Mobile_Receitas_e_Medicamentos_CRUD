package com.hospital.receitas.service;

import com.hospital.receitas.model.Receita;
import com.hospital.receitas.repository.ReceitaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public List<Receita> exibirReceitas() {
        return repository.findAll();
    }

    public Optional<Receita> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public void atualizar(Receita receita){
        repository.save(receita);
    }

    public void deletar(Long id){
        repository.deleteById(id);
    }

    public List<Receita> buscarPorNomePaciente(String paciente) {
        return repository.buscaReceitaPeloNomePaciente(paciente);
    }

    public List<Receita> buscarPorNomeMedico(String medico) {
        return repository.buscaReceitaPeloNomeMedico(medico);
    }
}
