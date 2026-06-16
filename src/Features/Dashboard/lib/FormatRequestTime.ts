 export const formatRequestTime = (date: string) => {
  const now = new Date();
  const createdAt = new Date(date);

  const diffMs = now.getTime() - createdAt.getTime();

  const hours = Math.floor(diffMs / (1000 * 60 * 60));

  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 30) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }

  const months = Math.floor(days / 30);

  if (months < 12) {
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  }

  const years = Math.floor(months / 12);

  return `${years} year${years !== 1 ? "s" : ""} ago`;
};