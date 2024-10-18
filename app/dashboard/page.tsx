import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function Dashboard() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/login");
  }

  return <div>Dashboard</div>;
}
