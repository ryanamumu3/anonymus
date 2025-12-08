import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Cadastro({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CRIAR CONTA</Text>

      <TextInput placeholder="Nome" style={styles.input}/>
      <TextInput placeholder="E-mail" style={styles.input}/>
      <TextInput placeholder="Senha" secureTextEntry style={styles.input}/>
      <TextInput placeholder="Data de nascimento" style={styles.input}/>

      <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate("Login")}>
        <Text style={styles.btnTxt}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
        <Text style={styles.link}>Já tem conta? Faça login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:"#000",justifyContent:"center",alignItems:"center",padding:25},
  title:{color:"#fff",fontSize:28,marginBottom:40,fontWeight:"bold"},
  input:{width:"90%",backgroundColor:"#111",padding:15,borderRadius:10,color:"#fff",marginBottom:10},
  btn:{width:"90%",backgroundColor:"#444",padding:15,borderRadius:10,marginTop:20},
  btnTxt:{color:"#fff",fontSize:18,textAlign:"center"},
  link:{color:"#fff",marginTop:15}
});
