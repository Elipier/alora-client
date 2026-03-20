// TO DO :

// Trouver une Api pour le projet (Google Trad vs Open Source)

// Entrer des phrases écrites + traduction

// Connecter à une Api (Google Trad vs Open Source)

// Input qui va recevoir le texte

// Fonction appel API pour avoir la réponse

// Afficher la réponse

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
