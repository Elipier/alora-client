export interface TranslateResponse {
  translatedText: string;
}

export default async function translateToSpanish(
  text: string,
): Promise<string> {
  const response = await fetch("http://localhost:5000/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      q: text,
      source: "auto",
      target: "es",
      format: "text",
    }),
  });

  if (!response.ok) {
    throw new Error(`Erreur API traduction (${response.status})`);
  }

  const data = (await response.json()) as TranslateResponse;

  if (!data || typeof data.translatedText !== "string") {
    throw new Error("Réponse traduction invalide");
  }

  return data.translatedText;
}
