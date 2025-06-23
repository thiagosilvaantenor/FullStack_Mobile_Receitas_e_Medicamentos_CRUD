import { Alert } from "react-native";
import { Receita, ReceitaRequest } from "../@types/IReceita";
import { Paciente } from "../@types/IPacientePicker";

// Funções para interagir com a API de Medicamentos
// --- CONFIGURAÇÃO DA API ---
// IMPORTANTE:
// Se você está usando um EMULADOR ANDROID, o IP para acessar seu localhost é '10.0.2.2'.
// Se você está usando um DISPOSITIVO FÍSICO, você precisará usar o ENDEREÇO IP REAL
// da sua máquina na rede (ex: '192.168.1.100'). Verifique o IP da sua máquina.
// Certifique-se de que sua API Spring Boot esteja rodando na porta 8080 (ou a porta que você configurou).
const API_BASE_URL = 'http://192.168.18.14:8080'; // Altere para o seu IP se estiver em um dispositivo físico!

// Funções para interagir com a API de Receitas
//Busca as receitas em GET /receita 
export const fetchReceitas = async (): Promise<Receita[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/receita`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar receitas: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar receitas:', error);
    Alert.alert('Erro', 'Não foi possível carregar as receitas.');
    return [];
  }
};
//Envia um ReceitaRequestDTO e recebe um ReceitaDTO
export const addReceita = async (receita: Omit<ReceitaRequest, 'id'>): Promise<ReceitaRequest | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/receita`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(receita),
    });
    if (!response.ok) {
      throw new Error(`Erro ao adicionar receita: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao adicionar receita:', error);
    Alert.alert('Erro', 'Não foi possível adicionar a receita.');
    return null;
  }
};


//Atualiza a receita que é recebido o id e enviado em PUT /receita/id
export const atualizarReceita = async (id: string, receita: Omit<ReceitaRequest, 'id'>): Promise<ReceitaRequest | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/receita/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(receita),
    });
    if (!response.ok) {
      throw new Error(`Erro ao atualizar receita: ${response.statusText}`);
    }
    Alert.alert('Sucesso', 'Receita atualizada com sucesso!');
    return await response.json();
  } catch (error) {
    console.error('Erro ao atualizar receita:', error);
    Alert.alert('Erro', 'Não foi possível atualizar a receita.');
    return null;
  }
};

//Deleta a receita que é recebido o id e enviado em DELETE /receita/id
export const deleteReceita = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/receita/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Erro ao excluir receita: ${response.statusText}`);
    }
    Alert.alert('Sucesso', 'Receita excluída com sucesso!');
    return true;
  } catch (error) {
    console.error('Erro ao excluir receita:', error);
    Alert.alert('Erro', 'Não foi possível excluir a receita.');
    return false;
  }
};

//Busca as receitas do paciente cujo nome sera informado
export const exibirReceitasDoPaciente = async (nome: string): Promise<Receita[]> => {
  try {
    //Caso seja selecionado a opção padrão, busca todos os pacientes
    if (nome == '') {
      return fetchReceitas();
    }
    const response = await fetch(`${API_BASE_URL}/receita/paciente/${nome}`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar receitas: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar receitas:', error);
    Alert.alert('Erro', 'Não foi possível carregar as receitas do paciente ' + nome + '.');
    return [];
  }
};

//Função para pegar os pacientes para o filtro
export const fetchPacientesForFilter = async (): Promise<Paciente[]> => {
  const dados = await fetchReceitas();
  let resultado: Paciente[] = [];
  resultado.push({ label: 'Todos os Pacientes', value: '' }); // Opção para remover filtro
  dados.map((receita) => {
    [
      resultado.push({ label: receita.pacienteNome, value: receita.pacienteNome })
    ]
  });
  return new Promise((resolve) => {
    resolve(resultado);
  });
}