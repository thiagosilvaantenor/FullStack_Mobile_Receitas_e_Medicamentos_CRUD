import { Medicamento } from "./IMedicamento";

//Interface que determina o tipo de dados do ReceitaDTO(GET)
export interface Receita {
  id: string;
  dataReceita: string; // Exemplo: 'YYYY-MM-DD'
  medicamentos: Medicamento[]; // Lista de medicamentos associados à receita
  medicoCRM: string;
  pacienteNome: string;
}

//Interface que determina o tipo de dados do ReceitaRequestDTO(POST, PUT, DELETE)
export interface ReceitaRequest {
  id: string;
  dataReceita: string; // Exemplo: 'YYYY-MM-DD'
  medicamentoIds: string[]; // Lista de ids dos medicamentos associados à receita
  medicoCRM: string;
  pacienteNome: string;
}