import { LikePostRequest } from "@/Features/Dashboard/Types";

export const LikePostService = async (data: LikePostRequest) => {
  const res = await fetch("/api/student/likePosts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
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