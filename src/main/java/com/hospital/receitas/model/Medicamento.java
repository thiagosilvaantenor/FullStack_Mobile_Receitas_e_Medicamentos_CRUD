package com.hospital.receitas.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hospital.receitas.dto.MedicamentoDTO;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Medicamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "medicamento_id", nullable = false)
    private Long id;
    @Column(name = "nome", nullable = false, length = 50)
    private String nome;
    @Column(name = "tipo", nullable = false)
    private String tipo;
    @Column(name = "quantidade", nullable = false)
    private Integer quantidade;
    @JsonIgnore // <-- Esta anotação resolve a referência circular na serialização
    @ManyToMany(mappedBy = "medicamentos")
    private List<Receita> receitas;

    public Medicamento(MedicamentoDTO dto) {
        this.nome = dto.nome();
        this.tipo = dto.tipo();
        this.quantidade = dto.quantidade();
    }

    public Medicamento() {
    }

    public Medicamento(Long id, String nome, String tipo, Integer quantidade, List<Receita> receitas) {
        this.id = id;
        this.nome = nome;
        this.tipo = tipo;
        this.quantidade = quantidade;
        this.receitas = receitas;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public List<Receita> getReceitas() {
        return receitas;
    }

    public void setReceitas(List<Receita> receitas) {
        this.receitas = receitas;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }
}
