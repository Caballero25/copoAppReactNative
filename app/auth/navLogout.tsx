import { View, Text, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { getUserIdFromToken } from "./decodeTokenID";
import { getJWT, removeJWT } from "./jwt";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from "expo-router";

export function NavLogout() {
    const [tokenUser, setTokenUser] = useState<string | null | undefined>(null);
    const [nameUser, setNameUser] = useState<string | null | undefined>(null);
    const [isAuthenticated, setIsAuthenticted] = useState(true)
    const [initAuth, setInitAuth] = useState(false)
    const router = useRouter();

    const decodeId = async () => {
        if (tokenUser) { 
            const nameUser: string | null | undefined = await getUserIdFromToken(tokenUser);
            setNameUser(nameUser);
            setInitAuth(true)
        }
    };

    useEffect(()=> {
        decodeId();
    }, [initAuth])

    useEffect(() => {
        if ( isAuthenticated === false) {
            router.replace("")
        }
        decodeId();
    }, [isAuthenticated]);

    useEffect(() => {
        const fetchToken = async () => {
            const token: string | null | undefined = await getJWT();
            if (token){
                setIsAuthenticted(true);
                setTokenUser(token);
            } else {
                setIsAuthenticted(false);
            }
        };
        fetchToken();
    }, []);

    function logout() {
        if (tokenUser) {
            removeJWT()
            setIsAuthenticted(false)
        }
        
    }

    return (
        <View style={styles.logoutStyle}>
            {isAuthenticated ? <Text>Bienvenido {nameUser}   </Text> : <Text>Sin Sesión</Text>}
            <Pressable onPress={logout}><MaterialCommunityIcons name="logout" size={24} color="red" /></Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    logoutStyle: {
        flexDirection: "row",
    },
    textPressable: {
        color: "red",
    }
})
