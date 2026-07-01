'use server';

import { ActionResult } from '@/Shared/Types/action-result';
import { ResetPasswordFormData } from '../Types';

export async function ResetPasswordAction(
  data: ResetPasswordFormData & { accessToken: string }
): Promise<ActionResult> {
  try {
    const res = await fetch(`${process.env.BASE_URL}auth/v1/user`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
        apikey: process.env.SUPABASE_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: data.password,
      }),
    });

    if (!res.ok) {
      return {
        ok: false,
        error: 'Failed to reset password',
      };
    }

    return {
      ok: true,
    };
  } catch {
    return {
      ok: false,
      error: 'Reset Password failed',
    };
  }
}
