import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = user.id;

  const data = await request.formData();
  const files = data.getAll("files") as (Blob & { name: string })[];

  if (files.length === 0) {
    return NextResponse.json({ message: "No files uploaded" }, { status: 400 });
  }

  const uploadedFiles = [];
  try {
    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `${userId}/${fileName}`;

      // Upload the file to Supabase storage
      const { data: uploadData, error } = await supabase.storage
        .from("documents-bucket")
        .upload(filePath, file);

      if (error) {
        throw new Error(error.message);
      }

      uploadedFiles.push({ name: file.name, path: uploadData?.path });
    }

    return NextResponse.json({ success: true, files: uploadedFiles });
  } catch (error) {
    console.error("Upload failed", error);
    return NextResponse.json({ message: "Upload failed" }, { status: 500 });
  }
}
