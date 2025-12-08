import { Picker } from "@react-native-picker/picker"; // <- precisa instalar
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { supabase } from "../supabase";

export default function Formulario(){

  const [escolas, setEscolas] = useState([]);
  const [escolaSelecionada, setEscolaSelecionada] = useState(null);

  const [estrutura,setEstrutura] = useState("");
  const [prof,setProf] = useState("");
  const [segur,setSegur] = useState("");
  const [amb,setAmb] = useState("");
  const [opiniao,setOpiniao] = useState("");

  useEffect(()=>{ carregarEscolas() },[]);

  async function carregarEscolas(){
    const { data, error } = await supabase.from("escolas").select("*");
    if(error) Alert.alert("Erro ao carregar escolas");
    else setEscolas(data);
  }

  async function enviar(){
    if(!escolaSelecionada)
      return Alert.alert("Selecione uma escola!");

    const { error } = await supabase
    .from("denuncias")
    .insert({
      escola_id: escolaSelecionada,  // 🔥 Agora pega automaticamente
      estrutura, prof, segur, amb, opiniao
    });

    if(error) Alert.alert("Erro",error.message);
    else{
      Alert.alert("Denúncia enviada com sucesso!");
      setEstrutura("");   setProf("");
      setSegur("");       setAmb("");
      setOpiniao("");     setEscolaSelecionada(null);
    }
  }

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Enviar Denúncia</Text>

      {/* 🔥 SELETOR DE ESCOLAS (SUBSTITUI O CAMPO DE ID) */}
      <View style={styles.pickerBox}>
        <Picker
          dropdownIconColor="#fff"
          style={{color:"#fff"}}
          selectedValue={escolaSelecionada}
          onValueChange={(value)=>setEscolaSelecionada(value)}
        >
          <Picker.Item label="Selecione a escola" value={null}/>
          {escolas.map(e=>(
            <Picker.Item key={e.id} label={e.nome} value={e.id}/>
          ))}
        </Picker>
      </View>

      <TextInput style={styles.input} placeholder="Estrutura (1 a 5)" placeholderTextColor="#777" keyboardType="numeric" value={estrutura} onChangeText={setEstrutura}/>
      <TextInput style={styles.input} placeholder="Professores (1 a 5)" placeholderTextColor="#777" keyboardType="numeric" value={prof} onChangeText={setProf}/>
      <TextInput style={styles.input} placeholder="Segurança (1 a 5)" placeholderTextColor="#777" keyboardType="numeric" value={segur} onChangeText={setSegur}/>
      <TextInput style={styles.input} placeholder="Ambiente (1 a 5)" placeholderTextColor="#777" keyboardType="numeric" value={amb} onChangeText={setAmb}/>
      <TextInput style={styles.input} placeholder="Comentário" placeholderTextColor="#777" multiline value={opiniao} onChangeText={setOpiniao}/>

      <TouchableOpacity style={styles.btn} onPress={enviar}>
        <Text style={styles.btnTxt}>Enviar</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles=StyleSheet.create({
  container:{flex:1,backgroundColor:"#000",padding:25,paddingTop:60},
  title:{color:"#fff",fontSize:26,textAlign:"center",marginBottom:25,fontWeight:"bold"},

  pickerBox:{backgroundColor:"#111",borderRadius:10,marginBottom:12,borderWidth:1,borderColor:"#444"},

  input:{backgroundColor:"#111",color:"#fff",padding:12,borderRadius:10,marginBottom:12,fontSize:16},

  btn:{backgroundColor:"#222",padding:18,borderRadius:10,marginTop:10},
  btnTxt:{textAlign:"center",color:"#fff",fontSize:18,fontWeight:"bold"}
});
