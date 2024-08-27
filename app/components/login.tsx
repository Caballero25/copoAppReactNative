import {
  View,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
} from "react-native";
import { useState, useEffect } from "react";
import { storeJWT, getJWT, removeJWT } from "../auth/jwt"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from "expo-router";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [jwt, setJwt] = useState<string | null>(null);


  // Fetch JWT from AsyncStorage when component mounts
  useEffect(() => {
    const fetchJwt = async () => {
      const token = await AsyncStorage.getItem('jwt_token');
      setJwt(token);
    };

    fetchJwt();
  }, [jwt]);
  //Fetch login
  const fetchLogin = () => {
    fetch("https://balance-tests.up.railway.app/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status == 400) {
          alert(json.message);
        } else {
          if (json.jwt == null || json.jwt == "" || json.jwt == undefined) {
            alert("Hubo un problema en la autenticación")
          } else {
            storeJWT(json.jwt);
          router.replace('homeTab');
          }
        }
      })
      .catch((error) => {
        alert("error");
      });
  };

  //Component
  return (
    <View style={styles.formContainer}>
      <View style={styles.logoContainer}>
        <Image source={require("../../assets/logoCopoGrupo.png")}></Image>
      </View>

      <TextInput
        style={styles.inputStyle}
        placeholder="Nombre de usuario"
        onChangeText={(inputUsername) => setUsername(inputUsername)}
        defaultValue={username}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Contraseña"
        onChangeText={(inputPw) => setPassword(inputPw)}
        defaultValue={password}
      />
      <Pressable style={styles.inputButonStyle} onPress={fetchLogin}>
        <Text style={styles.textInputLogin}>Iniciar Sesión</Text>
      </Pressable>
      <Text style={styles.orStyle}>----------- O -----------</Text>
      <Link href={"/components/signin"} style={styles.registrarseStyle}>
        <Text style={styles.textInputSingIn}>Registrarse</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    marginBottom: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#e7e8ea",
    borderBottomLeftRadius: 5,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  inputStyle: {
    borderRadius: 10,
    backgroundColor: "#e7e8ea",
    marginTop: 5,
    padding: 10,
    width: "90%",
    textAlign: "center",
  },
  inputButonStyle: {
    borderRadius: 10,
    backgroundColor: "#b9cdf3",
    marginTop: 20,
    padding: 10,
    width: "90%",
    textAlign: "center",
  },
  textInputLogin: {
    textAlign: "center",
  },
  orStyle: {
    marginTop: 30,
  },
  registrarseStyle: {
    marginTop: 30,
    color: "blue",
  },
  textInputSingIn: {
    textAlign: "center",
    color: "blue",
  },
});
