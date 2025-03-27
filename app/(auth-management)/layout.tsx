"use client";

import { CircularProgress } from "@heroui/react";
import { useRouter } from "next/navigation";

import { useAuthContext } from "@/contexts/auth-context";
export default function AuthManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  if (loading) {
    return <CircularProgress aria-label="Loading..." />;
  }

  if (!loading && user) {
    router.push("/");

    return;
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block w-full max-w-lg text-center justify-center">
        {children}
      </div>
    </section>
  );
}
