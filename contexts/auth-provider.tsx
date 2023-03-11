import { Auth } from "@/models/auth";
import { ReactNode, createContext, useState, useEffect } from "react";

type AuthContextType = {
  auth: Auth | null;
  setAuth: (auth: Auth | null) => void;
};

type Props = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>({
  auth: null,
  setAuth: () => {},
});

const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<Auth | null>(null);

  /**
   * Set the auth state from the session storage
   */
  useEffect(() => {
    const authJson = window.sessionStorage.getItem("auth");
    if (authJson) {
      setAuth(JSON.parse(authJson));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
