import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginEscola({navigation}){

  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [escolas, setEscolas] = useState([]);

  useEffect(()=>{ carregar(); },[]);

  async function carregar(){
    const db = await AsyncStorage.getItem("escolas");
    if(db) setEscolas(JSON.parse(db));
  }

  function entrar(){
    const achou = escolas.find(e=>e.nome === nome && e.senha === senha);
    if(achou){
      navigation.navigate("PainelEscola", { escola:nome });
    }else{
      Alert.alert("Acesso negado","Escola ou senha incorreta.");
    }
  }

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Área da Escola</Text>

      <TextInput placeholder="Nome da Escola" placeholderTextColor="#777"
      style={styles.input} value={nome} onChangeText={setNome}/>

      <TextInput placeholder="Senha"
      secureTextEntry placeholderTextColor="#777"
      style={styles.input} value={senha} onChangeText={setSenha}/>

      <TouchableOpacity style={styles.btn} onPress={entrar}>
        <Text style={styles.btnTxt}>Entrar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles=StyleSheet.create({
  container:{flex:1,backgroundColor:"#000",justifyContent:"center",alignItems:"center",padding:20},
  title:{color:"#fff",fontSize:30,fontWeight:"bold",marginBottom:40},
  input:{width:"80%",backgroundColor:"#111",borderRadius:10,padding:15,color:"#fff",marginBottom:15},
  btn:{backgroundColor:"#222",padding:18,borderRadius:15,width:"80%"},
  btnTxt:{color:"#fff",fontSize:18,textAlign:"center"}
});
