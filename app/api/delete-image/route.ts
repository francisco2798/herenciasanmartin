import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

export async function DELETE(req: Request) {
  try {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error("Missing SUPABASE env vars");
      return NextResponse.json({ error: "Missing server env vars" }, { status: 500 });
    }

    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { id, filePath } = (await req.json()) as { id?: string; filePath?: string };

    if (!id && !filePath) {
      return NextResponse.json({ error: "Missing id or filePath" }, { status: 400 });
    }

    if (filePath) {
      const normalized = filePath.replace(/^\/+/, "").trim();
      console.log("Attempting to delete file from storage:", normalized);

      const { data: delData, error: delError } = await supabaseAdmin
        .storage
        .from("images") // verifica que "images" sea tu bucket
        .remove([normalized]);

      console.log("Storage remove response delData:", delData, "delError:", delError);

      if (delError) {
        // devolver el mensaje exacto para depuración
        console.error("Storage delete error:", delError);
        return NextResponse.json({ error: delError.message || String(delError), detail: delError }, { status: 500 });
      }

      if (!delData || (Array.isArray(delData) && delData.length === 0)) {
        console.warn("Storage reported no file deleted for:", normalized);
        // no abortamos la eliminación de la fila por si quieres borrar la fila aunque no exista el archivo
      } else {
        console.log("File deleted from storage:", normalized);
      }
    }

    if (id) {
      const parsedId = /^\d+$/.test(id) ? Number(id) : id;
      const { data, error: dbError } = await supabaseAdmin
        .from("collections")
        .delete()
        .eq("id", parsedId)
        .select();

      console.log("DB delete response data:", data, "dbError:", dbError);

      if (dbError) {
        console.error("DB delete error:", dbError);
        return NextResponse.json({ error: dbError.message || String(dbError) }, { status: 500 });
      }

      const rows = (data as any[] | null) ?? null;
      if (!rows || rows.length === 0) {
        console.warn("No rows deleted for id:", parsedId);
        return NextResponse.json({ error: "No row deleted" }, { status: 404 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("delete-image error", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}