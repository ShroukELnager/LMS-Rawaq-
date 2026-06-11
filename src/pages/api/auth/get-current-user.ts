import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    return res.status(401).json({ message: "No access token" });
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}auth/v1/user`,
      {
        method: "GET",
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_KEY!,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}