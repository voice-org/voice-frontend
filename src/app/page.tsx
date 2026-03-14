"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LandingPage } from "@/components/landing/LandingPage";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("voice_user");
    if (user) {
      router.push("/feed");
    }
  }, [router]);

  return <LandingPage />;
}
