import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../supabase";

export default function Formulario({ navigation }) {

  const [escola, setEscola] = useState(null);
  const [listaEscolas, setListaEscolas] = useState([]);
  const [dropdown, setDropdown] = useState(false);

  const [prof, setProf] = useState("");
  const [estrutura, setEstrutura] = useState("");
  const [segur, setSegur] = useState("");
  const [ambiente, setAmbiente] = useState("");
  const [opiniao, setOpiniao] = useState("");

  useEffect(() => { carregarEscolas() }, []);

  async function carregarEscolas() {
    const { data } = await supabase.from("escolas").select("nome");
    setListaEscolas(data || []);
  }

  async function salvar() {
    if (!escola) return Alert.alert("Selecione uma escola!");
    if (!prof || !estrutura || !segur || !ambiente)
      return Alert.alert("Preencha todas as notas de 1 a 5!");

    const nova = {
      id: Date.now(),
      escola, prof, estrutura, segur, ambiente, opiniao,
      data: new Date().toLocaleDateString()
    };

    const db = await AsyncStorage.getItem("denuncias");
    const lista = db ? JSON.parse(db) : [];
    lista.push(nova);

    await AsyncStorage.setItem("denuncias", JSON.stringify(lista));

    Alert.alert("Denúncia registrada com sucesso!");
    navigation.goBack();
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>

      {/* 🔥 BARRA SUPERIOR */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Denúncia</Text>
      </View>

      {/* 🔥 ÁREA QUE ROLA TOTALMENTE */}
      <ScrollView style={{ flex: 1 }}
        contentContainerStyle={styles.scrollArea}
        showsVerticalScrollIndicator={true}
      >

        <View style={styles.box}>

          {/* ESCOLA */}
          <Text style={styles.label}>ESCOLA</Text>
          <TouchableOpacity style={styles.select} onPress={() => setDropdown(!dropdown)}>
            <Text style={escola ? styles.on : styles.off}>{escola || "Selecionar Escola ▼"}</Text>
          </TouchableOpacity>

          {dropdown && (
            <View style={styles.dropdown}>
              <FlatList
                data={listaEscolas}
                style={{ maxHeight: 200 }}
                keyExtractor={(i) => i.nome}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropItem}
                    onPress={() => { setEscola(item.nome); setDropdown(false) }}
                  >
                    <Text style={{ fontSize: 16 }}>{item.nome}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          {/* INPUTS */}
          <Text style={styles.label}>AMBIENTE ESCOLAR</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={ambiente} onChangeText={setAmbiente} placeholder="1 a 5" />

          <Text style={styles.label}>PROFESSORES</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={prof} onChangeText={setProf} placeholder="1 a 5" />

          <Text style={styles.label}>ESTRUTURA FÍSICA</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={estrutura} onChangeText={setEstrutura} placeholder="1 a 5" />

          <Text style={styles.label}>SEGURANÇA</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={segur} onChangeText={setSegur} placeholder="1 a 5" />

          <Text style={styles.label}>OPINIÃO</Text>
          <TextInput
            style={[styles.input, { height: 110 }]}
            multiline
            placeholder="Descreva com detalhes"
            value={opiniao}
            onChangeText={setOpiniao}
          />

          {/* BOTÃO */}
          <TouchableOpacity style={styles.btn} onPress={salvar}>
            <Text style={styles.btnTxt}>ENVIAR</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>

      {/* 🔥 BARRA FIXA */}
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => navigation.navigate("Formulario")}><Text style={styles.icon}>📢</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}><Text style={styles.icon}>🏠</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("PainelEscola")}><Text style={styles.icon}>⚙️</Text></TouchableOpacity>
      </View>

    </View>
  );
}

/* ----------------------- ESTILOS FINAL ----------------------- */

const styles = StyleSheet.create({

  scrollArea: {
    paddingBottom: 160,
    flexGrow: 1,
  },

  header: {
    paddingTop: 60,
    paddingBottom: 25,
    backgroundColor: "#000",
    borderBottomLeftRadius: 55,
    borderBottomRightRadius: 55,
    alignItems: "center",
    justifyContent: "center"
  },

  back: { position: "absolute", left: 20, fontSize: 28, color: "#fff" },
  headerTitle: { fontSize: 26, color: "#fff", fontWeight: "bold" },

  box: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 80,
    padding: 30,
    marginTop: -1
  },

  label: { fontWeight: "bold", marginTop: 18, fontSize: 16 },
  input: { backgroundColor: "#E6E6E6", padding: 13, borderRadius: 12, marginTop: 5, fontSize: 16 },

  select: { backgroundColor: "#E6E6E6", padding: 15, borderRadius: 12, marginTop: 5 },
  on: { color: "#000", fontSize: 16 },
  off: { color: "#777", fontSize: 16 },

  dropdown: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#ccc", borderRadius: 10, marginTop: 6 },
  dropItem: { padding: 15, borderBottomWidth: 1, borderColor: "#eee" },

  btn: { backgroundColor: "#000", padding: 18, borderRadius: 12, marginTop: 30 },
  btnTxt: { color: "#fff", fontSize: 19, textAlign: "center", fontWeight: "bold" },

  bottomBar: { position: "absolute", bottom: 0, width: "100%", backgroundColor: "#fff", flexDirection: "row", justifyContent: "space-around", paddingVertical: 12, borderTopLeftRadius: 25, borderTopRightRadius: 25 },
  icon: { fontSize: 26, color: "#000" },
});
