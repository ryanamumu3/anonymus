import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker"; // precisa instalar
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Formulario({ navigation }) {

  const [escola, setEscola] = useState("");
  const [lista, setLista] = useState([]);

  const [prof, setProf] = useState("");
  const [estrutura, setEstrutura] = useState("");
  const [segur, setSegur] = useState("");
  const [ambiente, setAmbiente] = useState("");
  const [opiniao, setOpiniao] = useState("");

  useEffect(() => { carregarEscolas(); }, []);

  async function carregarEscolas(){
    const dados = await AsyncStorage.getItem("escolas");
    if(dados) setLista(JSON.parse(dados));
  }

  function validarNota(valor, set){
    if(valor === "") return set("");
    const num = Number(valor);
    if(num >= 1 && num <= 5) set(valor);
  }

  function enviar(){
    if(!escola) return Alert.alert("Selecione uma escola");
    if(!prof || !estrutura || !segur || !ambiente) return Alert.alert("Preencha todas as notas (1 a 5)");

    Alert.alert("Denúncia enviada com sucesso! Obrigado.");
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>DENÚNCIA</Text>
      <Text style={styles.label}>Selecione a Escola</Text>

      <Picker selectedValue={escola} onValueChange={(v)=>setEscola(v)} style={styles.picker}>
        <Picker.Item label="Escolha..." value=""/>
        {lista.map(item => <Picker.Item label={item.nome} value={item.nome} key={item.id}/>)}
      </Picker>

      <Text style={styles.label}>Professores (1 a 5)</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={prof} onChangeText={(v)=>validarNota(v,setProf)}/>

      <Text style={styles.label}>Estrutura Física (1 a 5)</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={estrutura} onChangeText={(v)=>validarNota(v,setEstrutura)}/>

      <Text style={styles.label}>Segurança (1 a 5)</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={segur} onChangeText={(v)=>validarNota(v,setSegur)}/>

      <Text style={styles.label}>Ambiente Escolar (1 a 5)</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={ambiente} onChangeText={(v)=>validarNota(v,setAmbiente)}/>

      <Text style={styles.label}>Opinião / Detalhes</Text>
      <TextInput style={[styles.input,{height:120}]} multiline value={opiniao} onChangeText={setOpiniao}/>

      <TouchableOpacity style={styles.btn} onPress={enviar}>
        <Text style={styles.btnTxt}>Enviar Denúncia</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:"#000",padding:25,paddingTop:60},
  title:{color:"#fff",fontSize:28,fontWeight:"bold",marginBottom:20},
  label:{color:"#fff",marginTop:10,fontSize:16},
  picker:{backgroundColor:"#111",color:"#fff",marginTop:5},
  input:{backgroundColor:"#111",color:"#fff",padding:12,borderRadius:10,marginTop:5},
  btn:{backgroundColor:"#1E90FF",padding:15,borderRadius:10,marginTop:20},
  btnTxt:{color:"#fff",textAlign:"center",fontSize:17,fontWeight:"bold"}
});
