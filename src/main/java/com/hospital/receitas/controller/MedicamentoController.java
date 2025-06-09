package com.hospital.receitas.controller;

import com.hospital.receitas.dto.MedicamentoDTO;
import com.hospital.receitas.model.Medicamento;
import com.hospital.receitas.service.MedicamentoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController()
@RequestMapping("/medicamento")
public class MedicamentoController {

    private final MedicamentoService service;

    public MedicamentoController(MedicamentoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Medicamento> criarMedicamento(@RequestBody MedicamentoDTO dto){
        if (dto != null) {
            Medicamento salvo = service.salvar( new Medicamento(dto));
            if (salvo != null) {
                return ResponseEntity.status(201).body(salvo);
            }
        }
        return ResponseEntity.badRequest().build();
    }
    @GetMapping
    public ResponseEntity<List<MedicamentoDTO>> exibirMedicamentos(){
        List<MedicamentoDTO> medicamentos = new ArrayList<>();
        service.exibirMedicamentos().forEach( medicamento -> {
            medicamentos.add(new MedicamentoDTO(
                    medicamento.getNome(), medicamento.getComposicao(), medicamento.getTipo(), medicamento.getQuantidade()
                    ));
        });
        return ResponseEntity.status(200).body(medicamentos);
    }
    @GetMapping("/{id}")
    public ResponseEntity<MedicamentoDTO> exibirMedicamento(@PathVariable Long id){
        Optional<Medicamento> encontrado = service.buscarPorId(id);
        if(encontrado.isEmpty())
            return ResponseEntity.notFound().build();
        Medicamento medicamento = encontrado.get();
        return ResponseEntity.status(200).body(new MedicamentoDTO(
                medicamento.getNome(), medicamento.getComposicao(), medicamento.getTipo(), medicamento.getQuantidade()
        ));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicamentoDTO> atualizar(@PathVariable Long id, @RequestBody MedicamentoDTO dados) {

        Optional<Medicamento> medicamento = service.buscarPorId(id);
        if (medicamento.isEmpty()){
            return ResponseEntity.badRequest().build();
        }
        Medicamento encontrado = medicamento.get();
        if (dados.nome() != null)
            encontrado.setNome(dados.nome());
        if (dados.tipo() != null)
            encontrado.setTipo(dados.tipo());
        if (dados.composicao() != null)
            encontrado.setComposicao(dados.composicao());
        if (dados.quantidade() > 0)
            encontrado.setQuantidade(dados.quantidade());
        service.atualizar(encontrado);
        MedicamentoDTO atualizado = new MedicamentoDTO(encontrado.getNome(), encontrado.getComposicao(), encontrado.getTipo(), encontrado.getQuantidade());
        return ResponseEntity.ok().body(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MedicamentoDTO> deletar(@PathVariable Long id) {

        Optional<Medicamento> medicamento = service.buscarPorId(id);
        if (medicamento.isPresent()){
            service.deletar(medicamento.get().getId());
        } else{
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }
}
