package com.hospital.receitas.dto;

import java.time.LocalDate;
import java.util.List;

public record ReceitaDTO(
        LocalDate dataReceita,
        // receita vai ter uma lista de medicamentos
        List<String> medicamentos,
        String medicoCRM,
        String pacienteNome
) {

}
