package com.hospital.receitas.controller;

import com.hospital.receitas.dto.MedicamentoDTO;
import com.hospital.receitas.dto.ReceitaDTO;
import com.hospital.receitas.model.Medicamento;
import com.hospital.receitas.model.Receita;
import com.hospital.receitas.service.MedicamentoService;
import com.hospital.receitas.service.ReceitaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/receita")
public class ReceitaController {

    private final ReceitaService service;
    private final MedicamentoService medicamentoService;

    public ReceitaController(ReceitaService service, MedicamentoService medicamentoService) {
        this.service = service;
        this.medicamentoService = medicamentoService;
    }
    //Inserir dados da Receita
    @PostMapping
    public ResponseEntity<Receita> criarReceita(@RequestBody ReceitaDTO dto){
        if (dto != null) {
            Receita receita = new Receita(dto.dataReceita(), dto.medicoCRM(), dto.pacienteNome());
            List<Medicamento> medicamentos = new ArrayList<>();
            //Busca medicamentos
            List<String> nomeMed = dto.medicamentos();
            //Itera sobre a lista de nomes para buscar os medicamentos
            nomeMed.forEach(med -> {
                Optional<Medicamento> encontrado = medicamentoService.buscarPorNome(med);
                if (encontrado.isPresent()){
                    medicamentos.add(encontrado.get());
                }
            });
            //coloca a lista de medicamentos na receita
            receita.setMedicamentos(medicamentos);
            Receita salvo = service.salvar(receita);
            if (salvo != null) {
                return ResponseEntity.status(201).body(salvo);
            }
        }
        return ResponseEntity.badRequest().build();
    }
    //Consultar todas as Receitas
    @GetMapping
    public ResponseEntity<List<ReceitaDTO>> exibirMedicamentos(){
        List<Receita> receitas = service.exibirReceitas();
        List<ReceitaDTO> dtos = new ArrayList<>();
        receitas.forEach(receita -> {
            List<String> medicamentos = new ArrayList<>();
            receita.getMedicamentos().forEach(medicamento -> {
                medicamentos.add(medicamento.getNome());
            });
            dtos.add(new ReceitaDTO(receita.getDataReceita(), medicamentos, receita.getMedicoCRM(), receita.getPacienteNome()
                     ));
        });
        return ResponseEntity.status(200).body(dtos);
    }
    //Consultar dados de uma Receita
    @GetMapping("/{id}")
    public ResponseEntity<ReceitaDTO> exibirReceita(@PathVariable Long id){
        Optional<Receita> encontrado = service.buscarPorId(id);
        if(encontrado.isEmpty())
            return ResponseEntity.notFound().build();
        Receita receita = encontrado.get();
        List<String> medicamentos = new ArrayList<>();
        receita.getMedicamentos().forEach(medicamento -> medicamentos.add(medicamento.getNome()));
        return ResponseEntity.status(200).body(new ReceitaDTO(receita.getDataReceita(), medicamentos, receita.getMedicoCRM(), receita.getPacienteNome()
        ));
    }

    //Chamada da procedure
    @GetMapping("/paciente/{nome}")
    public ResponseEntity<List<ReceitaDTO>> exibirReceitasDoPaciente(@PathVariable String nome){
        List<Receita> receitas = service.buscarPorNomePaciente(nome);
        if(receitas.isEmpty())
            return ResponseEntity.notFound().build();
        List<ReceitaDTO> dtos = new ArrayList<>();
        receitas.forEach(receita -> {
            List<String> medicamentos = new ArrayList<>();
            receita.getMedicamentos().forEach(medicamento -> {
                medicamentos.add(medicamento.getNome());
            });
            dtos.add(new ReceitaDTO(receita.getDataReceita(), medicamentos, receita.getMedicoCRM(), receita.getPacienteNome()
            ));
        });
        return ResponseEntity.status(200).body(dtos);
    }
    //Atualizar dados de uma receita
    @PutMapping("/{id}")
    public ResponseEntity<ReceitaDTO> atualizar(@PathVariable Long id, @RequestBody ReceitaDTO dados) {

        Optional<Receita> receita = service.buscarPorId(id);
        if (receita.isEmpty()){
            return ResponseEntity.badRequest().build();
        }
        Receita encontrado = receita.get();

        if (dados.dataReceita() != null)
            encontrado.setDataReceita(dados.dataReceita());
        if (dados.medicamentos() != null){
            List<Medicamento> novosMed = new ArrayList<>();
            dados.medicamentos().forEach(nome ->{
                Optional<Medicamento> medicamento = medicamentoService.buscarPorNome(nome);
                if (medicamento.isPresent()){
                    novosMed.add(medicamento.get());
                }
            });
            encontrado.getMedicamentos().clear();
            encontrado.setMedicamentos(novosMed);
        }
        if (dados.medicoCRM() != null)
            encontrado.setMedicoCRM(dados.medicoCRM());
        if (dados.pacienteNome() != null)
            encontrado.setPacienteNome(dados.pacienteNome());
        service.atualizar(encontrado);

        return ResponseEntity.ok().body(
                new ReceitaDTO(encontrado.getDataReceita(), dados.medicamentos(), encontrado.getMedicoCRM(), encontrado.getPacienteNome()
        ));
    }
    //Exclusão de uma receita
    @DeleteMapping("/{id}")
    public ResponseEntity<MedicamentoDTO> deletar(@PathVariable Long id) {

        Optional<Receita> receita = service.buscarPorId(id);
        if (receita.isPresent()){
            service.deletar(receita.get().getId());
        } else{
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

}
