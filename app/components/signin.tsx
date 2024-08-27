import { View, Image, StyleSheet, Text, TextInput, Pressable, ScrollView } from "react-native"
import { useState } from "react"
import { Link } from "expo-router"


export default function Signin() {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmpassword] = useState('')
    const [email, setEmail] = useState('')
    const [confirmemail, setConfirmemail] = useState('')

        const fetchSignin = async () => {
            try {
              const response = await fetch("https://balance-tests.up.railway.app/auth/register", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: name,
                  username: username,
                  password: password,
                  confirmPassword: confirmpassword,
                  email: email,
                  confirmEmail: confirmemail
                }),
              });
          
              const data = await response.json();  // Convertir a JSON
          
              if (response.status === 400 || response.status === 500) {
                alert(data.message);  // Acceder al mensaje de error
              } else if (response.status === 201) {
                alert("Su cuenta " + username + " se creó satisfactoriamente.");  // Suponiendo que esto es lo que quieres en el caso de éxito
              }
            } catch (error) {
              alert("Error en la solicitud.");
            }
          };

    return (
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.secondContainer}>
                <Image style={styles.logoStyle} source={require('../../assets/logoCopoGrupo.png')} resizeMode="contain" ></Image>
                <Text style={{textAlign: "center"}}>Registrate con nosotros para llevar nota de tus gastos y costos, planifica tus finanzas hoy.</Text>
                <View style={styles.inputsContainer}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Nombre y Apellido"
                        onChangeText={(inputNombreApellido) => setName(inputNombreApellido)}
                    />
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Apodo (Username)"
                        onChangeText={(inputUsername) => setUsername(inputUsername)}
                    />
                    <TextInput
                    secureTextEntry={true}
                        style={styles.inputStyle}
                        placeholder="Contraseña"
                        onChangeText={(inputPW) => setPassword(inputPW)}
                    />
                    <TextInput
                    secureTextEntry={true}
                        style={styles.inputStyle}
                        placeholder="Confirmar Contraseña"
                        onChangeText={(inputConfirmPW) => setConfirmpassword(inputConfirmPW)}
                    />
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Email"
                        onChangeText={(inputEmail) => setEmail(inputEmail)}
                    />
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Confirmar Email"
                        onChangeText={(inputConfirmEmail) => setConfirmemail(inputConfirmEmail)}
                    />
                    <Pressable onPress={fetchSignin} style={styles.inputButonStyle} >
                        <Text style={styles.textInputLogin}>Registrarse</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.haveAccount}>
                <Text style={{fontWeight: "bold"}}>¿Ya tienes una cuenta? </Text>
                <Link href={"/components/login"} style={{padding: 7}}><Text style={{color: "#174a71", fontWeight: "bold"}}>Iniciar Sesión</Text></Link>
            </View>
        </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: "#f1f0ec",
        },
        secondContainer: {
            padding: 20,
            borderWidth: 1,
            borderColor: "grey",
            borderRadius: 7,
            width: 300,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
        },
        inputsContainer: {
            marginTop: 10,
        },
        logoStyle: {
            width: 200,
        },
        inputStyle: {
            borderRadius: 10,
            backgroundColor: "#e7e8ea",
            marginTop: 5,
            padding: 10,
            width: 230,
            textAlign: "left",
        },
        inputButonStyle: {
            borderRadius: 10,
            backgroundColor: "#b9cdf3",
            marginTop: 20,
            padding: 10,
            width: 230,
            textAlign: "center",
        },
          textInputLogin: {
          textAlign: "center",
        },
        haveAccount: {
            flexDirection: "row",
            marginTop: 15,
            borderWidth: 1,
            borderColor: "grey",
            borderRadius: 7,
            width: 300,
            height: 65,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
        }

    }
)