import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../style/styles";

// Tela Inicial
export const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.homeTitle}>Bem-vindo ao App de Receitas Médicas</Text>
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('MedicamentoList')}
      >
        <Text style={styles.homeButtonText}>Gerenciar Medicamentos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('ReceitaList')}
      >
        <Text style={styles.homeButtonText}>Gerenciar Receitas</Text>
      </TouchableOpacity>
    </View>
  );
};