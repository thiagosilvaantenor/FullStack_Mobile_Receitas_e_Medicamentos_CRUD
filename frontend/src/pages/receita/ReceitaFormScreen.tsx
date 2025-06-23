import { useEffect, useState } from "react";
import { styles } from "../../style/styles";
import { Medicamento } from "../../@types/IMedicamento";
import { fetchMedicamentos } from "../../service/serviceMedicamento";
import {
  addReceita,
  atualizarReceita
} from "../../service/serviceReceita";

import { Receita } from "../../@types/IReceita";
import { ActivityIndicator, Alert, Button, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";



// Tela de Formulário de Receita
export const ReceitaFormScreen = ({ navigation, route }: any) => {
  // Caso seja atualização pega a receita a ser editada pelos parametros da rota, se existir
  const { receitaEdit } = route.params || {};

  const [id, setId] = useState<string | undefined>(receitaEdit?.id); // ID só existe se for edição
  const [dataReceita, setDataReceita] = useState(receitaEdit?.dataReceita || '');
  const [medicoCRM, setMedicoCRM] = useState(receitaEdit?.medicoCRM || '');
  const [pacienteNome, setPacienteNome] = useState(receitaEdit?.pacienteNome || '');
  const [selectedMedicamentos, setSelectedMedicamentos] = useState<Medicamento[]>([]);
  const [medicamentosDisponiveis, setMedicamentosDisponiveis] = useState<Medicamento[]>([]);
  const [carregarMedicamentos, setCarregarMedicamentos] = useState(true);
  const [enviando, setEnviando] = useState(false);


  // Coloca o valor inicial do estado dos medicamentos baseados na receita recebida, caso seja atualização
  useEffect(() => {

    if (receitaEdit && medicamentosDisponiveis.length > 0) {
      //Filtra os medicamentos selecionados para serem os da receita recebida
      const selecionados = medicamentosDisponiveis.filter(med =>
        receitaEdit.medicamentos.some((editedMed: Medicamento) => editedMed.id === med.id)
      );
      setSelectedMedicamentos(selecionados);
    }
  }, [receitaEdit, medicamentosDisponiveis]);

  //Busca e exibe os medicamentos cadastrados para o usuario selecionar
  useEffect(() => {
    const carregarMedicamentosDisponiveis = async () => {
      setCarregarMedicamentos(true);
      const data = await fetchMedicamentos();
      setMedicamentosDisponiveis(data);
      setCarregarMedicamentos(false);
    };
    carregarMedicamentosDisponiveis();
  }, []);


  //Seleção de medicamento
  const toggleMedicamentoSelection = (medicamento: Medicamento) => {
    setSelectedMedicamentos((prevSelected) =>
      prevSelected.some((med) => med.id === medicamento.id)
        ? prevSelected.filter((med) => med.id !== medicamento.id)
        : [...prevSelected, medicamento]
    );
  };

  const handleSubmit = async () => {
    if (!dataReceita || !pacienteNome || selectedMedicamentos.length === 0 || !medicoCRM) {
      Alert.alert('Erro', 'Por favor, preencha a data de da receita e o nome do paciente.');
      return;
    }
    setEnviando(true);

    //Cria um veto de ids dos medicamentos selecionados
    const medicamentoIds = selectedMedicamentos.map(med => med.id);

    //DTO
    const receitaDTO = {
      dataReceita,
      medicamentoIds: medicamentoIds,
      medicoCRM,
      pacienteNome
    };

    let resultado = null;
    if (id) {
      // Se existe um ID, é uma atualização

      resultado = await atualizarReceita(id, receitaDTO);
    } else {
      // Caso contrário, é uma nova receita
      resultado = await addReceita(receitaDTO);
    }
    setEnviando(false);
    if (resultado) {
      Alert.alert('Sucesso', `Receita ${id ? 'atualizada' : 'cadastrada'} com sucesso!`);
      navigation.goBack(); // Volta para a tela de lista
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{id ? 'Editar Receita' : 'Cadastrar Receita'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Data de Emissão (YYYY-MM-DD)"
        value={dataReceita}
        onChangeText={setDataReceita}
        keyboardType="numbers-and-punctuation" // Sugestão para formato de data
      />
      <TextInput
        style={styles.input}
        placeholder="CRM/ESTADO{NUMERO}"
        value={medicoCRM}
        onChangeText={setMedicoCRM}
        keyboardType="default"
      />

      <Text style={styles.subtitle}>Selecione Medicamentos:</Text>
      {carregarMedicamentos ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : medicamentosDisponiveis.length === 0 ? (
        <Text style={styles.emptyMessage}>Nenhum medicamento disponível para seleção. Cadastre um primeiro!</Text>
      ) : (
        medicamentosDisponiveis.map((medicamento) => (
          <TouchableOpacity
            key={medicamento.id}
            style={[
              styles.checkboxContainer,
              selectedMedicamentos.some((med) => med.id === medicamento.id) && styles.checkboxSelected,
            ]}
            onPress={() => toggleMedicamentoSelection(medicamento)}
          >
            <Text style={styles.checkboxText}>
              {medicamento.nome} ({medicamento.tipo}) ({medicamento.quantidade})
            </Text>
          </TouchableOpacity>
        ))
      )}

      <TextInput
        style={styles.input}
        placeholder="Nome do paciente"
        value={pacienteNome}
        onChangeText={setPacienteNome}
        keyboardType="default"
      />

      <Button
        title={enviando ? (id ? 'Atualizando...' : 'Cadastrando...') : (id ? 'Atualizar Receita' : 'Cadastrar Receita')}
        onPress={handleSubmit}
        disabled={enviando}
        color="#4CAF50"
      />
    </ScrollView>
  );
};
