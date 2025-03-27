"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { User as FirebaseUser } from "firebase/auth";

import { auth } from "@/config/firebase";
import { Role } from "@/enums/auth.enum";

const isAdmin = (user: FirebaseUser | null) => {
  return user?.uid === process.env.NEXT_PUBLIC_FIREBASE_AUTH_ADMIN_UUID;
};


interface AuthContextType {
  user: FirebaseUser | null;
  role: Role;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  onChangeUser: (user: FirebaseUser | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [role, setRole] = useState<Role>(Role.MEMBER);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (isAdmin(user)) {
        setRole(Role.SUPER_ADMIN);
      } else {
        setRole(Role.MEMBER);
      }
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const onChangeUser = (user: FirebaseUser | null) => {
    setUser(user);
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error: any) {
      alert(String(error?.message));
      console.error("Login failed:", error.message);
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      router.push("/signin");
    } catch (error: any) {
      console.error("Logout failed:", error.message);
      alert(String(error?.message));
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error: any) {
      console.error("Signup failed:", error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, role, loading, login, logout, signup, onChangeUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
