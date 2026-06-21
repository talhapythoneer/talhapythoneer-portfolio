"use client";

import { useEffect, useState } from "react";
import type { Review } from "@/data/reviews";

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

/** Loads the full client-review dataset from the CSV at runtime. */
export function useReviews(): Review[] {
  const [reviews, setReviews] = useState<Review[]>([]);
  useEffect(() => {
    let active = true;
    fetch("/assets/data/reviews.csv")
      .then((res) => res.text())
      .then((text) => {
        if (active) setReviews(parseCSV(text) as unknown as Review[]);
      })
      .catch((err) => console.error("Error loading reviews:", err));
    return () => {
      active = false;
    };
  }, []);
  return reviews;
}
