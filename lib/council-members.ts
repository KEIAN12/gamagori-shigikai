import { createServerClient } from "@/lib/supabase/server";

export async function getCouncilMemberNames(): Promise<string[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("council_members")
      .select("name")
      .order("kana");
    if (error || !data) return [];
    return (data as { name: string }[]).map((r) => r.name);
  } catch {
    return [];
  }
}
