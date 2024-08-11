"use client";

import React from "react";
import AuthForm from "../form/auth-form";
import { useFormik } from "formik";
import { useAuthContext } from "@/contexts/auth-context";
import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { auth, collectionName, db } from "@/config/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { AuthFormValue } from "@/types/auth";
import { useRouter } from "next/navigation";

const createNewUserEmailAndPasswordFirebaseAuth = async (
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (res.user) {
      await saveNewUserToFireStoreCollection(res.user);
    }
  } catch (err: any) {
    console.error(err);
    alert(String(err?.message));
  }
};

const saveNewUserToFireStoreCollection = async (user: User) => {
  const docRef = doc(db, collectionName.users, user.uid);
  await setDoc(docRef, {
    id: user.uid,
    email: user.email,
    phoneNumber: user.phoneNumber,
    displayName: user.displayName,
    creationTime: user.metadata.creationTime,
    createdAt: serverTimestamp()
  });
};

export enum AuthMode {
  SIGN_IN = "sign_in",
  SIGN_UP = "sign_up",
}

interface AuthPageProps {
  authMode: AuthMode;
}

const AuthPage: React.FC<AuthPageProps> = ({ authMode }) => {
  const { login } = useAuthContext();
  const router = useRouter();

  const formik = useFormik<AuthFormValue>({
    initialValues: {
      email: "",
      password: "",
    },
    async onSubmit(values) {
      const { email, password } = values;
      if (authMode === AuthMode.SIGN_IN) {
        login(email, password);
      } else if (authMode === AuthMode.SIGN_UP) {
        await createNewUserEmailAndPasswordFirebaseAuth(email, password);
        router.push("/home");
      }
    },
  });

  return <AuthForm formik={formik} authMode={authMode} />;
};

export default AuthPage;
