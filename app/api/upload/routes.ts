// app/api/upload/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "node";

export async function POST(req: Request) {
  try {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: "Missing server env vars" }, { status: 500 });
    }

    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const form = await req.formData();
    const file = form.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const fileName = `${Date.now()}_${file.name}`;
    const filePath = `collections/${fileName}`;

    const uploadRes = await supabaseAdmin.storage.from("images").upload(filePath, file);
    if (uploadRes.error) {
      return NextResponse.json({ error: uploadRes.error }, { status: 500 });
    }

    const { data } = supabaseAdmin.storage.from("images").getPublicUrl(filePath);
    return NextResponse.json({ publicUrl: data.publicUrl, filePath });
  } catch (err) {
    console.error("Unexpected upload error", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}