//Importando
import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "../styles/styles.js";
import VetorUsuario from '../../assets/VetorUsuario.png';

//exportando a função HomeScreen
export default function HomeScreen({ navigation }) {

  //usando o useState: people vai ser uma array que vai amarzenar os registros de pessoa vindos da API, e o setPeople vai atualizar essa array
  const [people, setPeople] = useState([]);

  //usando o fetch: vai fazer um GET em peoples, vai converter a res para JSON, atualiza o estado people com a array retornada, e no fim qualquer erro é mostrado no console
  const carregarDados = () => {
    fetch("http://localhost:3001/peoples")
      .then((res) => res.json())
      .then((data) => setPeople(data))
      .catch((err) => console.error(err));
  };


  // toda as vezes que navegar para outra tela, vai chamar carregarDados
  useEffect(() => {
    const cancelar = navigation.addListener("focus", carregarDados);
    return cancelar;
  }, [navigation]);


  //Deleta pessoa
  const DeletarPessoa = (id) => {
    fetch(`http://localhost:3001/peoples/${id}`, {
      method: "DELETE",
    })
      .then(() => setPeople((prev) => prev.filter((pessoa) => pessoa.id !== id)))
      .catch((err) => console.error(err));
  };


  //redenrizar cada item da lista
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={
            item.avatar && item.avatar.trim() !== ''
            ? { uri: item.avatar } 
            : VetorUsuario}
            style={styles.avatar}
            />
      <View style={styles.info}>
        <Text style={styles.name}>
          {item.firstName} {item.lastName}
        </Text>
        <Text style={styles.email}>{item.email}</Text>
        <Text style={styles.address}>{item.address}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddEdit", { pessoa: item })}
        >
          <FontAwesome name="edit" size={20} color="blue" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => DeletarPessoa(item.id)}>
          <FontAwesome name="trash" size={20} color="red" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddEdit")}
      >
        <FontAwesome name="plus" size={18} color="#fff" />
        <Text style={styles.addText}>Adicionar Pessoa</Text>
      </TouchableOpacity>

      <FlatList
        data={people}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}