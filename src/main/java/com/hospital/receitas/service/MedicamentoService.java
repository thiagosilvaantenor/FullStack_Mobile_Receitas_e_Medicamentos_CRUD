package com.hospital.receitas.service;

import com.hospital.receitas.model.Medicamento;
import com.hospital.receitas.repository.MedicamentoRepository;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class MedicamentoService {

    private final MedicamentoRepository repository;

    public MedicamentoService(MedicamentoRepository repository) {
        this.repository = repository;
    }

    public Medicamento salvar(Medicamento medicamento) {
        //Verifica se o médicamento ja não foi cadastrado
        if (repository.findByNome(medicamento.getNome()).isEmpty()){
            return repository.save(medicamento);
        }
        return null;
    }

    public List<Medicamento> exibirMedicamentos(){
        return  repository.findAll();
    }

    public Optional<Medicamento> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public void deletar(Long id) {
        Optional<Medicamento> medicamento= repository.findById(id);
        if (medicamento.isPresent()){
            //Itera sobre as receitas que contem o médicamento a ser removido
            medicamento.get().getReceitas().forEach( receita -> {
                    //remove o medicamento da lista da receita
                    receita.getMedicamentos().remove(medicamento.get());
            });
            //Remove do bd o medicamento
            repository.delete(medicamento.get());

        }
    }

    public Optional<Medicamento> buscarPorNome(String nome) {
        return repository.findByNome(nome);
    }

    public void atualizar(Medicamento atualizado) {
        repository.save(atualizado);
    }
}
