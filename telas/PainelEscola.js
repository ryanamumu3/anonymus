import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { supabase } from "../supabase";

export default function PainelEscola({ route }) {
  const { escola } = route.params;
  const [lista, setLista] = useState([]);
  const [comentarios, setComentarios] = useState({}); // armazena comentário de cada denúncia

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

  function salvarComentario(denunciaId) {
    console.log("Comentário da denúncia", denunciaId, ":", comentarios[denunciaId]);
    // aqui você salva no banco
  }

  function atualizarComentario(denunciaId, texto) {
    setComentarios((prev) => ({ ...prev, [denunciaId]: texto }));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{escola.nome}</Text>
      <Text style={styles.subtitle}>Denúncias registradas</Text>

      <FlatList
        data={lista}
        keyExtractor={(i) => i.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.label}>Estrutura: <Text style={styles.value}>{item.estrutura}</Text></Text>
            <Text style={styles.label}>Professores: <Text style={styles.value}>{item.prof}</Text></Text>
            <Text style={styles.label}>Segurança: <Text style={styles.value}>{item.segur}</Text></Text>
            <Text style={styles.label}>Ambiente: <Text style={styles.value}>{item.amb}</Text></Text>

            {/* ESPAÇO PARA COMENTÁRIO */}
            <View style={styles.comentarioContainer}>
              <Text style={styles.comentarioTitle}>Comentário da Escola</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite aqui o comentário..."
                placeholderTextColor="#9ca3af"
                multiline
                value={comentarios[item.id] || ""}
                onChangeText={(text) => atualizarComentario(item.id, text)}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => salvarComentario(item.id)}
              >
                <Text style={styles.buttonText}>Salvar</Text>
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
    flex: 1,
    backgroundColor: "#f2f4f8",
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 5,
  },
  label: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },
  value: {
    fontWeight: "600",
    color: "#111827",
  },
  comentarioContainer: {
    marginTop: 12,
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 12,
  },
  comentarioTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2563eb",
    marginBottom: 6,
    textTransform: "uppercase",
  },
  input: {
    minHeight: 60,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 10,
    fontSize: 14,
    color: "#111827",
    textAlignVertical: "top",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});
