import { decodeJwt } from "jose";

type AccountType = "teacher" | "student";

export function GetAccountType(
  token?: string
): AccountType | null {
  if (!token) return null;

  try {
    const payload = decodeJwt(token);

    return (
      payload.user_metadata as {
        account_type?: AccountType;
      }
    )?.account_type ?? null;
  } catch {
    return null;
  }
}