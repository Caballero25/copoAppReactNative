import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: string | null;
  sub: string; 
}

export const getUserIdFromToken = (token: string): string | null => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.sub;
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null;
  }
};



export const getIdForRequests = (token: string): string | null => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.userId;
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null;
  }
};