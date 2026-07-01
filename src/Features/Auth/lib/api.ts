export async function apiRequest(url: string, options: RequestInit = {}) {
  const res = await fetch(`${process.env.BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (res.status === 204) {
    return null;
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.msg || data.message || 'Request failed');
  }

  return data;
}
