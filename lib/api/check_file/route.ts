import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const SUPABASE_URL = process.env.SUPABASE_URL!;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const url = new URL(req.url);
  const path = url.searchParams.get("path");
  if (!path) return NextResponse.json({ exists: false }, { status: 400 });

  const normalized = path.replace(/^\/+/, "");
  const { data, error } = await supabaseAdmin.storage.from("images").list(normalized, { limit: 1, offset: 0 });
  if (error) return NextResponse.json({ error: error.message || String(error) }, { status: 500 });

  // si list devuelve elementos, existe; si no, no existe
  return NextResponse.json({ exists: Array.isArray(data) && data.length > 0 });
}