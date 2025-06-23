import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { addMedicamento } from "../../service/serviceMedicamento";
import { styles } from "../../style/styles";

// Tela de Formulário de Medicamento
export const MedicamentoFormScreen = ({ navigation }: any) => {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [quantidadeStr, setQuantidadeStr] = useState('');
  const [submitting, setSubmitting] = useState(false);

   // Função para lidar com a mudança do texto e garantir que seja um inteiro
  // const handleQuantidadeChange = (text: string) => {
  //   const numericText = text.replace(/[^0-9]/g, '');
  //   setQuantidadeStr(numericText);
  // };
  
  const handleSubmit = async () => {
    if (!nome || !tipo || !quantidadeStr) {
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

    const newMedicamento = await addMedicamento({ nome, tipo, quantidade });
    setSubmitting(false);
    if (newMedicamento) {
      Alert.alert('Sucesso', 'Medicamento cadastrado com sucesso!');
      navigation.goBack(); // Volta para a tela de lista
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Medicamento</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Medicamento"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo Ex: (Xarope, Comprimido, Gotas)"
        value={tipo}
        onChangeText={setTipo}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade Ex:(100, 10)"
        value={quantidadeStr}
        onChangeText={setQuantidadeStr}
        keyboardType="number-pad"
      />
      <Button
        title={submitting ? 'Cadastrando...' : 'Cadastrar'}
        onPress={handleSubmit}
        disabled={submitting}
        color="#4CAF50"
      />
    </View>
  );
};