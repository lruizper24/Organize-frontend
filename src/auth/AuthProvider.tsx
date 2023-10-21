import { useContext, createContext, useState, useEffect } from "react";
import type { AuthResponse, User } from "../types/types";

interface AuthProviderProps{
    children: React.ReactNode;
}

const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => {},
  setAccessTokenAndRefreshToken: (
    _accessToken: string,
    _refreshToken: string
  ) => {},
  getRefreshToken: () => {},
  saveUser: (_userData: AuthResponse) => {},
  getUser: () => ({} as User | undefined),
  signout: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | undefined>();
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isloading, setIsLoading] = useState(true);

    async function requestNewAccessToken(refreshToken: string) {
    const token = await requestNewAccessToken(refreshToken);
    if (token) {
      return token;
    }
  }
    
    
    async function checkAuth() {
        try {
        if (!!accessToken) {
            //existe access token
            const userInfo = await retrieveUserInfo(accessToken);
            setUser(userInfo);
            setAccessToken(accessToken);
            setIsAuthenticated(true);
            setIsLoading(false);
        } else {
            //no existe access token
            const token = localStorage.getItem("token");
            if (token) {
            console.log("useEffect: token", token);
            const refreshToken = JSON.parse(token).refreshToken;
            //pedir nuevo access token
            getNewAccessToken(refreshToken)
                .then(async (newToken) => {
                const userInfo = await retrieveUserInfo(newToken!);
                setUser(userInfo);
                setAccessToken(newToken!);
                setIsAuthenticated(true);
                setIsLoading(false);
                })
                .catch((error) => {
                console.log(error);
                setIsLoading(false);
                });
            } else {
            setIsLoading(false);
            }
        }
        } catch (error) {
        setIsLoading(false);
        }
    }
 
    
    function getAccessToken() {
        return accessToken;
    }

    function saveUser(userData: AuthResponse) {
        setAccessTokenAndRefreshToken(
        userData.body.accessToken,
        userData.body.refreshToken
        );
        setUser(userData.body.user);
        setIsAuthenticated(true);
    }


 return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        getAccessToken,
        setAccessTokenAndRefreshToken,
        getRefreshToken,
        saveUser,
        getUser,
        signout,
      }}
    >
      {isloading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
