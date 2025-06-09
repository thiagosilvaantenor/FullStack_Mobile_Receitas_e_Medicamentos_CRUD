package com.hospital.receitas.repository;

import com.hospital.receitas.model.Medicamento;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface MedicamentoRepository extends JpaRepository<Medicamento, Long> {
    public Optional<Medicamento> findByNome(String nome);
}
