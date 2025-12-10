import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { supabase } from "../supabase";

export default function LoginEscola({navigation}){

  const [nome,setNome] = useState("");
  const [senha,setSenha] = useState("");

  async function login(){
    const { data } = await supabase
      .from("escolas")
      .select("*")
      .eq("nome",nome)
      .eq("senha",senha)
      .single();

    if(!data) return Alert.alert("❌ Erro","Nome ou senha incorretos");

    navigation.navigate("PainelEscola",{ escola:data });
  }

  return(
    <View style={styles.container}>

      {/* 🔥 Card branco central moderno */}
      <View style={styles.box}>
        
        <Text style={styles.title}>Acesso Escola</Text>

        <TextInput 
          style={styles.input} 
          placeholder="Nome da Escola"
          placeholderTextColor="#666"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#666"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.btn} onPress={login}>
          <Text style={styles.btnTxt}>Entrar</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#000",
    justifyContent:"center",
    alignItems:"center",
    padding:25
  },

  box:{
    width:"90%",
    backgroundColor:"#fff",
    padding:35,
    borderRadius:30,
    alignItems:"center",
    elevation:5
  },

  title:{
    fontSize:28,
    fontWeight:"bold",
    marginBottom:25,
    color:"#000"
  },

  input:{
    width:"100%",
    backgroundColor:"#E6E6E6",
    padding:15,
    borderRadius:10,
    marginBottom:15,
    color:"#000",
    fontSize:16
  },

  btn:{
    width:"100%",
    backgroundColor:"#000",
    padding:15,
    borderRadius:10,
    marginTop:10
  },

  btnTxt:{
    color:"#fff",
    textAlign:"center",
    fontSize:18,
    fontWeight:"600"
  }

});
