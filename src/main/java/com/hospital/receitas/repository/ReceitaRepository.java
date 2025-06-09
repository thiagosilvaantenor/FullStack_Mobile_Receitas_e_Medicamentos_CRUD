package com.hospital.receitas.repository;

import com.hospital.receitas.model.Receita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReceitaRepository extends JpaRepository<Receita, Long> {
    @Query(value = "CALL  pr_buscar_receita_pelo_nome_paciente(:nomeParam)", nativeQuery = true)
    List<Receita> buscaReceitaPeloNomePaciente(@Param("nomeParam") String nomeParam);
}
