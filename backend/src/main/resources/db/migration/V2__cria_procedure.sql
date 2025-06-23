-- Codigo SQL da Procedure, vai ser utilizado o Flyway
-- Quando o projeto for rodar pela primeira vez, vai rodar esse SQL
DROP PROCEDURE IF EXISTS pr_buscar_receita_pelo_nome_paciente;

DELIMITER $$
-- Procedure para exibir todas as receitas que tenham o nome do paciente informado
CREATE PROCEDURE pr_buscar_receita_pelo_nome_paciente(IN nome_param VARCHAR(50))
BEGIN
    SELECT receita_id, receita_data, medico_crm, paciente_nome FROM receita WHERE paciente_nome LIKE CONCAT('%', nome_param, '%');
END $$

DELIMITER ;