package com.hospital.receitas.model;

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
    @Column(name = "composicao", nullable = false, length = 200)
    private String composicao;
    @Column(name = "tipo", nullable = false)
    private String tipo;
    @Column(name = "quantidade", nullable = false)
    private Integer quantidade;
    @ManyToMany(mappedBy = "medicamentos")
    private List<Receita> receitas;

    public Medicamento(MedicamentoDTO dto) {
        this.nome = dto.nome();
        this.composicao = dto.composicao();
        this.tipo = dto.tipo();
        this.quantidade = dto.quantidade();
    }

    public Medicamento() {
    }

    public Medicamento(Long id, String nome, String composicao, String tipo, Integer quantidade, List<Receita> receitas) {
        this.id = id;
        this.nome = nome;
        this.composicao = composicao;
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

    public String getComposicao() {
        return composicao;
    }

    public void setComposicao(String composicao) {
        this.composicao = composicao;
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
