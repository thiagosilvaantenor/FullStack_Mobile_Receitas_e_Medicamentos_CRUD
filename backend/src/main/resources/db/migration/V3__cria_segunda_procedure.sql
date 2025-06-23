DROP PROCEDURE IF EXISTS pr_buscar_receita_pelo_medico_crm;

DELIMITER $$

CREATE PROCEDURE pr_buscar_receita_pelo_nome_medico(IN medico_nome VARCHAR(50))
BEGIN
    SELECT receita_id, receita_data, medico_nome, paciente_nome, observacoes FROM receita WHERE medico_nome LIKE CONCAT('%', medico_nome, '%');
END $$

DELIMITER ;