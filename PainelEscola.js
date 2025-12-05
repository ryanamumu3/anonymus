import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PainelEscola({navigation}){
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Painel da Escola</Text>

      <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate("Feedback")}>
        <Text style={styles.cardTxt}>📌 Ver Feedbacks</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate("Denuncias")}>
        <Text style={styles.cardTxt}>📄 Ver Denúncias</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:"#000",paddingTop:80,alignItems:"center"},
  title:{color:"#fff",fontSize:28,fontWeight:"bold",marginBottom:40},
  card:{width:"80%",backgroundColor:"#222",padding:25,borderRadius:15,marginBottom:20},
  cardTxt:{color:"#fff",fontSize:20,textAlign:"center"}
});
