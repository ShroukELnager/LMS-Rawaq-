'use server';

import { ActionResult } from '@/Shared/Types/action-result';
import { AuthService } from '../AuthService';
import { SetAuthCookiesFServerAction } from '../Utils/SetAuthCookiesFServerAction';
import { LoginForm } from '../Schema/Login';

export async function loginAction(data: LoginForm): Promise<ActionResult> {
  try {
    const response = await AuthService.Login(data);

    await SetAuthCookiesFServerAction(response, data.rememberMe);

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
