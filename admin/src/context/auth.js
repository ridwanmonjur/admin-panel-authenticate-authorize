import { createContext, useState } from "react";
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { maxAgeAccessoken } from "@/utils/const";
import { useRouter } from "next/router";
import { toastError } from "@/utils/toast";
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState(getCookie(process.env.CLIENT_COOKIE_ACCESS_TOKEN));
  const [role, setRole] = useState(null)
  const setAccessTokenClient = (myToken) => {
    setCookie(process.env.CLIENT_COOKIE_ACCESS_TOKEN, myToken, { maxAge: maxAgeAccessoken });
    const token = getCookie(process.env.CLIENT_COOKIE_ACCESS_TOKEN);
    setAccessToken(token);
    setRole(jwt_decode(token).role)
  };

  const handleLogout = () => {
    try {
      deleteAcessToken();
      router.replace("/")
    }
    catch (error) {
      toastError(error)
    }
  }

  const deleteAcessToken = () => {
    deleteCookie(process.env.CLIENT_COOKIE_ACCESS_TOKEN)
    setAccessToken(null);
  }

  return (
    <Provider
      value={{
        setAccessTokenClient,
        handleLogout: () => handleLogout(),
        accessToken,
        role
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };