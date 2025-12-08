import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login({ navigation }) {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");

  function acessar() {

    // 🔥 Login de Admin
    if(nome === "admin" && senha === "123"){
      navigation.navigate("Admin");
      return;
    }

    // 🧑 Login comum
    navigation.navigate("Dashboard");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FAÇA LOGIN</Text>

      <TextInput style={styles.input} placeholder="Nome" placeholderTextColor="#666" value={nome} onChangeText={setNome}/>
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry placeholderTextColor="#666" value={senha} onChangeText={setSenha}/>

      <TouchableOpacity style={styles.btn} onPress={acessar}>
        <Text style={styles.btnTxt}>Entrar</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:"#000",justifyContent:"center",alignItems:"center",padding:25},
  title:{color:"#fff",fontSize:28,fontWeight:"bold",marginBottom:40},
  input:{width:"90%",backgroundColor:"#111",padding:15,borderRadius:10,color:"#fff",marginBottom:10},
  btn:{width:"90%",backgroundColor:"#444",padding:15,borderRadius:10,marginTop:20},
  btnTxt:{color:"#fff",fontSize:18,textAlign:"center"}
});
