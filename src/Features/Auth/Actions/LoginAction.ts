'use server';

import { ActionResult } from '@/Shared/Types/action-result';
import { LoginFormData } from '../Types';
import { AuthService } from '../AuthService';
import { setAuthCookies } from '../Utils/SetAuthCookies';

export async function loginAction(data: LoginFormData): Promise<ActionResult> {
  try {
    const response = await AuthService.Login(data);

    await setAuthCookies(response, data.rememberMe);

    return {
      ok: true,
      data: response,
    };
  } catch (error) {
    console.log('LOGIN ERROR:', error);

    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Login failed',
    };
  }
}
