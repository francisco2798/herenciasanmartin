export const deleteImageAndRow = async ({ id, filePath }: { id?: string; filePath?: string | null }) => {
  const payload: any = {};
  if (id) payload.id = id;
  if (filePath) payload.filePath = filePath;

  const res = await fetch("/api/delete-image", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const ct = res.headers.get("content-type") ?? "";
  const body = ct.includes("application/json") ? await res.json() : await res.text();

  if (!res.ok) {
    // lanza el body para que lo veas en la consola del cliente
    throw new Error(`Status ${res.status} - ${JSON.stringify(body)}`);
  }
  return body;
};