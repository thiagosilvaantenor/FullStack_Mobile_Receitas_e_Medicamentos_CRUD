import { useEffect, useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { addMedicamento, atualizarMedicamento } from "../../service/serviceMedicamento";
import { styles } from "../../style/styles";
import { Picker } from "@react-native-picker/picker";

// Tela de Formulário de Medicamento
export const MedicamentoFormScreen = ({ navigation, route }: any) => {
  //Caso receba um medicamento para ser editado, pega ele dos parametros da rota
  const {medicamentoEdit} = route.params || {}; 

  const [id, setId] = useState<string | undefined>(medicamentoEdit?.id); // ID só existe se for edição
  const [nome, setNome] = useState(medicamentoEdit?.nome || '');
  const [tipoSelecionado, setTipoSelecionado] = useState(medicamentoEdit?.tipo || '');
  const [tipos, setTipos] = useState<string[]>(['Xarope', 'Gotas', 'Comprimido']);
  const [quantidadeStr, setQuantidadeStr] = useState(medicamentoEdit?.quantidade.toString() || '');
  const [submitting, setSubmitting] = useState(false);
  
  //TODO: Testar se isso é necessário
  useEffect(() => {
      if (medicamentoEdit){
        setId(medicamentoEdit.id);
      }
    }, [medicamentoEdit]);


  const handleSubmit = async () => {
    if (!nome || !tipoSelecionado || !quantidadeStr) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    setSubmitting(true);
    
    let quantidade = Number.parseInt(quantidadeStr);
    
    //Verifica se o campo esta vazio ou se quando formatado para numero é realmente um número
    if (isNaN(quantidade) || quantidadeStr.trim() === '') {
      Alert.alert('Erro', 'Por favor, insira uma quantidade válida (número inteiro).');
      return;
    }

    const medicamentoDTO = { nome, tipo: tipoSelecionado, quantidade };
    let resultado = null;
    if (id){
      //Se tem id é atualização
      resultado = await atualizarMedicamento(id, medicamentoDTO)
    } else{
      //Se não tem é cadastro
      resultado = await addMedicamento(medicamentoDTO);
    }

    setSubmitting(false);
    if (medicamentoDTO) {
      Alert.alert('Sucesso', `Medicamento ${id ? 'atualizado' : 'cadastrado'} com sucesso!`);
      navigation.goBack(); // Volta para a tela de lista
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{id ? 'Editar Medicameto' : 'Cadastrar Medicamento'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Medicamento"
        value={nome}
        onChangeText={setNome}
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={tipoSelecionado}
          onValueChange={(itemValue: string) => setTipoSelecionado(itemValue)}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          {tipos.map((tipo, index) => (
            <Picker.Item key={index} label={tipo} value={tipo} />
          ))}
        </Picker>
      </View>
{/* 
      <TextInput
        style={styles.input}
        placeholder="Tipo Ex: (Xarope, Comprimido, Gotas)"
        value={tipoSelecionado}
        onChangeText={setTipoSelecionado}
      /> */}
      <TextInput
        style={styles.input}
        placeholder="Quantidade Ex:(100, 10)"
        value={quantidadeStr}
        onChangeText={setQuantidadeStr}
        keyboardType="number-pad"
      />
      <Button
        title={submitting ? (id ? 'Atualizando...' : 'Cadastrando...') : (id ? 'Atualizar Medicamento' : 'Cadastrar Medicamento')}
        onPress={handleSubmit}
        disabled={submitting}
        color="#4CAF50"
      />
    </View>
  );
};