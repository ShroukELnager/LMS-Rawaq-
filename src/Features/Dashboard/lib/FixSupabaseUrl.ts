export function fixSupabaseUrl(url?: string) {
  if (!url) return "";

  return url.replace(
    "https://nyrnpjrhajarawlpyxdd.supabase.co//",
    "https://nyrnpjrhajarawlpyxdd.supabase.co/"
  );
}