"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  User,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/react";

import AuthForm from "../form/auth-form";
import { GoogleIcon } from "../icons/GoogleIcon";

import { AuthMode } from "@/enums/auth.enum";
import { AuthFormValue } from "@/types/auth";
import { auth, collectionName, db, googleProvider } from "@/config/firebase";
import { useAuthContext } from "@/contexts/auth-context";

const resetPassword = async (email: string) => {
  return await sendPasswordResetEmail(auth, email);
};

const createNewUserEmailAndPasswordFirebaseAuth = async (
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    if (res.user) {
      await saveNewUserToFireStoreCollection(res.user);

      return { status: 200 };
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
    createdAt: serverTimestamp(),
  });
};

interface AuthPageProps {
  authMode: AuthMode;
}

const AuthPage: React.FC<AuthPageProps> = ({ authMode }) => {
  const { login } = useAuthContext();
  const router = useRouter();
  const [savedPassword, setSavedPassword] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const password = localStorage.getItem("savedPassword");

      setSavedPassword(String(password));
    }
  }, []);

  const formik = useFormik<AuthFormValue>({
    initialValues: {
      email: "",
      password:
        authMode === AuthMode.SIGN_IN && savedPassword ? savedPassword : "",
      isSavePassword: true,
      code: "",
    },
    async onSubmit(values) {
      const { email, password, isSavePassword } = values;

      if (authMode === AuthMode.SIGN_IN) {
        if (isSavePassword) {
          localStorage.setItem("savedPassword", password);
        }
        login(email, password);
      } else if (authMode === AuthMode.SIGN_UP) {
        await createNewUserEmailAndPasswordFirebaseAuth(email, password).then(
          (res) => {
            if (res?.status === 200) {
              router.push("/home");
            }
          }
        );
      } else if (authMode === AuthMode.RESET_PASSWORD) {
        await resetPassword(email).then((res) => {
          confirm("ได้ส่งอีเมลไปเพื่อรีเซ็ทรหัสผ่านแล้ว เช็คอีเมล!");
          router.push("/signin");
        });
      }
    },
  });

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // The signed-in user info
      console.log("User Info:", user);
      // You can also access the user's Google Access Token here
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      console.log("Google Access Token:", token);
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    }
  };

  return (
    <div className="space-y-5">
      <AuthForm authMode={authMode} formik={formik} />
      <Divider />
      <Button
        fullWidth
        className="bg-white border border-gray-400"
        size="md"
        startContent={<GoogleIcon />}
        onClick={handleGoogleSignIn}
      >
        Login with Google
      </Button>
    </div>
  );
};

export default AuthPage;
