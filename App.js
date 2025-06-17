import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import AddEditScreen from './src/screens/AddEditScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Usuários' }} />
        <Stack.Screen name="AddEdit" component={AddEditScreen} options={{ title: 'Adicionar / Editar' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};