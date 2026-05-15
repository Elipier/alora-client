export interface LanguageToolReplacement {
  value: string;
}

export interface LanguageToolContext {
  offset: number;
  length: number;
  text: string;
}

export interface LanguageToolMatch {
  message: string;
  shortMessage: string;
  offset: number;
  length: number;
  replacements: LanguageToolReplacement[];
  context: LanguageToolContext;
}

export interface LanguageToolResult {
  matches: LanguageToolMatch[];
}

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
