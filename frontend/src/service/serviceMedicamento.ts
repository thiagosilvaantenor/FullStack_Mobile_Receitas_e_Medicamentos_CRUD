// --- SERVIÇOS DE API ---

import { Alert } from "react-native";
import { Medicamento } from "../@types/IMedicamento";

// Funções para interagir com a API de Medicamentos
// --- CONFIGURAÇÃO DA API ---
// IMPORTANTE:
// Se você está usando um DISPOSITIVO FÍSICO, você precisará usar o ENDEREÇO IP REAL(com ipConfig)
// da sua máquina na rede (ex: '192.168.1.100'). Verifique o IP da sua máquina.

//Trocar o valor de API_BASE_URL pelo valor do ip e o valor da porta que esta rodando o backend
const API_BASE_URL = 'http://192.168.18.14:8080';
export const fetchMedicamentos = async (): Promise<Medicamento[]> => {
  try{
    const response = await fetch(`${API_BASE_URL}/medicamento`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar medicamentos: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar medicamentos:', error);
    Alert.alert('Erro', 'Não foi possível carregar os medicamentos.');
    return [];
  }
};

export const addMedicamento = async (medicamento: Omit<Medicamento, 'id'>): Promise<Medicamento | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/medicamento`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(medicamento),
    });
    if (!response.ok) {
      throw new Error(`Erro ao adicionar medicamento: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao adicionar medicamento:', error);
    Alert.alert('Erro', 'Não foi possível adicionar o medicamento.');
    return null;
  }
};


//Atualiza a receita que é recebido o id e enviado em PUT /receita/id
export const atualizarMedicamento = async (id: string, medicamento: Omit<Medicamento, 'id'>): Promise<Medicamento | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/medicamento/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(medicamento),
    });
    if (!response.ok) {
      throw new Error(`Erro ao atualizar medicamento}: ${response.statusText}`);
    }
    Alert.alert('Sucesso', 'Medicamento atualizado com sucesso!');
    return await response.json();
  } catch (error) {
    console.error('Erro ao atualizar medicamento:', error);
    Alert.alert('Erro', 'Não foi possível atualizar o medicamento.');
    return null;
  }
};
export const deleteMedicamento = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/medicamento/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Erro ao excluir medicamento: ${response.statusText}`);
    }
    Alert.alert('Sucesso', 'Medicamento excluído com sucesso!');
    return true;
  } catch (error) {
    console.error('Erro ao excluir medicamento:', error);
    Alert.alert('Erro', 'Não foi possível excluir o medicamento.');
    return false;
  }
};