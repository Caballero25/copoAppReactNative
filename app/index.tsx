import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import Login from "./components/login";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('jwt_token');
      setToken(storedToken);
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (token && token.length >= 10) {
      router.replace('homeTab');  // Usa replace en lugar de navigate para evitar agregar a la pila de navegación
    }
  }, [token]);

  if (token === null || token.length < 10 || token === undefined) {
    return <Login />;
  }

  return null;  // Si el token es válido, el componente navega automáticamente y no necesita renderizar nada más.
}
