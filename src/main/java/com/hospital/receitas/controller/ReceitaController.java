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
    @GetMapping
    public ResponseEntity<List<Receita>> exibirMedicamentos(){
        List<Receita> receitas = service.exibirReceitas();
        return ResponseEntity.status(200).body(receitas);
    }

}
