package com.hospital.receitas.dto;

public record MedicamentoDTO(
String nome,
String composicao,
String tipo,
Integer quantidade
) {
}
