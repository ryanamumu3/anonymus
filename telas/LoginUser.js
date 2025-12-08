import { useState } from "react";
import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { supabase } from "../supabase";

export default function LoginUser({ navigation }){

  const [email,setEmail] = useState("");
  const [senha,setSenha] = useState("");

  async function logar(){
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("email",email)
      .eq("senha",senha)
      .single();

    if (error || !data) return Alert.alert("Erro","Email ou senha incorretos ❌");

    navigation.navigate("Dashboard");
  }

  return(
    <ImageBackground 
      source={require("../assets/anonymus.png")}  // 🔥 mudou para anonymus.png
      style={styles.bg}
      imageStyle={{opacity:0.25}} // Deixa o fundo mais elegante (pode remover se quiser nítido)
    >

      <View style={styles.card}>

        <Text style={styles.title}>Login</Text>
        <Text style={styles.sub}>FAÇA LOGIN PARA CONTINUAR.</Text>

        <Text style={styles.label}>NOME</Text>
        <TextInput 
          style={styles.input}
          placeholder="Seu email..."
          placeholderTextColor="#A9A9A9"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>SENHA</Text>
        <TextInput 
          style={styles.input}
          placeholder="********"
          placeholderTextColor="#A9A9A9"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.btn} onPress={logar}>
          <Text style={styles.btnTxt}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate("RegisterUser")}>
          <Text style={styles.register}>ESQUECEU A SENHA?  <Text style={{fontWeight:"bold"}}>CADASTRE-SE</Text></Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  bg:{
    flex:1,
    justifyContent:"flex-end",
    backgroundColor:"#000",
  },

  card:{
    width:"100%",
    backgroundColor:"#fff",
    borderTopLeftRadius:60,
    borderTopRightRadius:60,
    padding:35,
    alignItems:"center"
  },

  title:{
    fontSize:38,
    fontWeight:"bold",
    color:"#000",
    marginTop:5
  },

  sub:{
    fontSize:12,
    color:"#555",
    marginBottom:30,
    letterSpacing:1
  },

  label:{
    width:"100%",
    color:"#000",
    fontSize:12,
    fontWeight:"bold",
  },

  input:{
    width:"100%",
    backgroundColor:"#E5E5E5",
    borderRadius:10,
    padding:12,
    marginBottom:12,
    color:"#000"
  },

  btn:{
    width:"100%",
    backgroundColor:"#111",
    padding:15,
    borderRadius:10,
    marginTop:10,
  },

  btnTxt:{
    textAlign:"center",
    color:"#fff",
    fontSize:17,
    fontWeight:"bold"
  },

  register:{
    marginTop:22,
    color:"#000",
    fontSize:12,
    textAlign:"center"
  }
});
