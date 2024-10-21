import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = data.user.id;

  const { data: files, error } = await supabase.storage
    .from("documents-bucket")
    .list(userId);

  if (error) {
    throw new Error(error.message);
  }

  return NextResponse.json({ success: true, files });
}
