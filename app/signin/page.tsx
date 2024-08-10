"use client"
import AuthPage, { AuthMode } from "@/components/auth-page";

export default function SignInPage() {
  return <AuthPage authMode={AuthMode.SIGN_IN} />;
}
