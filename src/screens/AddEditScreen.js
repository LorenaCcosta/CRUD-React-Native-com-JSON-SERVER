// Importando os Hooks e os componentes necessarios
import { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, Image } from 'react-native';
import styles from '../styles/styles.js';
import VetorUsuario from '../../assets/VetorUsuario.png';

//Exportando a função AddEditScreen
export default function AddEditScreen({ route, navigation }) {

  //se caso a tela for chamada para editar, conterá um objeto com os dados da pessoa
  const pessoa = route.params?.pessoa;

  //useState, com estado inicial vazio
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [address, setAddress] = useState('');

  //useEffect para preencher o formulario em modo edição, executando sempre que a pessoa mudar
  useEffect(() => {
    if (pessoa) {
      setFirstname(pessoa.firstName);
      setLastname(pessoa.lastName);
      setEmail(pessoa.email);
      setAvatar(pessoa.avatar);
      setAddress(pessoa.address);
    }
  }, [pessoa]);

  //Validando as entradas dos campos obrigatorios, se estiver vazio exibe uma mensagem
  const salvar = () => {
    if (!firstName || !lastName || !email || !address) {
      window.confirm('Preencha os campos obrigatórios! (Nome, Sobrenome, E-mail e Endereço)');
      return;
    }

    // monta o objeto newData
    const newData = {
      firstName,
      lastName,
      email,
      avatar,
      address,
    };

    let url = '';
    let method = '';

    if (pessoa) {
      url = `http://localhost:3001/peoples/${pessoa.id}`; // se houver pessoa será edição (PUT)
      method = 'PUT';

      // se não houver, irá criar pessoa (POST)
    } else {
      url = 'http://localhost:3001/peoples';
      method = 'POST';
    }


    // envia a requisição com fetch
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    })
      .then(() => navigation.goBack()) // se der certo, vai voltar para a tela anterior
      .catch(() => Alert.alert('Erro', 'Falha ao salvar os dados.'));// já se der errado vai mostrar o alerta
  };

  //componentes que foram importados mais cedo serão usados agora, como o Input, Text, Button, etc.
  return (
    <View style={styles.container1}>
      <Image source={
      avatar && avatar.trim() !== ''
      ? { uri: avatar } 
      : VetorUsuario}
      style={styles.image}
      />
      <TextInput
        placeholder="Nome"
        value={firstName}
        onChangeText={setFirstname}
        style={styles.input}
      />
      <TextInput
        placeholder="Sobrenome"
        value={lastName}
        onChangeText={setLastname}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address" 
      />
      <TextInput
        placeholder="Endereço"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />
      <TextInput
        placeholder="URL da Imagem (Avatar)"
        value={avatar}
        onChangeText={setAvatar}
        style={styles.input}
      />
      <Button title="Salvar" onPress={salvar} /> 
    </View>
  );
}
