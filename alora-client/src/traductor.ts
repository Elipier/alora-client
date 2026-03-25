// TO DO :

// OK - Trouver une Api pour le projet (LibreTranslate)
// OK - Connecter à une Api (Docker en local pour le moment)
// OK - Entrer des phrases écrites + traduction
// OK - Input qui va recevoir le texte
// OK - Fonction appel API pour avoir la réponse
// OK - Afficher la réponse
// WIP - Correction des fautes (https://languagetool.org/)
// Corrections TS et clean
// Documenter Code dans Readme

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
      source: "auto", // détecte automatiquement
      target: "es",
      format: "text",
    }),
  });

  if (!response.ok) {
    throw new Error("Erreur API traduction");
  }

  const data = await response.json();
  return data.translatedText;
}
