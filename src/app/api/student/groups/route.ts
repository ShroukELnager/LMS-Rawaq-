import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const token = (await cookies()).get('access_token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);

    const search = searchParams.get('search') || '';
    const limit = Number(searchParams.get('limit')) || 6;
    const offset = Number(searchParams.get('offset')) || 0;

    const params = new URLSearchParams();

    params.set('limit', String(limit));
    params.set('offset', String(offset));

    if (search.trim()) {
      params.set(
        'or',
        `(name.ilike.*${search}*,description.ilike.*${search}*,category.ilike.*${search}*)`
      );
    }

    const response = await fetch(
      `${process.env.BASE_URL}/rest/v1/groups_with_status?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          apikey: process.env.SUPABASE_KEY!,
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Prefer: 'count=exact',
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          message: data.message || data.error || 'Failed to load groups',
        },
        { status: response.status }
      );
    }

    const contentRange = response.headers.get('content-range');

    let totalCount = 0;

    if (contentRange) {
      const total = contentRange.split('/')[1];

      if (total && total !== '*') {
        totalCount = Number(total);
      }
    }

    return NextResponse.json({
      data,
      totalCount,
      offset,
      limit,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: 'Failed to load groups' },
      { status: 500 }
    );
  }
}
