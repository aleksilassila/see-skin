import {
  createContext,
  HTMLAttributes,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "@firebase/auth";
import app from "../firebase/firebase";
import { useLocalStorage } from "./useLocalStorage";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
  isLoggedIn: () => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
  isLoggedIn: () => false,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = (props: HTMLAttributes<HTMLDivElement>) => {
  const [user, setUser] = useState<User | null>(useLocalStorage<User>("user"));
  const [loading, setLoading] = useState(true);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(app), (user) => {
      console.log("User changed", user?.displayName);
      setUser(user);
      setLoading(false);
      localStorage.setItem("user", JSON.stringify(user));
    });

    return () => unsubscribe();
  }, []);

  const login = () => {
    signInWithPopup(auth, provider).then().catch();
  };

  const logout = () => {
    signOut(auth).then().catch();
  };

  const isLoggedIn = () => {
    return user !== null;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
};
