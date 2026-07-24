import { GradeSubmissionRequest } from '@/Features/Dashboard/Types';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GradeSubmissionRequest;

    const token = (await cookies()).get('access_token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch(
      `${process.env.BASE_URL}/rest/v1/rpc/submit_assignment_review`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: process.env.SUPABASE_KEY!,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    // لو رجع No Content
    if (response.status === 204) {
      return new NextResponse(null, {
        status: 204,
      });
    }

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          message:
            data.message || data.error || data.hint || 'Failed to review',
        },
        {
          status: response.status,
        }
      );
    }

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
