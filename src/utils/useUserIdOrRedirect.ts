"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export function useUserIdOrRedirect(): string | null {
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const id = localStorage.getItem("user_id");
    if (!id) {
      alert("Please login first");
      router.push("/login");
    } else {
      setUserId(id);
    }
  }, [router]);

  return userId;
}
