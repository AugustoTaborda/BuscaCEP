import React, { useState } from 'react';
import { Text, View, Button, TextInput, Alert, StyleSheet } from 'react-native';
import axios from 'axios';



export default function App() {
  const [cep, setCep] = useState('');
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  const buscarCep = async () => {
    
    if (cep.length !== 8 || isNaN(cep)) {
      Alert.alert('Validação');
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        Alert.alert('Erro', 'CEP não encontrado.');
        setResultado(null);
      } else {
        setResultado(response.data);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro');
      setResultado(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Encontre seu CEP</Text>
      <TextInput 
        style={styles.inputText}
        placeholder='Digite aqui seu o CEP'
        value={cep}
        onChangeText={setCep}
        keyboardType='numerico'
        maxLength={8}  
      />
      <Button title="Procurar" onPress={buscarCep} />
      {loading && <Text style={styles.loading}>Carregando...</Text>}
      {resultado && (
        <View style={styles.resultado}>
          <Text>CEP: {resultado.cep}</Text>
          <Text>Logradouro: {resultado.logradouro}</Text>
          <Text>Bairro: {resultado.bairro}</Text>
          <Text>Cidade: {resultado.localidade}</Text>
          <Text>UF: {resultado.uf}</Text>
        </View>
      )}
      {!loading && resultado === null && (
        <Text style={styles.error}>Nenhum resultado encontrado</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundcolor: "#75892",
    alignItems: 'center',
    justifyContent: 'center',
  },

  title:{
    fontSize: 20,
  },

  inputText:{
    height: 30,
    borderColor:'gray',
    borderWidth:1,
    marginTop:60,
    padding:40,
    width:"90%"
  }
});