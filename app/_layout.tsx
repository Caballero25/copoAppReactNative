import { View, StyleSheet, Image } from "react-native" 
import { Stack } from "expo-router"
import {NavLogout} from "./auth/navLogout"


export default function Layout() {
    return (
        <View style={styles.layoutContainer}>
            <Stack
                screenOptions={{
                    title: "",
                    headerRight: () => {
                        return (
                            <Image style={styles.logoStyle} source={require("../assets/logoCopoGrupo.png")}></Image>
                        )
                    },
                }}
            >
                <Stack.Screen name="(tabs)" options={{ headerShown: true, headerRight: () => {
                        return(
                            <NavLogout></NavLogout>
                        )
                    }, }} />
            </Stack>
        </View>
    )
}

const styles = StyleSheet.create({
     layoutContainer: {
        flex: 1,
     },
     logoStyle: {
        width: 100,
        height: 27,
     }
})