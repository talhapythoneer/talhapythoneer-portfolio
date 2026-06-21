import fs from "fs";
import path from "path";
import type { Review } from "./reviews";

// Server-only: read the full client-review dataset from the CSV at build time
// so it can be embedded into JSON-LD structured data in the static HTML.

/** Minimal RFC-4180 CSV parser (handles quoted fields, escaped quotes, newlines). */
function parseCSV(text: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += ch;
    } else if (ch === '"') inQuotes = true;
    else if (ch === ",") { row.push(field); field = ""; }
    else if (ch === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else if (ch !== "\r") field += ch;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  if (rows.length === 0) return [];
  const header = rows[0];
  return rows
    .slice(1)
    .filter((r) => r.length > 1 || (r.length === 1 && r[0] !== ""))
    .map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ""])));
}

export function getAllReviews(): Review[] {
  try {
    const file = path.join(process.cwd(), "public", "assets", "data", "reviews.csv");
    const text = fs.readFileSync(file, "utf8");
    return parseCSV(text) as unknown as Review[];
  } catch (err) {
    console.error("Could not read reviews.csv for schema:", err);
    return [];
  }
}
