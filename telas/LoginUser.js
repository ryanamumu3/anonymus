import { useRef, useState } from "react";
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { supabase } from "../supabase";

/* 🔥 validação básica de email */
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export default function LoginUser({ navigation }) {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // 🔥 controle dos cliques secretos
  const tapCount = useRef(0);
  const lastTap = useRef(0);

  async function logar() {

    // ✅ validação básica
    if (!email || !senha) {
      return Alert.alert("Erro", "Preencha email e senha");
    }

    if (!validarEmail(email)) {
      return Alert.alert("Email inválido", "Digite um email válido");
    }

    if (senha.length < 6) {
      return Alert.alert("Senha inválida", "A senha deve ter ao menos 6 caracteres");
    }

    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("email", email)
      .eq("senha", senha)
      .single();

    if (error || !data) {
      Alert.alert("Erro", "Email ou senha incorretos ❌");
      return;
    }

    navigation.navigate("Dashboard");
  }

  // 🔥 função do clique secreto
  function handleSecretTap() {
    const now = Date.now();

    if (now - lastTap.current < 600) {
      tapCount.current += 1;
    } else {
      tapCount.current = 1;
    }

    lastTap.current = now;

    if (tapCount.current === 3) {
      tapCount.current = 0;
      navigation.navigate("LoginEscola");
    }
  }

  return (
    <ImageBackground
      source={require("../assets/anonymus.png")}
      style={styles.bg}
      imageStyle={{ opacity: 0.25 }}
    >
      <View style={styles.card}>

        {/* 🔥 LOGIN COM 3 CLIQUES */}
        <TouchableOpacity onPress={handleSecretTap} activeOpacity={0.8}>
          <Text style={styles.title}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.sub}>FAÇA LOGIN PARA CONTINUAR.</Text>

        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu email..."
          placeholderTextColor="#A9A9A9"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <Text style={styles.label}>SENHA</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          placeholderTextColor="#A9A9A9"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.btn} onPress={logar}>
          <Text style={styles.btnTxt}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("RegisterUser")}>
          <Text style={styles.register}>
            <Text style={{ fontWeight: "bold" }}>CADASTRE-SE</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.guestBtn}
          onPress={() => navigation.navigate("Dashboard", { guest: true })}
        >
          <Text style={styles.guestTxt}>ENTRAR SEM LOGIN</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#000",
  },

  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    padding: 35,
    alignItems: "center",
  },

  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#000",
    marginTop: 5,
  },

  sub: {
    fontSize: 12,
    color: "#555",
    marginBottom: 30,
    letterSpacing: 1,
  },

  label: {
    width: "100%",
    color: "#000",
    fontSize: 12,
    fontWeight: "bold",
  },

  input: {
    width: "100%",
    backgroundColor: "#E5E5E5",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    color: "#000",
  },

  btn: {
    width: "100%",
    backgroundColor: "#111",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },

  btnTxt: {
    textAlign: "center",
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },

  register: {
    marginTop: 22,
    color: "#000",
    fontSize: 12,
    textAlign: "center",
  },

  guestBtn: {
    marginTop: 18,
  },

  guestTxt: {
    color: "#111",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
