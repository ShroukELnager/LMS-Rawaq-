import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const groupId = request.nextUrl.searchParams.get('groupId');

  try {
    const token = (await cookies()).get('access_token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (!groupId) {
      return NextResponse.json(
        { message: 'groupId is required' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${process.env.BASE_URL}/rest/v1/student_joined_groups?id=eq.${groupId}`,
      {
        method: 'GET',
        headers: {
          apikey: process.env.SUPABASE_KEY!,
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          message:
            data.message || data.error || 'Failed to get Student Group Details',
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Get student group error:', error);

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
