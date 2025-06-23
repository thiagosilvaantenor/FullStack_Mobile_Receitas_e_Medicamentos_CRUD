package com.hospital.receitas.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class Receita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "receita_id")
    private Long id;
    @Column(name = "receita_data")
    private LocalDate dataReceita;
    // receita vai ter uma lista de medicamentos
    @ManyToMany
    @JoinTable(
            name = "receita_medicamento",
            joinColumns = @JoinColumn(name = "receita_id"),
            inverseJoinColumns = @JoinColumn(name = "medicamento_id"))
    private List<Medicamento> medicamentos;
    @Column(name = "medico_Nome", nullable = false, length = 50)
    private String medicoNome;
    @Column(name = "paciente_nome", nullable = false, length = 50)
    private String pacienteNome;
    @Column(name = "observacoes", nullable = false, length = 100)
    private String observacoes;

    //Construtor sem id e lista
    public Receita(LocalDate dataReceita, String medicoNome, String pacienteNome, String observacoes) {
        this.dataReceita = dataReceita;
        this.medicoNome = medicoNome;
        this.pacienteNome = pacienteNome;
        this.observacoes = observacoes;
    }

    public Receita() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDataReceita() {
        return dataReceita;
    }

    public void setDataReceita(LocalDate dataReceita) {
        this.dataReceita = dataReceita;
    }
    public String getMedicoNome() {
        return medicoNome;
    }

    public void setMedicoNome(String medicoCRM) {
        this.medicoNome = medicoCRM;
    }

    public String getPacienteNome() {
        return pacienteNome;
    }

    public void setPacienteNome(String pacienteNome) {
        this.pacienteNome = pacienteNome;
    }

    public List<Medicamento> getMedicamentos() {
        return medicamentos;
    }

    public void setMedicamentos(List<Medicamento> medicamentos) {
        this.medicamentos = medicamentos;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }
}
