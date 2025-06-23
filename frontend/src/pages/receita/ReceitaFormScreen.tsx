import { useEffect, useState } from "react";
import { styles } from "../../style/styles";
import { Medicamento } from "../../@types/IMedicamento";
import { fetchMedicamentos } from "../../service/serviceMedicamento";
import {
  addReceita,
  atualizarReceita
} from "../../service/serviceReceita";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ActivityIndicator, Alert, Button, ScrollView, Text, TextInput, TouchableOpacity, Pressable, Platform } from "react-native";



// Tela de Formulário de Receita
export const ReceitaFormScreen = ({ navigation, route }: any) => {
  // Caso seja atualização pega a receita a ser editada pelos parametros da rota, se existir
  const { receitaEdit } = route.params || {};

  const [id, setId] = useState<string | undefined>(receitaEdit?.id); // ID só existe se for edição
  //Data receita é uma string formatada para o padrão data brasileiro
  const [dataReceita, setDataReceita] = useState(receitaEdit?.dataReceita ? new Date(receitaEdit.dataReceita).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [medicoNome, setMedicoNome] = useState(receitaEdit?.medicoNome || '');
  const [pacienteNome, setPacienteNome] = useState(receitaEdit?.pacienteNome || '');
  const [observacoes, setObservacoes] = useState(receitaEdit?.observacoes || '');
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
    }// Se estiver editando e houver dataReceita, inicializa o 'date' para o DatePicker
    if (receitaEdit?.dataReceita) {
      setDate(new Date(receitaEdit.dataReceita));
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

  //Exibição do input de escolha de data
  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  }
  // Função para lidar com eventos de mudança no DatePicker e no Text de dataReceita
  const onChange = (event: any, selectedDate: Date | undefined) => {
    // Para iOS, o DatePicker não é fechado automaticamente, então sempre o escondemos.
    // Para Android, ele é fechado automaticamente no 'set', mas não no 'cancel'.
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (event.type == "set" && selectedDate) {
      const currentDate = selectedDate;
      //Date é exibido, o dataReceita é salvo
      setDate(currentDate);
      // Formata a data para exibir no TextInput (ex: YYYY-MM-DD)
      const formattedDate = currentDate.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      setDataReceita(formattedDate);
    }
  }

  const handleSubmit = async () => {
    if (!dataReceita || !pacienteNome || selectedMedicamentos.length === 0 || !medicoNome || !observacoes) {
      Alert.alert('Erro', 'Por favor, preencha a data de da receita e o nome do paciente.');
      return;
    }
    setEnviando(true);

    //Cria um veto de ids dos medicamentos selecionados
    const medicamentoIds = selectedMedicamentos.map(med => med.id);

    // Formata a data para o padrão AAAA-MM-DD para o backend
    // Usamos o objeto 'date' que está no formato Date()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês é 0-indexado
    const day = String(date.getDate()).padStart(2, '0');
    const dataFormatada = `${year}-${month}-${day}`;


    //DTO
    const receitaDTO = {
      dataReceita: dataFormatada,
      medicamentoIds: medicamentoIds,
      medicoNome: medicoNome,
      pacienteNome,
      observacoes
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
    <ScrollView style={styles.container}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: 500 }}
    >
      <Text style={styles.title}>{id ? 'Editar Receita' : 'Cadastrar Receita'}</Text>

      <Text style={styles.subtitle}>Selecione a data de emissão: </Text>
      <Pressable
        onPress={toggleDatePicker}
      >
        <TextInput
          style={styles.input}
          placeholder="Data de Emissão (DD-MM-AAAA)"
          value={dataReceita}
          //onChangeText={setDataReceita}
          //placeholderTextColor='#11182744'
          editable={false}
        //  onPressIn={toggleDatePicker}
        />
      </Pressable>
      {showDatePicker && (
        //Pega o valor em Date() para depois ser transformado em string
        <DateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={onChange}
        />
      )}

      {/*Exibe o seletor de data apenas quando showDatePicker == false*/}


      <TextInput
        style={styles.input}
        placeholder="Digite o nome do médico"
        value={medicoNome}
        onChangeText={setMedicoNome}
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

      <TextInput
        style={styles.input}
        multiline={true} // Enables multi-line input
        numberOfLines={4} // Suggests an initial height of 4 lines
        placeholder="Observações e instruções do médico"
        value={observacoes}
        onChangeText={setObservacoes}
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
