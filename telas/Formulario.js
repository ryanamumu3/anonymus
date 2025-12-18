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

import { supabase } from "../supabase";

// 🔥 opções de satisfação
const opcoes = [
  "Insatisfeito",
  "Pouco satisfeito",
  "Satisfeito",
  "Muito satisfeito"
];

// 🔥 mapeamento para o banco (int)
const notasMap = {
  "Insatisfeito": 1,
  "Pouco satisfeito": 2,
  "Satisfeito": 3,
  "Muito satisfeito": 4
};

export default function Formulario({ navigation }) {

  const [escola, setEscola] = useState(null);
  const [listaEscolas, setListaEscolas] = useState([]);
  const [dropdownEscola, setDropdownEscola] = useState(false);

  const [prof, setProf] = useState(null);
  const [estrutura, setEstrutura] = useState(null);
  const [segur, setSegur] = useState(null);
  const [ambiente, setAmbiente] = useState(null);
  const [opiniao, setOpiniao] = useState("");

  useEffect(() => { carregarEscolas() }, []);

  async function carregarEscolas() {
    const { data } = await supabase.from("escolas").select("*");
    setListaEscolas(data || []);
  }

  async function salvar() {
    if (!escola || !prof || !estrutura || !segur || !ambiente) {
      return Alert.alert("Preencha todos os campos!");
    }

    const { error } = await supabase.from("denuncias").insert([
      {
        escola_id: escola.id,
        prof: notasMap[prof],
        estrutura: notasMap[estrutura],
        segur: notasMap[segur],
        amb: notasMap[ambiente],
        opiniao: opiniao || null
      }
    ]);

    if (error) {
      Alert.alert("Erro", error.message);
      return;
    }

    Alert.alert("Denúncia enviada com sucesso!");
    navigation.goBack();
  }

  // 🔥 seletor reutilizável
  function Seletor({ label, value, setValue }) {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Text style={styles.label}>{label}</Text>

        <TouchableOpacity style={styles.select} onPress={() => setOpen(!open)}>
          <Text style={value ? styles.on : styles.off}>
            {value || "Selecionar ▼"}
          </Text>
        </TouchableOpacity>

        {open && (
          <View style={styles.dropdown}>
            {opcoes.map((op) => (
              <TouchableOpacity
                key={op}
                style={styles.dropItem}
                onPress={() => {
                  setValue(op);
                  setOpen(false);
                }}
              >
                <Text>{op}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>

      {/* 🔥 HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Denúncia</Text>
      </View>

      {/* 🔥 SCROLL */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollArea}
      >
        <View style={styles.box}>

          {/* ESCOLA */}
          <Text style={styles.label}>ESCOLA</Text>
          <TouchableOpacity
            style={styles.select}
            onPress={() => setDropdownEscola(!dropdownEscola)}
          >
            <Text style={escola ? styles.on : styles.off}>
              {escola ? escola.nome : "Selecionar Escola ▼"}
            </Text>
          </TouchableOpacity>

          {dropdownEscola && (
            <View style={styles.dropdown}>
              <FlatList
                data={listaEscolas}
                keyExtractor={(i) => i.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropItem}
                    onPress={() => {
                      setEscola(item);
                      setDropdownEscola(false);
                    }}
                  >
                    <Text>{item.nome}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          {/* 🔥 SELETORES */}
          <Seletor label="AMBIENTE ESCOLAR" value={ambiente} setValue={setAmbiente} />
          <Seletor label="PROFESSORES" value={prof} setValue={setProf} />
          <Seletor label="ESTRUTURA FÍSICA" value={estrutura} setValue={setEstrutura} />
          <Seletor label="SEGURANÇA" value={segur} setValue={setSegur} />

          {/* OPINIÃO */}
          <Text style={styles.label}>OPINIÃO</Text>
          <TextInput
            style={[styles.input, { height: 110 }]}
            multiline
            placeholder="Descreva sua opinião"
            value={opiniao}
            onChangeText={setOpiniao}
          />

          <TouchableOpacity style={styles.btn} onPress={salvar}>
            <Text style={styles.btnTxt}>ENVIAR</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      {/* 🔥 BOTTOM BAR */}
      <View style={styles.bottomBar}>
        <TouchableOpacity><Text style={styles.icon}>📢</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}><Text style={styles.icon}>🏠</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("PainelEscola")}><Text style={styles.icon}>⚙️</Text></TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  scrollArea: { paddingBottom: 160 },

  header: {
    paddingTop: 60,
    paddingBottom: 25,
    backgroundColor: "#000",
    borderBottomLeftRadius: 55,
    borderBottomRightRadius: 55,
    alignItems: "center",
  },

  back: { position: "absolute", left: 20, fontSize: 28, color: "#fff" },
  headerTitle: { fontSize: 26, color: "#fff", fontWeight: "bold" },

  box: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 80,
    padding: 30,
    marginTop: -1,
  },

  label: { fontWeight: "bold", marginTop: 18, fontSize: 16 },

  input: {
    backgroundColor: "#E6E6E6",
    padding: 13,
    borderRadius: 12,
    marginTop: 5,
    fontSize: 16,
  },

  select: {
    backgroundColor: "#E6E6E6",
    padding: 15,
    borderRadius: 12,
    marginTop: 5,
  },

  on: { color: "#000", fontSize: 16 },
  off: { color: "#777", fontSize: 16 },

  dropdown: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginTop: 6,
  },

  dropItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  btn: {
    backgroundColor: "#000",
    padding: 18,
    borderRadius: 12,
    marginTop: 30,
  },

  btnTxt: {
    color: "#fff",
    fontSize: 19,
    textAlign: "center",
    fontWeight: "bold",
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  icon: { fontSize: 26, color: "#000" },
});
