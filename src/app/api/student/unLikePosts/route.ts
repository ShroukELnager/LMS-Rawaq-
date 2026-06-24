import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const post_id = request.nextUrl.searchParams.get("post_id");
    const user_id = request.nextUrl.searchParams.get("user_id");

    if (!post_id || !user_id) {
      return NextResponse.json(
        { message: "post_id and user_id are required" },
        { status: 400 }
      );
    }

    const token = (await cookies()).get("access_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/rest/v1/post_likes?post_id=eq.${post_id}&user_id=eq.${user_id}`,
      {
        method: "DELETE",
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_KEY!,
          Authorization: `Bearer ${token}`,
          Prefer: "return=representation",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          message:
            data.message ||
            data.error ||
            data.hint ||
            "Unable to remove like.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}