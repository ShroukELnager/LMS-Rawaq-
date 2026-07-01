'use server';

import { AuthService } from "../AuthService";


export async function logoutAction() {
  try {
    const response = await AuthService.Logout();

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
}
