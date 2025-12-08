import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../supabase";

export default function RegisterUser({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function cadastrar() {
    if (!email || !senha) {
      return Alert.alert("Erro", "Preencha todos os campos!");
    }

    const { data, error } = await supabase
      .from("usuarios")
      .insert([
        {
          email: email,
          senha: senha,
        }
      ]);

    if (error) return Alert.alert("Erro ao cadastrar", error.message);

    Alert.alert("✔ Sucesso", "Conta criada com sucesso!");
    navigation.navigate("LoginUser");
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Anonymous</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Criar nova conta</Text>
        <Text style={styles.subtitle}>
          Já está cadastrado?{"\n"}Faça login aqui.
        </Text>

        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu email"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>SENHA</Text>
        <TextInput
          style={styles.input}
          placeholder="Sua senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.btn} onPress={cadastrar}>
          <Text style={styles.btnText}>CADASTRA-SE</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  header: {
    backgroundColor: "#1A1A1A",
    padding: 20,
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderBottomLeftRadius: 50,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  card: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: -40,
    borderTopLeftRadius: 50,
    padding: 30,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },

  subtitle: {
    textAlign: "center",
    color: "#555",
    marginBottom: 25,
    fontSize: 13,
  },

  label: {
    fontWeight: "bold",
    fontSize: 13,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#E5E5E5",
    padding: 15,
    borderRadius: 12,
    marginTop: 5,
  },

  btn: {
    backgroundColor: "#111",
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
  },

  btnText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
