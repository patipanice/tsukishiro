"use client"
import AuthPage, { AuthMode } from "@/components/auth-page";

export default function SignUpPage() {
  return <AuthPage authMode={AuthMode.SIGN_UP} />;
}
