package com.hospital.receitas.dto;

import java.time.LocalDate;
import java.util.List;

public record ReceitaRequestDTO(
    LocalDate dataReceita,
    List<Long> medicamentoIds, // <-- Uma lista de IDs de medicamentos
    String medicoNome,
    String pacienteNome,
    String observacoes
) {
}
