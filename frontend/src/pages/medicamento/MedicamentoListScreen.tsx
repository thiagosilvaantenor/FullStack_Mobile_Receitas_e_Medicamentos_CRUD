import { useEffect, useState } from "react";
import { Medicamento } from "../../@types/IMedicamento";
import { deleteMedicamento, fetchMedicamentos } from "../../service/serviceMedicamento";
import { ActivityIndicator, Button, FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../style/styles";

// Tela de Lista de Medicamentos
export const MedicamentoListScreen = ({ navigation }: any) => {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMedicamentos = async () => {
    setLoading(true);
    const data = await fetchMedicamentos();
    setMedicamentos(data);
    setLoading(false);
  };

  useEffect(() => {
    // Carrega medicamentos quando a tela é montada e sempre que ela volta ao foco
    const unsubscribe = navigation.addListener('focus', () => {
      loadMedicamentos();
    });
    return unsubscribe;
  }, [navigation]);

  const handleDelete = async (id: string) => {
    const success = await deleteMedicamento(id);
    if (success) {
      loadMedicamentos(); // Recarrega a lista após a exclusão
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando medicamentos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medicamentos Cadastrados</Text>
      <Button
        title="Cadastrar Novo Medicamento"
        onPress={() => navigation.navigate('MedicamentoForm')}
        color="#2196F3"
      />
      {medicamentos.length === 0 ? (
        <Text style={styles.emptyMessage}>Nenhum medicamento cadastrado.</Text>
      ) : (
        <FlatList
          data={medicamentos}
          keyExtractor={(item) => item.nome}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <View>
                <Text style={styles.listItemTextBold}>Nome: {item.nome}</Text>
                <Text style={styles.listItemText}>Tipo: {item.tipo}</Text>
                <Text style={styles.listItemText}>Quantidade: {`${item.quantidade} ${item.tipo == 'Xarope' || 'Gotas' ? 'ml' : 'comprimidos'}`}</Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.deleteButton}>Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};