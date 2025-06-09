CREATE TABLE receita (
    receita_id BIGINT NOT NULL,
    receita_data DATE NOT NULL,
    medicoCRM VARCHAR(11) NOT NULL,
    pacienteNome VARCHAR(50) NOT NULL
)
CREATE TABLE medicamento (
    medicamento_id BIGINT NOT NULL,
    nome VARCHAR(50) NOT NULL,
    composicao VARCHAR(100) NOT NULL
)

CREATE TABLE receita_medicamento (
    receita_id BIGINT NOT NULL,
    medicamento_id BIGINT NOT NULL
)

ALTER TABLE receita
ADD PRIMARY KEY (receita_id)

ALTER TABLE medicamento
ADD PRIMARY KEY (medicamento_id)

ALTER TABLE receita_medicamento
ADD PRIMARY KEY(receita_id, medicamento_id)

ALTER TABLE receita_medicamento
ADD FOREIGN KEY(receita_id) REFERENCES receita(receita_id)

ALTER TABLE receita_medicamento
ADD FOREIGN KEY(medicamento_id) REFERENCES medicamento(medicamento_id)