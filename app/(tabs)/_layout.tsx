import FontAwesome from "@expo/vector-icons/FontAwesome";
import { IngresosIcon, EgresosIcon, PerfilIcon } from "../components/icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
        <Tabs.Screen
        name="homeTab"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ingresosTab"
        options={{
          title: "Ingresos",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <IngresosIcon size={40} color={color}></IngresosIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="egresosTab"
        options={{
          title: "Egresos",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <EgresosIcon size={40} color={color}></EgresosIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <PerfilIcon marginTop={9} size={25} color={color}></PerfilIcon>
          ),
        }}
      />
    </Tabs>
    
  );
}
