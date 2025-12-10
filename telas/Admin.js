import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { supabase } from "../supabase";

export default function Admin({ navigation }){

  const [nome,setNome] = useState("");
  const [senha,setSenha] = useState("");
  const [lista,setLista]=useState([]);

  useEffect(()=>{ listar() },[]);

  async function listar(){
    const { data } = await supabase.from("escolas").select("*");
    setLista(data);
  }

  async function salvar(){
    if(!nome || !senha) return Alert.alert("Preencha tudo");
    
    const { error } = await supabase
    .from("escolas")
    .insert({nome,senha});

    if(error) Alert.alert("Erro",error.message);
    else{
      Alert.alert("Escola cadastrada!");
      listar();
      setNome(""); setSenha("");
    }
  }

  async function remover(id){
    await supabase.from("escolas").delete().eq("id",id);
    listar();
  }

  return(
    <View style={styles.container}>

      {/* 🔙 Botão de voltar */}
      <TouchableOpacity style={styles.back} onPress={()=>navigation.goBack()}>
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>PAINEL ADMIN</Text>

      <TextInput style={styles.input} placeholder="Nome da Escola" placeholderTextColor="#777" value={nome} onChangeText={setNome}/>
      <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#777" secureTextEntry value={senha} onChangeText={setSenha}/>

      <TouchableOpacity style={styles.btn} onPress={salvar}>
        <Text style={styles.btntxt}>Cadastrar Escola</Text>
      </TouchableOpacity>

      <FlatList
        data={lista}
        keyExtractor={i=>i.id}
        renderItem={({item})=>(
          <View style={styles.card}>
            <Text style={styles.txt}>{item.nome}</Text>
            <TouchableOpacity onPress={()=>remover(item.id)}>
              <Text style={styles.del}>EXCLUIR</Text>
            </TouchableOpacity>
          </View>
        )}
      />

    </View>
  )
}

const styles=StyleSheet.create({
  container:{flex:1,backgroundColor:"#000",padding:30,paddingTop:60},

  /* 🔥 seta de voltar */
  back:{position:"absolute",top:28,left:25,zIndex:5},
  backIcon:{fontSize:30,color:"#fff",fontWeight:"bold"},

  title:{color:"#fff",fontSize:26,textAlign:"center",marginBottom:30},
  input:{backgroundColor:"#111",padding:15,color:"#fff",borderRadius:10,marginBottom:12},
  btn:{backgroundColor:"#333",padding:15,borderRadius:10,marginBottom:20},
  btntxt:{textAlign:"center",color:"#fff",fontSize:18},
  card:{backgroundColor:"#111",padding:12,borderRadius:10,flexDirection:"row",justifyContent:"space-between",marginBottom:10},
  txt:{color:"#fff"},
  del:{color:"red",fontWeight:"bold"}
});
