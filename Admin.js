import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Admin(){

  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [lista, setLista] = useState([]);

  useEffect(()=>{ carregar(); },[]);

  async function carregar(){
    const db = await AsyncStorage.getItem("escolas");
    if(db) setLista(JSON.parse(db));
  }

  async function salvar(){
    if(!nome || !senha) return Alert.alert("Preencha tudo");
    const nova = { nome, senha };

    const novaLista = [...lista, nova];
    setLista(novaLista);
    await AsyncStorage.setItem("escolas", JSON.stringify(novaLista));

    setNome("");
    setSenha("");
  }

  async function remover(nome){
    const nova = lista.filter(e => e.nome !== nome);
    setLista(nova);
    await AsyncStorage.setItem("escolas", JSON.stringify(nova));
  }

  return(
    <View style={styles.container}>
      
      <Text style={styles.title}>PAINEL ADMIN</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da Escola"
        placeholderTextColor="#777"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#777"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.btn} onPress={salvar}>
        <Text style={styles.btnTxt}>Cadastrar Escola</Text>
      </TouchableOpacity>

      <Text style={styles.sub}>ESCOLAS CADASTRADAS</Text>

      <FlatList
        data={lista}
        keyExtractor={(item)=>item.nome}
        renderItem={({item})=>(
          <View style={styles.card}>
            <Text style={styles.txt}>{item.nome}</Text>
            <TouchableOpacity onPress={()=>remover(item.nome)}>
              <Text style={styles.del}>REMOVER</Text>
            </TouchableOpacity>
          </View>
        )}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:"#000",padding:20,paddingTop:50},
  title:{color:"#fff",fontSize:26,fontWeight:"bold",marginBottom:25,textAlign:"center"},
  input:{backgroundColor:"#111",color:"#fff",padding:14,borderRadius:10,marginBottom:10},
  btn:{backgroundColor:"#222",padding:15,borderRadius:12,marginBottom:25},
  btnTxt:{textAlign:"center",color:"#fff",fontSize:18},
  sub:{color:"#fff",fontSize:20,marginBottom:10},
  card:{backgroundColor:"#111",padding:12,borderRadius:10,flexDirection:"row",justifyContent:"space-between",marginBottom:8},
  txt:{color:"#fff"},
  del:{color:"red",fontWeight:"bold"}
});
