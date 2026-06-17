import type { LanguageToolResult } from "./types";

export default async function checkFrenchText(
  text: string,
): Promise<LanguageToolResult> {
  const body = new URLSearchParams({
    text,
    language: "fr",
  });

  const res = await fetch("http://localhost:8010/v2/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!res.ok) {
    throw new Error(`Erreur API correction (${res.status})`);
  }

  const data = (await res.json()) as LanguageToolResult;
  return data;
}
