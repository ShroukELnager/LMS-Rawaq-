import { RejectRequest } from '@/Features/Dashboard/Types';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RejectRequest;

    const token = (await cookies()).get('access_token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch(
      `${process.env.BASE_URL}/rest/v1/rpc/reject_join_request`,
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

    if (!response.ok) {
      const errorData = await response.json();

      return NextResponse.json(
        {
          message:
            errorData.message ||
            errorData.error ||
            errorData.hint ||
            'Unable to reject request',
        },
        {
          status: response.status,
        }
      );
    }

    if (response.status === 204) {
      return NextResponse.json(
        { message: 'Rejected successfully' },
        { status: 200 }
      );
    }

    const data = await response.json();

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
