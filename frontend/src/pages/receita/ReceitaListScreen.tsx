import { useEffect, useState } from "react";
import { Receita, ReceitaRequest } from "../../@types/IReceita";
import { deleteReceita, fetchReceitas, fetchPacientesForFilter, exibirReceitasDoPaciente, atualizarReceita } from "../../service/serviceReceita";
import { ActivityIndicator, Alert, Button, FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../style/styles";
import { Picker } from '@react-native-picker/picker';
import { Paciente } from "../../@types/IPacientePicker";

// Tela de Lista de Receitas (Relatorio)
export const ReceitaListScreen = ({ navigation }: any) => {
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [pacientesOptions, setPacienteOptions] = useState<Paciente[]>([]);
  const [selectedPaciente, setSelectedPaciente] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const loadReceitas = async () => {
    setLoading(true);
    const data = await fetchReceitas();
    setReceitas(data);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadReceitas();
    });
    return unsubscribe;
  }, [navigation]);

  // Efeito para carregar as opções de pacientes ao montar o componente
  useEffect(() => {
    const loadPacientesOptions = async () => {
      try {
        const options = await fetchPacientesForFilter();
        setPacienteOptions(options);
        // Define a primeira opção (Todos os Pacientes) como padrão (value = '')
        if (options.length > 0) {
          setSelectedPaciente(options[0].value);
        }
      } catch (error) {
        console.error("Erro ao carregar opções de médicos:", error);
        Alert.alert("Erro", "Não foi possível carregar as opções de filtro.");
      }
    };
    loadPacientesOptions();
  }, []); // Executa apenas uma vez ao montar

  // Efeito para carregar as receitas filtradas sempre que 'selectedPaciente' muda
  useEffect(() => {
    const loadReceitas = async () => {
      setLoading(true);
      try {
        //Chama a procedure com o nome do paciente selecionado
        const data = await exibirReceitasDoPaciente(selectedPaciente);
        setReceitas(data);
      } catch (error) {
        console.error("Erro ao carregar receitas filtradas:", error);
        Alert.alert("Erro", "Não foi possível carregar as receitas.");
      } finally {
        setLoading(false);
      }
    };
    if (pacientesOptions.length > 0) { // Garante que as opções já foram carregadas
      loadReceitas();
    }
  }, [selectedPaciente, pacientesOptions]); // Recarrega quando a seleção muda ou opções são carregadas


  const handleDelete = async (id: string) => {
    const success = await deleteReceita(id);
    if (success) {
      loadReceitas(); // Recarrega a lista após a exclusão
    }
  };

  const handleUpdate = async (receita: Receita) => {
    navigation.navigate('ReceitaForm', { receitaEdit: receita });
  }

  if (loading && pacientesOptions.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todas as Receitas Cadastradas</Text>
      <Button
        title="Cadastrar Nova Receita"
        onPress={() => navigation.navigate('ReceitaForm')}
        color="#2196F3"
      />
      {/*Filtro*/}
      <Text style={styles.subtitle}>Filtrar receitas pelo nome do paciente</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedPaciente}
          onValueChange={(itemValue: string) => setSelectedPaciente(itemValue)}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          {pacientesOptions.map((option) => (
            <Picker.Item key={option.value} label={option.label} value={option.value} />
          ))}
        </Picker>
      </View>

      {receitas.length === 0 ? (
        <Text style={styles.emptyMessage}>Nenhuma receita cadastrada.</Text>
      ) : (
        <FlatList
          data={receitas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <View>
                <Text style={styles.listItemTextBold}>Nome do paciente: {item.pacienteNome}</Text>
                <Text style={styles.listItemTextBold}>Data Emissão: {new Date(
                item.dataReceita).toLocaleDateString()}</Text>
                <Text style={styles.listItemText}>CRM do Médico: {item.medicoCRM}</Text>
                <Text style={styles.listItemText}>Medicamentos:</Text>
                {item.medicamentos.length > 0 ? (
                  item.medicamentos.map((med, index) => (
                    <Text key={med.id || index} style={styles.nestedItemText}>
                      - {med.nome}
                    </Text>
                  ))
                ) : (
                  <Text style={styles.nestedItemText}>Nenhum medicamento associado.</Text>
                )}

              {/*Btns de excluir e atualizar*/}
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={() => handleUpdate(item)}
                >
                  <Text style={styles.buttonGroupText}>Atualizar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={styles.buttonGroupText}>Excluir</Text>
                </TouchableOpacity>
              </View>
              
            </View>
            </View>
              
          )}
        />
      )}
    </View>
  );
};
