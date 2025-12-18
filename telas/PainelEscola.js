import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { supabase } from "../supabase";

function avaliar(v) {
  return {
    1: "Insatisfeito",
    2: "Pouco satisfeito",
    3: "Satisfeito",
    4: "Muito satisfeito",
  }[v] || "Não informado";
}

export default function PainelEscola({ route }) {
  const { escola } = route.params;
  const [lista, setLista] = useState([]);
  const [comentarios, setComentarios] = useState({});

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const { data } = await supabase
      .from("denuncias")
      .select("*")
      .eq("escola_id", escola.id);

    setLista(data || []);
  }

  return (
    <View style={styles.container}>

      <FlatList
        data={lista}
        keyExtractor={(i) => i.id.toString()}
        style={{ flex: 1 }}
        contentContainerStyle={styles.scroll}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>{escola.nome}</Text>
            <Text style={styles.subtitle}>Denúncias registradas</Text>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>

<Text style={styles.data}>
  📅 {new Date(item.data).toLocaleString("pt-BR")}
</Text>


            <Text style={styles.label}>
              Estrutura: <Text style={styles.value}>{avaliar(item.estrutura)}</Text>
            </Text>

            <Text style={styles.label}>
              Professores: <Text style={styles.value}>{avaliar(item.prof)}</Text>
            </Text>

            <Text style={styles.label}>
              Segurança: <Text style={styles.value}>{avaliar(item.segur)}</Text>
            </Text>

            <Text style={styles.label}>
              Ambiente: <Text style={styles.value}>{avaliar(item.amb)}</Text>
            </Text>

            {item.opiniao ? (
              <>
                <Text style={styles.label}>Opinião:</Text>
                <Text style={styles.value}>{item.opiniao}</Text>
              </>
            ) : null}

            <View style={styles.comentarioBox}>
              <Text style={styles.comentarioTitle}>Comentário da escola</Text>

              <TextInput
                style={styles.input}
                multiline
                value={comentarios[item.id] || ""}
                onChangeText={(t) =>
                  setComentarios((p) => ({ ...p, [item.id]: t }))
                }
              />

              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Salvar</Text>
              </TouchableOpacity>
            </View>

          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100vh", // 🔥 ISSO FAZ ROLAR NO PC
    backgroundColor: "#f2f4f8",
  },

  scroll: {
    padding: 16,
    paddingBottom: 100,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
  },

  subtitle: {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },

  label: {
    color: "#6b7280",
  },

  value: {
    fontWeight: "600",
    color: "#111827",
  },

  comentarioBox: {
    marginTop: 12,
    backgroundColor: "#f9fafb",
    padding: 12,
    borderRadius: 12,
  },

  comentarioTitle: {
    fontWeight: "700",
    color: "#2563eb",
    marginBottom: 6,
  },

  input: {
    minHeight: 60,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },

  btn: {
    backgroundColor: "#2563eb",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "700",
  },

  data: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 6,
  }
});
