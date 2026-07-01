import { CreateGroupFormData } from '@/Features/Dashboard/Types';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateGroupFormData;

    const token = (await cookies()).get('access_token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch(
      `${process.env.BASE_URL}/rest/v1/group_join_requests`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: process.env.SUPABASE_KEY!,
          Authorization: `Bearer ${token}`,
          Prefer: 'return=representation',
        },
        body: JSON.stringify(body),
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
            'Unable to send your request. Please try again.',
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data, {
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
