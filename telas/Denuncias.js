import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Denuncias(){

  const [dados, setDados] = useState([]);

  useEffect(()=>{ carregar(); },[]);

  async function carregar(){
    const db = await AsyncStorage.getItem("denuncias");
    if(db) setDados(JSON.parse(db));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DENÚNCIAS REGISTRADAS</Text>

      <FlatList
        data={dados}
        keyExtractor={i=>i.id.toString()}
        renderItem={({item})=>(
          <View style={styles.card}>
            <Text style={styles.txt}>🏫 Escola: {item.escola}</Text>
            <Text style={styles.txt}>👨‍🏫 Professores: {item.prof}</Text>
            <Text style={styles.txt}>🏫 Estrutura: {item.estrutura}</Text>
            <Text style={styles.txt}>🛡 Segurança: {item.segur}</Text>
            <Text style={styles.txt}>📚 Ambiente: {item.ambiente}</Text>
            <Text style={styles.txt}>✍ Opinião: {item.opiniao || "—"}</Text>
            <Text style={[styles.txt,{opacity:0.6}]}>📅 {item.data}</Text>
          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:"#000",padding:20,paddingTop:60},
  title:{color:"#fff",fontSize:24,fontWeight:"bold",marginBottom:15},
  card:{backgroundColor:"#111",padding:12,borderRadius:10,marginBottom:10},
  txt:{color:"#fff",fontSize:15}
});
