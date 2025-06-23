import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {ReceitaFormScreen} from './src/pages/receita/ReceitaFormScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { MedicamentoFormScreen } from './src/pages/medicamento/MedicamentoFormScreen';
import { MedicamentoListScreen } from './src/pages/medicamento/MedicamentoListScreen';
import { ReceitaListScreen } from './src/pages/receita/ReceitaListScreen';
import { HomeScreen } from './src/pages/home/HomeScreen';

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Início' }}
        />
        <Stack.Screen
          name="MedicamentoList"
          component={MedicamentoListScreen}
          options={{ title: 'Meus Medicamentos' }}
        />
        <Stack.Screen
          name="MedicamentoForm"
          component={MedicamentoFormScreen}
          options={{ title: 'Novo Medicamento' }}
        />
        <Stack.Screen
          name="ReceitaList"
          component={ReceitaListScreen}
          options={{ title: 'Minhas Receitas' }}
        />
        <Stack.Screen
          name="ReceitaForm"
          component={ReceitaFormScreen}
          options={{ title: 'Formulário de Receita' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}