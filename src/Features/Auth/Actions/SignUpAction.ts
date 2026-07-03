'use server';

import { ActionResult } from '@/Shared/Types/action-result';
import { AuthService } from '../AuthService';
import { SignUpRequest } from '../Types';
import { setAuthCookies } from '../Utils/SetAuth';

export async function signupAction(data: SignUpRequest): Promise<ActionResult> {
  try {
    const response = await AuthService.SignUp(data);

    await setAuthCookies(response);

    return {
      ok: true,
      data: response,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Signup failed',
    };
  }
}
