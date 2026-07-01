'use server';

import { cookies } from 'next/headers';
import { ActionResult } from '@/Shared/Types/action-result';
import { ForgetPasswordRequest } from '../Types';

const RESEND_TIME = 5 * 60 * 1000;
const MAX_TRIALS = 10;

export async function ForgetPasswordAction(
  data: ForgetPasswordRequest
): Promise<ActionResult> {
  try {
    const cookieStore = await cookies();
    const now = Date.now();

    const resendExpiresAt = cookieStore.get('resendExpiresAt')?.value;
    const resendTrials = cookieStore.get('resendTrials')?.value;

    const expiresAt = resendExpiresAt ? Number(resendExpiresAt) : 0;
    const trials = resendTrials ? Number(resendTrials) : 0;

    if (expiresAt && now < expiresAt) {
      return {
        ok: false,
        cooldown: true,
        remainingTime: Math.floor((expiresAt - now) / 1000),
      };
    }

    if (trials >= MAX_TRIALS) {
      return {
        ok: false,
        error: 'Too many attempts. Try again later.',
      };
    }

    await fetch(`${process.env.BASE_URL}auth/v1/recover`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apiKey: process.env.SUPABASE_KEY!,
      },
      body: JSON.stringify({
        email: data.email,
      }),
    });

    const newExpiresAt = now + RESEND_TIME;

    cookieStore.set('resendExpiresAt', String(newExpiresAt), {
      httpOnly: true,
      secure: true,
      path: '/',
    });

    cookieStore.set('resendTrials', String(trials + 1), {
      httpOnly: true,
      secure: true,
      path: '/',
    });

    return {
      ok: true,
    };
  } catch (error) {
    console.error('Forget password error:', error);

    return {
      ok: true,
    };
  }
}
