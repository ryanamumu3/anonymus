import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { supabase } from "../supabase";

export default function PainelEscola({route}){

  const { escola } = route.params;
  const [lista,setLista]=useState([]);

  useEffect(()=>{ carregar(); },[]);

  async function carregar(){
    const { data } = await supabase
    .from("denuncias")
    .select("*")
    .eq("escola_id",escola.id);

    setLista(data);
  }

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Denúncias — {escola.nome}</Text>

      <FlatList
        data={lista}
        keyExtractor={i=>i.id}
        renderItem={({item})=>(
          <View style={styles.card}>
            <Text style={styles.txt}>Estrutura: {item.estrutura}</Text>
            <Text style={styles.txt}>Professores: {item.prof}</Text>
            <Text style={styles.txt}>Segurança: {item.segur}</Text>
            <Text style={styles.txt}>Ambiente: {item.amb}</Text>
            <Text style={styles.txt}>Comentário: {item.opiniao}</Text>
          </View>
        )}
      />
    </View>
  )
}

const styles=StyleSheet.create({
  container:{flex:1,backgroundColor:"#000",padding:20,paddingTop:60},
  title:{color:"#fff",fontSize:24,marginBottom:15},
  card:{backgroundColor:"#111",padding:12,borderRadius:10,marginBottom:10},
  txt:{color:"#fff"}
});
