import AsyncStorage from '@react-native-async-storage/async-storage';

// Almacenar el JWT
export const storeJWT = async (token: string) => {
  try {
    await AsyncStorage.setItem('jwt_token', token);
  } catch (error) {
    console.error('Error al almacenar el token:', error);
  }
};

// Obtener el JWT
export const getJWT = async () => {
  try {
    const token: string | null = await AsyncStorage.getItem('jwt_token');
    return token;
  } catch (error) {
    console.error('Error al obtener el token:', error);
  }
};

// Eliminar el JWT
export const removeJWT = async () => {
  try {
    await AsyncStorage.removeItem('jwt_token');
  } catch (error) {
    console.error('Error al eliminar el token:', error);
  }
};