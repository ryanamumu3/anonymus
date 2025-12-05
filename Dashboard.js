import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

let toquesAdmin = 0;

export default function Dashboard({navigation}){

  function adminHidden(){
    toquesAdmin++;
    if(toquesAdmin >= 3){
      navigation.navigate("Admin");
      toquesAdmin = 0;
    }
  }

  return (
    <View style={styles.container}>

      {/* 3 cliques no título → abre painel ADMIN */}
      <TouchableOpacity onPress={adminHidden}>
        <Text style={styles.title}>Anonymous</Text>
      </TouchableOpacity>

      {/* USUÁRIO NORMAL */}
      <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate("Formulario")}>
        <Text style={styles.cardTxt}>📢 Enviar Denúncia</Text>
      </TouchableOpacity>

      {/* ACESSO ESCOLAR */}
      <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate("LoginEscola")}>
        <Text style={styles.cardTxt}>🏫 Área da Escola</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:"#000",alignItems:"center",paddingTop:100},
  title:{color:"#fff",fontSize:32,fontWeight:"bold",marginBottom:45},
  card:{width:"80%",backgroundColor:"#222",padding:25,borderRadius:12,marginBottom:18},
  cardTxt:{color:"#fff",fontSize:20,textAlign:"center"},
});
