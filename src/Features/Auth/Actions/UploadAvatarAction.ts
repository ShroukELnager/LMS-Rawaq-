'use server';

export async function uploadAvatarAction(file: File) {
  const formData = new FormData();

  formData.append('file', file);

  const fileName = `${Date.now()}-${file.name}`;

  const res = await fetch(
    `${process.env.BASE_URL}/storage/v1/object/uploads/users/${fileName}`,
    {
      method: 'POST',
      body: formData,
      headers: {
        apiKey: process.env.SUPABASE_KEY!,
      },
    }
  );

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return `${process.env.BASE_URL}/storage/v1/object/public/uploads/users/${fileName}`;
}