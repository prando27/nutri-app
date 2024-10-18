import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = createClient();

  const data = await request.formData();
  const file = data.get("file") as Blob & { name: string };

  if (!file) {
    return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
  }

  const fileName = `${Date.now()}-${file.name}`;

  try {
    const { data: uploadData, error } = await supabase.storage
      .from("documents-bucket")
      .upload(fileName, file);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ success: true, path: uploadData?.path });
  } catch (error) {
    console.error("Upload failed", error);
    return NextResponse.json({ message: "Upload failed" }, { status: 500 });
  }
}
