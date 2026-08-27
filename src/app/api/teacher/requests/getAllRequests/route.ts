import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const token = (await cookies()).get('access_token')?.value;

    if (!token) {
      return NextResponse.json(
        {
          message: 'Unauthorized',
        },
        {
          status: 401,
        }
      );
    }

    const { searchParams } = new URL(request.url);

    const search = searchParams.get('search')?.trim() || '';

    const groupId = searchParams.get('group_id') || '';

    const limitParam = searchParams.get('limit');

    const offsetParam = searchParams.get('offset');

    const limit = Math.max(Number(limitParam) || 5, 1);

    const offset = Math.max(Number(offsetParam) || 0, 0);

    const params = new URLSearchParams();

    /*
     * Pagination
     */
    params.set('limit', String(limit));

    params.set('offset', String(offset));

    /*
     * Group filter
     */
    if (groupId) {
      params.set('group_id', `eq.${groupId}`);
    }

    /*
     * Search
     */
    if (search) {
      /*
       * Escape characters that can interfere
       * with PostgREST filter syntax.
       */
      const keyword = search
        .replace(/\\/g, '\\\\')
        .replace(/\*/g, '\\*')
        .replace(/,/g, '\\,');

      params.set(
        'or',
        `(email.ilike.*${keyword}*,first_name.ilike.*${keyword}*,last_name.ilike.*${keyword}*)`
      );
    }

    const url = `${process.env.BASE_URL}/rest/v1/get_group_join_requests?${params.toString()}`;

    const response = await fetch(url, {
      method: 'GET',

      headers: {
        apikey: process.env.SUPABASE_KEY!,

        Authorization: `Bearer ${token}`,

        'Content-Type': 'application/json',

        Prefer: 'count=exact',
      },

      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          message:
            data?.message || data?.error || 'Failed to load students requests',
        },
        {
          status: response.status,
        }
      );
    }

    /*
     * Content-Range example:
     *
     * 0-4/27
     *
     * start = 0
     * end = 4
     * total = 27
     */
    const contentRange = response.headers.get('content-range');

    let rangeStart = offset;

    let rangeEnd = Math.min(offset + data.length - 1, offset + limit - 1);

    let totalCount = 0;

    if (contentRange) {
      const [range, total] = contentRange.split('/');

      if (range) {
        const [start, end] = range.split('-').map(Number);

        if (Number.isFinite(start)) {
          rangeStart = start;
        }

        if (Number.isFinite(end)) {
          rangeEnd = end;
        }
      }

      if (total && total !== '*') {
        const parsedTotal = Number(total);

        if (Number.isFinite(parsedTotal)) {
          totalCount = parsedTotal;
        }
      }
    }

    return NextResponse.json({
      data,
      totalCount,
      offset: rangeStart,
      end: rangeEnd,
      limit,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: 'Internal Server Error',
      },
      {
        status: 500,
      }
    );
  }
}
