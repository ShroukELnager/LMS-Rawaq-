
export const UnLikePostService = async (
  post_id: string,
  user_id:string
) => {
  const res = await fetch(`/api/student/unLikePosts?post_id=${post_id}&user_id=${user_id}`

, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    let message = "Something went wrong";

    try {
      const error = await res.json();
      message = error.message || error.error || message;
    } catch {
      message = `Request failed (${res.status})`;
    }

    throw new Error(message);
  }

  return res.json();
};