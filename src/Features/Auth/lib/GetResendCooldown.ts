"use server";

import { cookies } from "next/headers";

export async function getResendCooldown() {
  const cookieStore = await cookies();

  const expiresAt = Number(cookieStore.get("resendExpiresAt")?.value || 0);
  const trials = Number(cookieStore.get("resendTrials")?.value || 0);

  const now = Date.now();

  return {
    remainingTime: Math.max(0, Math.floor((expiresAt - now) / 1000)),
    trials,
    canResend: now >= expiresAt,
  };
}