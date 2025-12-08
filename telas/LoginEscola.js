import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { supabase } from "../supabase";

export default function LoginEscola({navigation}){

  const [nome,setNome]=useState("");
  const [senha,setSenha]=useState("");

  async function login(){
    const { data } = await supabase
    .from("escolas")
    .select("*")
    .eq("nome",nome)
    .eq("senha",senha)
    .single();

    if(!data) return Alert.alert("Erro","Nome ou senha incorretos");
    
    navigation.navigate("PainelEscola",{escola:data});
  }

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Acesso da Escola</Text>

      <TextInput style={styles.input} placeholder="Nome da Escola" placeholderTextColor="#777" value={nome} onChangeText={setNome}/>
      <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#777" secureTextEntry value={senha} onChangeText={setSenha}/>

      <TouchableOpacity style={styles.btn} onPress={login}>
        <Text style={styles.txt}>Entrar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles=StyleSheet.create({
  container:{flex:1,backgroundColor:"#000",alignItems:"center",justifyContent:"center",padding:20},
  title:{fontSize:26,color:"#fff",marginBottom:35},
  input:{width:"80%",backgroundColor:"#111",padding:15,borderRadius:10,color:"#fff",marginBottom:15},
  btn:{backgroundColor:"#222",padding:18,borderRadius:10},
  txt:{color:"#fff",fontSize:18}
});
