package com.hospital.receitas.dto;

import jakarta.annotation.Nullable;

public record MedicamentoDTO(
@Nullable
Long id,
String nome,
String tipo,
Integer quantidade
) {
}
