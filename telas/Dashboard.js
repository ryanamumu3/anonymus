import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

let taps = 0;

export default function Dashboard({navigation}){

  function abrirAdmin(){
    taps++;
    if(taps>=3){
      navigation.navigate("Admin");
      taps=0;
    }
  }

  return(
    <View style={styles.container}>

      <TouchableOpacity onPress={abrirAdmin}>
        <Text style={styles.title}>Anonymous</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate("Formulario")}>
        <Text style={styles.txt}>📢 Enviar Denúncia</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate("LoginEscola")}>
        <Text style={styles.txt}>🏫 Área da Escola</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles=StyleSheet.create({
  container:{flex:1,backgroundColor:"#000",alignItems:"center",paddingTop:100},
  title:{color:"#fff",fontSize:32,fontWeight:"bold",marginBottom:40},
  card:{width:"80%",backgroundColor:"#222",padding:25,borderRadius:15,marginBottom:20},
  txt:{color:"#fff",fontSize:20,textAlign:"center"}
});
