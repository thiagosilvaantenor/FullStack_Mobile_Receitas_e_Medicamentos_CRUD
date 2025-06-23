CREATE TABLE receita (
                         receita_id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                         receita_data DATE NOT NULL,
                         medico_crm VARCHAR(11) NOT NULL,
                         paciente_nome VARCHAR(50) NOT NULL
);
CREATE TABLE medicamento (
                             medicamento_id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                             nome VARCHAR(50) NOT NULL,
                             tipo VARCHAR(20) NOT NULL,
                             quantidade INT NOT NULL
);

CREATE TABLE receita_medicamento (
                                     receita_id BIGINT NOT NULL,
                                     medicamento_id BIGINT NOT NULL
);

ALTER TABLE receita_medicamento
    ADD PRIMARY KEY(receita_id, medicamento_id);

ALTER TABLE receita_medicamento
    ADD FOREIGN KEY(receita_id) REFERENCES receita(receita_id);

ALTER TABLE receita_medicamento
    ADD FOREIGN KEY(medicamento_id) REFERENCES medicamento(medicamento_id);