import { View, Text, Button, Pressable, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Screen } from "../components/screen";
import { IngresosIcon, EgresosIcon } from "../components/icons";
import { Link, router } from "expo-router";
import { getJWT, storeJWT } from "../auth/jwt";
import { useRouter } from "expo-router";

export default function Home() {
  interface SpentAndIncome {
    id: number;
    concept: string;
    quantity: number;
    date: string;
  }

  interface Balance {
    totalIncomes: number;
    totalSpents: number;
    total: number;
  }

  const [balance, setBalance] = useState<Balance>({
    totalIncomes: 0,
    totalSpents: 0,
    total: 0,
  });
  const [incomes, setIncomes] = useState<SpentAndIncome[]>([]);
  const [spents, setSpents] = useState<SpentAndIncome[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const formatDate = (milliseconds: number | string) => {
    const date = new Date(milliseconds);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Los meses en JavaScript son de 0 a 11, por lo que sumamos 1
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const onRefresh = () => {
    setRefreshing(true);

    // Simular una recarga, por ejemplo, llamando a una API
    setTimeout(() => {
      setRefreshing(refreshing);
      // Aquí puedes recargar los datos o hacer otras acciones
    }, 1300); // 2 segundos de espera
  };

  useEffect(() => {
    const fetchBalance = async () => {
      let jwt = await getJWT();
      if (jwt && jwt.length>10){
        try {
          const response = await fetch(
            "https://balance-tests.up.railway.app/balance",
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + jwt,
              },
            }
          );
  
          const data = await response.json();
  
          if (response.status === 400 || response.status === 500) {
            alert("Sesión caducada");
            storeJWT("")
            router.replace("")
          } else if (response.status === 200) {
            setBalance(data);
            setIncomes(data.incomes);
            setSpents(data.spents);
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
    fetchBalance();
  }, [refreshing]);

  return (
    <Screen>
      <ScrollView style={styles.homeContainer} contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <View style={styles.iconContainer}>
          <View style={styles.icon}>
            <View>
              <View style={styles.optionHeder}>
                <View>
                  <IngresosIcon size={40} color={"green"}></IngresosIcon>
                  <Text style={{ fontWeight: "bold" }}>Ingresos Recientes</Text>
                </View>
                <View>
                  <Link href={"/components/incomes/create"} asChild>
                    <Pressable style={{backgroundColor:"#f6f6f6", padding: 8, borderRadius: 10}}>
                      <Text style={{color: "#226320", fontWeight: "bold", textAlign: "center"}}>CREAR INGRESO</Text>
                    </Pressable>
                  </Link>
                </View>
                
              </View>
              <View>
                {incomes.slice(-4).reverse().map((income) => (
                  <Text key={income.id} style={{textAlign: "left", padding: 2,}}>
                    {income.concept.length > 24 ? income.concept.slice(0, 23) + "..." : income.concept}  |  {income.quantity}$  |  {formatDate(income.date)}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <View style={styles.icon}>
          <View>
              <View style={styles.optionHeder}>
                <View>
                  <EgresosIcon size={40} color={"red"}></EgresosIcon>
                  <Text style={{ fontWeight: "bold" }}>Ingresos Recientes</Text>
                </View>
                <View>
                  <Link href={"/components/spents/create"} asChild>
                    <Pressable style={{backgroundColor:"#f6f6f6", padding: 8, borderRadius: 10}}>
                      <Text style={{color: "#a93125", fontWeight: "bold", textAlign: "center"}}>CREAR GASTO</Text>
                    </Pressable>
                  </Link>
                </View>
                
              </View>
              <View>
                {spents.slice(-4).reverse().map((spent) => (
                  <Text key={spent.id} style={{textAlign: "left", padding: 2,}}>
                    {spent.concept.length > 25 ? spent.concept.slice(0, 25) + "..." : spent.concept}  |  {spent.quantity}  |  {formatDate(spent.date)}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </View>
        <View style={styles.resumeContainer}>
          <Text><Text style={{fontWeight: "bold"}}>Total de Ingresos:</Text> {balance.totalIncomes}$</Text>
          <Text><Text style={{fontWeight: "bold"}}>Total de Gastos:</Text> {balance.totalSpents}$</Text>
          <View style={{flexDirection: "row", marginTop: 7}}>
            <Text style={{fontWeight: "bold"}}>Balance: </Text>
            {balance.total > 0? <Text style={{color:"green"}}>{balance.total}$</Text> : <Text style={{color:"red"}}>{balance.total}$</Text>}
          </View>
          
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    
  },
  iconContainer: {
    marginTop: 10,
    marginBottom: 10,
    width: 350,
    height: 200,
    borderColor: "grey",
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
  },
  resumeContainer: {
    marginTop: 10,
    marginBottom: 10,
    width: 350,
    height: 83,
    borderColor: "grey",
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
  },
  icon: {
    flex: 1,
  },
  optionHeder: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
