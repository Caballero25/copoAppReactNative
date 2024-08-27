import {
    View,
    StyleSheet,
    Text,
    Pressable,
    TextInput,
    Image,
    SafeAreaView,
  } from "react-native";
  import { Screen } from "../screen";
  import { useRouter } from "expo-router";
  import { useState, SetStateAction } from "react";
  import DateTimePicker from "@react-native-community/datetimepicker";
  import { getJWT, storeJWT } from "../../auth/jwt";
  import { getIdForRequests } from "../../auth/decodeTokenID";
  
  export default function createIncome() {
  
      //DATE PICKER
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState<any>("date");
    const [show, setShow] = useState(false);
    //CONST
    const router = useRouter();
    const [concept, setConcept] = useState("");
    const [quantity, setQuantity] = useState("");
    const [jwt, setJwt] = useState<string | null>(null);
  
  
    const onChange = (event: any, selectedDate: any) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
    };
  
    const showMode = (currentMode: SetStateAction<string>) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode("date");
    };
  
    const showTimepicker = () => {
      showMode("time");
    };
  
    function formatDate(date: Date) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;
      return formattedDate
    }
  
  
  
  
    //Fetch
    const createSpentService = async () => {
      let jwt = await getJWT();
      if (jwt && jwt.length>10){
          try {
          const response = await fetch("https://balance-tests.up.railway.app/spents/create", {
              method: "POST",
              headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + jwt,
              },
              body: JSON.stringify({
                  id: getIdForRequests(jwt),
                  concept: concept,
                  quantity: quantity,
                  date: formatDate(date)
              }),
          });
      
          const data = await response.json();  // Convertir a JSON
      
          if (response.status === 400 || response.status === 500) {
              alert("Error en la solicitud")
          }else if (response.status == 401) {
              alert("Sesión caducada");
              storeJWT("")
              router.replace("")
          }
           else if (response.status === 200) {
              alert("Su gasto " + data.concept +  " fue registrado satisfactoriamente.");  // Suponiendo que esto es lo que quieres en el caso de éxito
          }
          } catch (error) {
          alert("Error en la solicitud.");
          }
      } else {
          alert("Sesión caducada");
          storeJWT("")
          router.replace("")
      }
  };
  
  
    return (
      //component
      <Screen>
        <View style={styles.formContainer}>
          <View style={styles.logoContainer}>
            <Image style={{width: 230, height: 180}} source={require("../../../assets/logoCopoGrupo.png")} resizeMode="contain"></Image>
            <Text style={{marginTop: -30, fontWeight: "bold", color: "#a93125"}}>GASTOS</Text>
          </View>
  
          <TextInput
            style={styles.inputStyle}
            placeholder="Concepto del gasto"
            onChangeText={(inputConcept) => setConcept(inputConcept)}
            defaultValue={""}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Cantidad $"
            onChangeText={(inputQuantity) => setQuantity(inputQuantity)}
            defaultValue={""}
          />
          <SafeAreaView style={{alignItems: "center"}}>
            <Pressable style={styles.inputStyle} onPress={showDatepicker}>
              <Text style={{textAlign: "center"}}>Ingresar Fecha</Text>
            </Pressable>
            <Pressable style={styles.inputStyle} onPress={showTimepicker}>
              <Text style={{textAlign: "center"}}>Ingresar Hora</Text>
            </Pressable>
            <Text style={{marginTop: 5, fontWeight: "bold"}}>Seleccionado: {date.toLocaleString()}</Text>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
              />
            )}
          </SafeAreaView>
          <Pressable onPress={createSpentService} style={styles.inputButonStyle}>
            <Text style={styles.textInputLogin}>Crear Gasto</Text>
          </Pressable>
        </View>
      </Screen>
    );
  }
  
  const styles = StyleSheet.create({
    logoContainer: {
      textAlign: "center",
      alignItems: "center",
      marginBottom: 10,
      marginTop: -50,
      borderBottomWidth: 1,
      borderBottomColor: "#e7e8ea",
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      width: 325,
      height: 200,
    },
    formContainer: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      alignContent: "center",
    },
    inputStyle: {
      borderRadius: 10,
      backgroundColor: "#e7e8ea",
      marginTop: 5,
      padding: 10,
      width: 170,
      textAlign: "center",
  
    },
    inputButonStyle: {
      borderRadius: 10,
      backgroundColor: "#b9cdf3",
      marginTop: 20,
      padding: 10,
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
  