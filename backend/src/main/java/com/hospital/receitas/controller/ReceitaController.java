package com.hospital.receitas.controller;

import com.hospital.receitas.dto.ReceitaDTO;
import com.hospital.receitas.dto.ReceitaRequestDTO;
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
    public ResponseEntity<Receita> criarReceita(@RequestBody ReceitaRequestDTO dto){
        if (dto != null) {
            Receita receita = new Receita(dto.dataReceita(), dto.medicoNome(), dto.pacienteNome(), dto.observacoes());
            List<Medicamento> medicamentos = new ArrayList<>();
            //Busca medicamentos
            List<Long> medsIds = dto.medicamentoIds() ;
            //Itera sobre a lista de ids para buscar os medicamentos
            medsIds.forEach(id -> {
                Optional<Medicamento> encontrado = medicamentoService.buscarPorId(id);
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
        //Caso chegue aqui deu algo de errado
        return ResponseEntity.badRequest().build();
    }
    //Consultar todas as Receitas(Relatorio)
    @GetMapping
    public ResponseEntity<List<ReceitaDTO>> exibirMedicamentos(){
        List<Receita> receitas = service.exibirReceitas();
        List<ReceitaDTO> dtos = new ArrayList<>();
        receitas.forEach(receita -> {
            //Cria a lista de medicamentos com a lista do DTO
            List<Medicamento> medicamentos = receita.getMedicamentos();
            dtos.add(new ReceitaDTO(receita.getId(), receita.getDataReceita(), medicamentos, receita.getMedicoNome(), receita.getPacienteNome(), receita.getObservacoes()
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
        return ResponseEntity.status(200).body(new ReceitaDTO(receita.getId(), receita.getDataReceita(), receita.getMedicamentos(), receita.getMedicoNome(), receita.getPacienteNome(), receita.getObservacoes()
        ));
    }

    //Chamada da procedure 1, vai exibir apenas as receitas do paciente cujo o nome será informado
    @GetMapping("/paciente/{nome}")
    public ResponseEntity<List<ReceitaDTO>> exibirReceitasDoPaciente(@PathVariable String nome){
        //Chama o método do service
        List<Receita> receitas = service.buscarPorNomePaciente(nome);
        //Caso retorne uma lista vazia exibe HTTP 404
        if(receitas.isEmpty())
            return ResponseEntity.notFound().build();
        //Caso a lista tenha conteúdo, transforma de Receita para ReceitaDTO
        List<ReceitaDTO> dtos = new ArrayList<>();
        receitas.forEach(receita -> dtos.add(new ReceitaDTO(receita.getId(), receita.getDataReceita(), receita.getMedicamentos(), receita.getMedicoNome(), receita.getPacienteNome(), receita.getObservacoes()
        )));
        //Retorna HTTP OK com a lista de ReceitaDTO
        return ResponseEntity.status(200).body(dtos);
    }

    //Chamada da procedure 2, vai exibir apenas as receitas do medico cujo o nome será informado
    @GetMapping("/medico/{nome}")
    public ResponseEntity<List<ReceitaDTO>> exibirReceitasDoMedico(@PathVariable String nome){
        //Chama o método do service
        List<Receita> receitas = service.buscarPorNomeMedico(nome);
        //Caso retorne uma lista vazia exibe HTTP 404
        if(receitas.isEmpty())
            return ResponseEntity.notFound().build();
        //Caso a lista tenha conteúdo, transforma de Receita para ReceitaDTO
        List<ReceitaDTO> dtos = new ArrayList<>();
        receitas.forEach(receita -> dtos.add(new ReceitaDTO(receita.getId(), receita.getDataReceita(), receita.getMedicamentos(), receita.getMedicoNome(), receita.getPacienteNome(), receita.getObservacoes()
        )));
        //Retorna HTTP OK com a lista de ReceitaDTO
        return ResponseEntity.status(200).body(dtos);
    }


    //Atualizar dados de uma receita
    @PutMapping("/{id}")
    public ResponseEntity<ReceitaDTO> atualizar(@PathVariable Long id, @RequestBody ReceitaRequestDTO dados) {

        Optional<Receita> receita = service.buscarPorId(id);
        if (receita.isEmpty()){
            return ResponseEntity.badRequest().build();
        }
        Receita encontrado = receita.get();

        if (dados.dataReceita() != null)
            encontrado.setDataReceita(dados.dataReceita());
        if (dados.medicamentoIds() != null){
            List<Medicamento> novosMed = new ArrayList<>();
            //Busca os medicamentos informados e adiciona eles na lista acima, apenas os que forem encontrados
            dados.medicamentoIds().forEach(medId ->{
                Optional<Medicamento> medicamento = medicamentoService.buscarPorId(medId);
                if (medicamento.isPresent()){
                    novosMed.add(medicamento.get());
                }
            });
            //Limpa a lista de medicamentos da receita
            encontrado.getMedicamentos().clear();
            //Coloca a nova lista na receita
            encontrado.setMedicamentos(novosMed);
        }
        if (dados.medicoNome() != null)
            encontrado.setMedicoNome(dados.medicoNome());
        if (dados.pacienteNome() != null)
            encontrado.setPacienteNome(dados.pacienteNome());
        if (dados.observacoes() != null)
            encontrado.setObservacoes(dados.observacoes());
        service.atualizar(encontrado);

        return ResponseEntity.ok().body(
                new ReceitaDTO(encontrado.getId(), encontrado.getDataReceita(),encontrado.getMedicamentos(), encontrado.getMedicoNome(), encontrado.getPacienteNome(), encontrado.getObservacoes()
        ));
    }
    //Exclusão de uma receita
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {

        Optional<Receita> receita = service.buscarPorId(id);
        if (receita.isPresent()){
            service.deletar(receita.get().getId());
        } else{
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

}
