package com.hospital.receitas.dto;

import com.hospital.receitas.model.Medicamento;
import jakarta.annotation.Nullable;

import java.time.LocalDate;
import java.util.List;

public record ReceitaDTO(
        @Nullable
        Long id,
        LocalDate dataReceita,
        // receita vai ter uma lista de medicamentos
        List<Medicamento> medicamentos,
        String medicoNome,
        String pacienteNome,
        String observacoes
) {

}
