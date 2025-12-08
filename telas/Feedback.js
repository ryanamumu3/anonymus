import { StyleSheet, Text, View } from "react-native";

export default function Feedback() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FEEDBACKS</Text>

      <View style={styles.box}><Text style={styles.txt}>Positivos: 48%</Text></View>
      <View style={styles.box}><Text style={styles.txt}>Negativos: 22%</Text></View>
      <View style={styles.box}><Text style={styles.txt}>Neutros: 30%</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:"#000",paddingTop:80,alignItems:"center"},
  title:{color:"#fff",fontSize:28,fontWeight:"bold",marginBottom:25},
  box:{width:"80%",backgroundColor:"#222",padding:20,borderRadius:12,marginBottom:12},
  txt:{color:"#fff",fontSize:18,textAlign:"center"}
});
